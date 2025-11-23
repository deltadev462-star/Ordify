const expressAsyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get store products
// @route   GET /api/v1/products/:storeId/products
// @access  Private (Store Access Required)
const getStoreProducts = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const {
    page = 1,
    limit = 20,
    search,
    category,
    status,
    featured,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = { storeId };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (category) {
    where.categoryId = category;
  }

  if (status) {
    where.status = status;
  }

  if (featured !== undefined) {
    where.isFeatured = featured === 'true';
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            variants: true,
            reviews: true
          }
        }
      },
      orderBy: { [sortBy]: order }
    }),
    prisma.product.count({ where })
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Create product
// @route   POST /api/v1/products/:storeId/products
// @access  Private (Store Owner/Staff with permission)
const createProduct = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const productData = req.body;

  // Generate slug
  let slug = slugify(productData.name, { lower: true, strict: true });

  // Check if slug exists in this store
  const slugExists = await prisma.product.findUnique({
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

  // Create product
  const product = await prisma.product.create({
    data: {
      ...productData,
      slug,
      storeId,
      images: productData.images || [],
      metaKeywords: productData.metaKeywords || []
    },
    include: {
      category: true
    }
  });

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get single product
// @route   GET /api/v1/products/:storeId/products/:productId
// @access  Private (Store Access Required)
const getProduct = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      variants: {
        where: { isActive: true }
      },
      reviews: {
        where: { isApproved: true },
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: {
          orderItems: true,
          reviews: true
        }
      }
    }
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:storeId/products/:productId
// @access  Private (Store Owner/Staff with permission)
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;

  // Remove fields that shouldn't be updated directly
  delete updateData.id;
  delete updateData.storeId;
  delete updateData.slug;
  delete updateData.viewCount;
  delete updateData.soldCount;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      ...updateData,
      images: updateData.images || [],
      metaKeywords: updateData.metaKeywords || []
    },
    include: {
      category: true
    }
  });

  res.json({
    success: true,
    data: product
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:storeId/products/:productId
// @access  Private (Store Owner/Staff with permission)
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  await prisma.product.delete({
    where: { id: productId }
  });

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// @desc    Update product status
// @route   PATCH /api/v1/products/:storeId/products/:productId/status
// @access  Private (Store Owner/Staff with permission)
const updateProductStatus = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { status, isActive } = req.body;

  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      ...(status && { status }),
      ...(isActive !== undefined && { isActive })
    }
  });

  res.json({
    success: true,
    data: product
  });
});

// @desc    Toggle product featured status
// @route   PATCH /api/v1/products/:storeId/products/:productId/featured
// @access  Private (Store Owner/Staff with permission)
const toggleFeatured = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { isFeatured: true }
  });

  const updated = await prisma.product.update({
    where: { id: productId },
    data: { isFeatured: !product.isFeatured }
  });

  res.json({
    success: true,
    data: updated
  });
});

// @desc    Upload product images
// @route   POST /api/v1/products/:storeId/products/:productId/images
// @access  Private (Store Owner/Staff with permission)
const uploadImages = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('No images uploaded');
  }

  const imagePaths = req.files.map(file => `/uploads/products/${file.filename}`);

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { images: true }
  });

  const updated = await prisma.product.update({
    where: { id: productId },
    data: {
      images: [...product.images, ...imagePaths],
      thumbnail: !product.images.length ? imagePaths[0] : product.thumbnail
    }
  });

  res.json({
    success: true,
    data: {
      images: updated.images,
      thumbnail: updated.thumbnail
    }
  });
});

// @desc    Delete product image
// @route   DELETE /api/v1/products/:storeId/products/:productId/images/:imageUrl
// @access  Private (Store Owner/Staff with permission)
const deleteImage = expressAsyncHandler(async (req, res) => {
  const { productId, imageUrl } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { images: true, thumbnail: true }
  });

  const updatedImages = product.images.filter(img => img !== imageUrl);
  const newThumbnail = product.thumbnail === imageUrl 
    ? (updatedImages.length > 0 ? updatedImages[0] : null)
    : product.thumbnail;

  const updated = await prisma.product.update({
    where: { id: productId },
    data: {
      images: updatedImages,
      thumbnail: newThumbnail
    }
  });

  res.json({
    success: true,
    data: {
      images: updated.images,
      thumbnail: updated.thumbnail
    }
  });
});

// @desc    Get product variants
// @route   GET /api/v1/products/:storeId/products/:productId/variants
// @access  Private (Store Access Required)
const getProductVariants = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const variants = await prisma.productVariant.findMany({
    where: { productId },
    orderBy: { createdAt: 'asc' }
  });

  res.json({
    success: true,
    count: variants.length,
    data: variants
  });
});

// @desc    Create product variant
// @route   POST /api/v1/products/:storeId/products/:productId/variants
// @access  Private (Store Owner/Staff with permission)
const createVariant = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  const variantData = req.body;

  const variant = await prisma.productVariant.create({
    data: {
      ...variantData,
      productId,
      attributes: variantData.attributes || {}
    }
  });

  res.status(201).json({
    success: true,
    data: variant
  });
});

// @desc    Update product variant
// @route   PUT /api/v1/products/:storeId/products/:productId/variants/:variantId
// @access  Private (Store Owner/Staff with permission)
const updateVariant = expressAsyncHandler(async (req, res) => {
  const { variantId } = req.params;
  const updateData = req.body;

  const variant = await prisma.productVariant.update({
    where: { id: variantId },
    data: updateData
  });

  res.json({
    success: true,
    data: variant
  });
});

// @desc    Delete product variant
// @route   DELETE /api/v1/products/:storeId/products/:productId/variants/:variantId
// @access  Private (Store Owner/Staff with permission)
const deleteVariant = expressAsyncHandler(async (req, res) => {
  const { variantId } = req.params;

  await prisma.productVariant.delete({
    where: { id: variantId }
  });

  res.json({
    success: true,
    message: 'Variant deleted successfully'
  });
});

// @desc    Get public products for a store
// @route   GET /api/v1/products/public/:storeSlug
// @access  Public
const getPublicProducts = expressAsyncHandler(async (req, res) => {
  const { storeSlug } = req.params;
  const {
    page = 1,
    limit = 20,
    search,
    category,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

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

  const where = {
    storeId: store.id,
    isActive: true,
    status: 'PUBLISHED'
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (category) {
    where.categoryId = category;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        comparePrice: true,
        thumbnail: true,
        images: true,
        isFeatured: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: { [sortBy]: order }
    }),
    prisma.product.count({ where })
  ]);

  // Increment view count for displayed products
  if (products.length > 0) {
    await prisma.product.updateMany({
      where: {
        id: { in: products.map(p => p.id) }
      },
      data: {
        viewCount: { increment: 1 }
      }
    });
  }

  res.json({
    success: true,
    data: products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get public product details
// @route   GET /api/v1/products/public/:storeSlug/:productSlug
// @access  Public
const getPublicProduct = expressAsyncHandler(async (req, res) => {
  const { storeSlug, productSlug } = req.params;

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

  const product = await prisma.product.findFirst({
    where: {
      storeId: store.id,
      slug: productSlug,
      isActive: true,
      status: 'PUBLISHED'
    },
    include: {
      category: true,
      variants: {
        where: { isActive: true }
      },
      reviews: {
        where: { isApproved: true },
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    }
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Increment view count
  await prisma.product.update({
    where: { id: product.id },
    data: {
      viewCount: { increment: 1 }
    }
  });

  res.json({
    success: true,
    data: product
  });
});

// @desc    Bulk import products
// @route   POST /api/v1/products/:storeId/products/bulk/import
// @access  Private (Store Owner/Staff with permission)
const bulkImport = expressAsyncHandler(async (req, res) => {
  // Implementation for CSV/Excel import
  res.json({
    success: true,
    message: 'Bulk import functionality to be implemented'
  });
});

// @desc    Bulk export products
// @route   POST /api/v1/products/:storeId/products/bulk/export
// @access  Private (Store Access Required)
const bulkExport = expressAsyncHandler(async (req, res) => {
  // Implementation for CSV/Excel export
  res.json({
    success: true,
    message: 'Bulk export functionality to be implemented'
  });
});

// @desc    Bulk update products
// @route   PATCH /api/v1/products/:storeId/products/bulk/update
// @access  Private (Store Owner/Staff with permission)
const bulkUpdate = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { productIds, updateData } = req.body;

  const result = await prisma.product.updateMany({
    where: {
      id: { in: productIds },
      storeId
    },
    data: updateData
  });

  res.json({
    success: true,
    message: `${result.count} products updated successfully`
  });
});

// @desc    Bulk delete products
// @route   DELETE /api/v1/products/:storeId/products/bulk/delete
// @access  Private (Store Owner/Staff with permission)
const bulkDelete = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { productIds } = req.body;

  const result = await prisma.product.deleteMany({
    where: {
      id: { in: productIds },
      storeId
    }
  });

  res.json({
    success: true,
    message: `${result.count} products deleted successfully`
  });
});

module.exports = {
  getStoreProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus,
  toggleFeatured,
  uploadImages,
  deleteImage,
  getProductVariants,
  createVariant,
  updateVariant,
  deleteVariant,
  getPublicProducts,
  getPublicProduct,
  bulkImport,
  bulkExport,
  bulkUpdate,
  bulkDelete
};
