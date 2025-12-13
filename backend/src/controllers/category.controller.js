const expressAsyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../utils/cloudinary');
const prisma = new PrismaClient();

// @desc    Get store categories
// @route   GET /api/v1/categories/:storeId/categories
// @access  Private (Store Access Required)
const getStoreCategories = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { includeInactive } = req.query;

  const where = { storeId };
  if (!includeInactive) {
    where.isActive = true;
  }

  const categories = await prisma.category.findMany({
    where,
    include: {
      parent: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      _count: {
        select: {
          children: true,
          products: true
        }
      }
    },
    orderBy: [
      { sortOrder: 'asc' },
      { name: 'asc' }
    ]
  });

  // Build hierarchy
  const buildHierarchy = (categories, parentId = null) => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildHierarchy(categories, cat.id)
      }));
  };

  const hierarchy = buildHierarchy(categories);

  res.json({
    success: true,
    count: categories.length,
    data: {
      flat: categories,
      hierarchy
    }
  });
});

// @desc    Create category
// @route   POST /api/v1/categories/:storeId/categories
// @access  Private (Store Owner/Staff with permission)
const createCategory = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  let { name, description, parentId, isActive, sortOrder } = req.body;

  // Convert string values to proper types (FormData sends everything as strings)
  if (isActive !== undefined) {
    isActive = isActive === 'true' || isActive === true;
  }
  if (sortOrder !== undefined) {
    sortOrder = parseInt(sortOrder, 10) || 0;
  }

  // Generate slug
  let slug = slugify(name, { lower: true, strict: true });

  // Check if slug exists in this store
  const slugExists = await prisma.category.findUnique({
    where: {
      storeId_slug: {
        storeId,
        slug
      }
    }
  });

  if (slugExists) {
    slug = `${slug}-${Date.now()}`;
  }

  // Validate parent category if provided
  if (parentId) {
    const parentCategory = await prisma.category.findFirst({
      where: {
        id: parentId,
        storeId
      }
    });

    if (!parentCategory) {
      res.status(400);
      throw new Error('Parent category not found');
    }
  }

  // Handle image upload to Cloudinary
  let imageData = null;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `ordify/stores/${storeId}/categories`,
        resource_type: 'image',
        transformation: [
          { width: 400, height: 400, crop: 'fill' }
        ]
      });
      
      imageData = {
        path: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      res.status(500);
      throw new Error('Error uploading image to Cloudinary');
    }
  }

  // Create category
  const category = await prisma.category.create({
    data: {
      name,
      slug,
      description,
      image: imageData,
      storeId,
      parentId,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    },
    include: {
      parent: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  });

  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Get single category
// @route   GET /api/v1/categories/:storeId/categories/:categoryId
// @access  Private (Store Access Required)
const getCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      parent: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      children: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          _count: {
            select: {
              products: true
            }
          }
        }
      },
      _count: {
        select: {
          products: true
        }
      }
    }
  });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json({
    success: true,
    data: category
  });
});

// @desc    Update category
// @route   PUT /api/v1/categories/:storeId/categories/:categoryId
// @access  Private (Store Owner/Staff with permission)
const updateCategory = expressAsyncHandler(async (req, res) => {
  const { storeId, categoryId } = req.params;
  const updateData = { ...req.body };

  // Remove fields that shouldn't be updated directly
  delete updateData.id;
  delete updateData.storeId;
  delete updateData.slug;
  delete updateData.createdAt;
  delete updateData.updatedAt;
  delete updateData.image; // Remove image from body as it comes from file upload
  delete updateData.removeExistingImage; // Remove this flag as it's handled separately

  // Convert string values to proper types (FormData sends everything as strings)
  if (updateData.isActive !== undefined) {
    updateData.isActive = updateData.isActive === 'true' || updateData.isActive === true;
  }
  if (updateData.sortOrder !== undefined) {
    updateData.sortOrder = parseInt(updateData.sortOrder, 10);
  }

  // Get existing category to check for old image
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { image: true }
  });

  if (!existingCategory) {
    res.status(404);
    throw new Error('Category not found');
  }

  // If changing parent, validate it
  if (updateData.parentId) {
    const parentCategory = await prisma.category.findFirst({
      where: {
        id: updateData.parentId,
        storeId
      }
    });

    if (!parentCategory) {
      res.status(400);
      throw new Error('Parent category not found');
    }

    // Check for circular reference
    if (updateData.parentId === categoryId) {
      res.status(400);
      throw new Error('Category cannot be its own parent');
    }

    // Check if the new parent is a descendant of this category
    const isDescendant = async (catId, potentialChildId) => {
      const children = await prisma.category.findMany({
        where: { parentId: catId },
        select: { id: true }
      });

      for (const child of children) {
        if (child.id === potentialChildId) return true;
        if (await isDescendant(child.id, potentialChildId)) return true;
      }
      return false;
    };

    if (await isDescendant(categoryId, updateData.parentId)) {
      res.status(400);
      throw new Error('Cannot set a descendant category as parent');
    }
  }

  // Handle image removal if requested
  if (req.body.removeExistingImage === 'true' && existingCategory.image) {
    try {
      if (existingCategory.image.public_id) {
        await cloudinary.uploader.destroy(existingCategory.image.public_id);
      }
      updateData.image = null;
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      // Continue even if deletion fails
    }
  }
  
  // Handle image upload to Cloudinary if new image provided
  else if (req.file) {
    try {
      // Delete old image from Cloudinary if exists
      if (existingCategory.image && existingCategory.image.public_id) {
        await cloudinary.uploader.destroy(existingCategory.image.public_id);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: `ordify/stores/${storeId}/categories`,
        resource_type: 'image',
        transformation: [
          { width: 400, height: 400, crop: 'fill' }
        ]
      });
      
      updateData.image = {
        path: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      res.status(500);
      throw new Error('Error uploading image to Cloudinary');
    }
  }

  const category = await prisma.category.update({
    where: { id: categoryId },
    data: updateData,
    include: {
      parent: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  });

  res.json({
    success: true,
    data: category
  });
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:storeId/categories/:categoryId
// @access  Private (Store Owner/Staff with permission)
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  // Get category to check for image
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { image: true }
  });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Check if category has products
  const productsCount = await prisma.product.count({
    where: { categoryId }
  });

  if (productsCount > 0) {
    res.status(400);
    throw new Error('Cannot delete category with products. Please reassign or delete products first.');
  }

  // Check if category has children
  const childrenCount = await prisma.category.count({
    where: { parentId: categoryId }
  });

  if (childrenCount > 0) {
    res.status(400);
    throw new Error('Cannot delete category with subcategories. Please delete or reassign subcategories first.');
  }

  // Delete image from Cloudinary if exists
  if (category.image && category.image.public_id) {
    try {
      await cloudinary.uploader.destroy(category.image.public_id);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      // Continue with deletion even if image deletion fails
    }
  }

  await prisma.category.delete({
    where: { id: categoryId }
  });

  res.json({
    success: true,
    message: 'Category deleted successfully'
  });
});

// @desc    Get category children
// @route   GET /api/v1/categories/:storeId/categories/:categoryId/children
// @access  Private (Store Access Required)
const getCategoryChildren = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
    include: {
      _count: {
        select: {
          children: true,
          products: true
        }
      }
    },
    orderBy: [
      { sortOrder: 'asc' },
      { name: 'asc' }
    ]
  });

  res.json({
    success: true,
    count: children.length,
    data: children
  });
});

// @desc    Update category parent
// @route   PUT /api/v1/categories/:storeId/categories/:categoryId/parent
// @access  Private (Store Owner/Staff with permission)
const updateCategoryParent = expressAsyncHandler(async (req, res) => {
  const { storeId, categoryId } = req.params;
  const { parentId } = req.body;

  // Validate new parent
  if (parentId) {
    const parentCategory = await prisma.category.findFirst({
      where: {
        id: parentId,
        storeId
      }
    });

    if (!parentCategory) {
      res.status(400);
      throw new Error('Parent category not found');
    }

    // Check for circular reference
    if (parentId === categoryId) {
      res.status(400);
      throw new Error('Category cannot be its own parent');
    }
  }

  const category = await prisma.category.update({
    where: { id: categoryId },
    data: { parentId },
    include: {
      parent: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  });

  res.json({
    success: true,
    data: category
  });
});

// @desc    Reorder categories
// @route   PATCH /api/v1/categories/:storeId/categories/bulk/reorder
// @access  Private (Store Owner/Staff with permission)
const reorderCategories = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { categories } = req.body; // Array of { id, sortOrder }

  const updatePromises = categories.map(cat =>
    prisma.category.update({
      where: {
        id: cat.id,
        storeId
      },
      data: {
        sortOrder: cat.sortOrder
      }
    })
  );

  await Promise.all(updatePromises);

  res.json({
    success: true,
    message: 'Categories reordered successfully'
  });
});

// @desc    Bulk delete categories
// @route   DELETE /api/v1/categories/:storeId/categories/bulk/delete
// @access  Private (Store Owner/Staff with permission)
const bulkDeleteCategories = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { categoryIds } = req.body;

  // Check if any categories have products
  const productsCount = await prisma.product.count({
    where: { categoryId: { in: categoryIds } }
  });

  if (productsCount > 0) {
    res.status(400);
    throw new Error('Some categories have products. Please reassign or delete products first.');
  }

  // Check if any categories have children
  const childrenCount = await prisma.category.count({
    where: { parentId: { in: categoryIds } }
  });

  if (childrenCount > 0) {
    res.status(400);
    throw new Error('Some categories have subcategories. Please delete or reassign subcategories first.');
  }

  const result = await prisma.category.deleteMany({
    where: {
      id: { in: categoryIds },
      storeId
    }
  });

  res.json({
    success: true,
    message: `${result.count} categories deleted successfully`
  });
});

// @desc    Get public categories for a store
// @route   GET /api/v1/categories/public/:storeSlug
// @access  Public
const getPublicCategories = expressAsyncHandler(async (req, res) => {
  const { storeSlug } = req.params;

  // Get store
  const store = await prisma.store.findUnique({
    where: { 
      slug: storeSlug,
      isActive: true,
      status: 'ACTIVE'
    },
    select: { id: true }
  });

  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }

  const categories = await prisma.category.findMany({
    where: {
      storeId: store.id,
      isActive: true
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      parentId: true,
      sortOrder: true,
      _count: {
        select: {
          products: {
            where: {
              isActive: true,
              status: 'PUBLISHED'
            }
          }
        }
      }
    },
    orderBy: [
      { sortOrder: 'asc' },
      { name: 'asc' }
    ]
  });

  // Build hierarchy
  const buildHierarchy = (categories, parentId = null) => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildHierarchy(categories, cat.id)
      }));
  };

  const hierarchy = buildHierarchy(categories);

  res.json({
    success: true,
    count: categories.length,
    data: {
      flat: categories,
      hierarchy
    }
  });
});

module.exports = {
  getStoreCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryChildren,
  updateCategoryParent,
  reorderCategories,
  bulkDeleteCategories,
  getPublicCategories
};
