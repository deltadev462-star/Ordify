const expressAsyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../utils/cloudinary');
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

  try {
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

    // Handle image uploads
    let mainImageData = null;
    let subImagesData = [];

    // Upload main image to Cloudinary
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      const mainImageFile = req.files.mainImage[0];
      
      try {
        // Convert buffer to base64 for Cloudinary upload
        const fileStr = `data:${mainImageFile.mimetype};base64,${mainImageFile.buffer.toString('base64')}`;
        
        const result = await cloudinary.uploader.upload(fileStr, {
          folder: `ordify/stores/${storeId}/products`,
          resource_type: 'image'
        });
        
        mainImageData = {
          path: result.secure_url,
          public_id: result.public_id
        };
      } catch (uploadError) {
        res.status(500);
        throw new Error(`Failed to upload main image: ${uploadError.message}`);
      }
    } else if (productData.mainImage) {
      // Use mainImage from request body if provided (for URL inputs)
      mainImageData = productData.mainImage;
    }

    // Upload sub images to Cloudinary
    if (req.files && req.files.subImages && req.files.subImages.length > 0) {
      try {
        const uploadPromises = req.files.subImages.map(async (file) => {
          // Convert buffer to base64 for Cloudinary upload
          const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
          
          const result = await cloudinary.uploader.upload(fileStr, {
            folder: `ordify/stores/${storeId}/products`,
            resource_type: 'image'
          });
          
          return {
            path: result.secure_url,
            public_id: result.public_id
          };
        });
        
        subImagesData = await Promise.all(uploadPromises);
      } catch (uploadError) {
        // Clean up main image if sub images upload fails
        if (mainImageData && mainImageData.public_id) {
          await cloudinary.uploader.destroy(mainImageData.public_id);
        }
        res.status(500);
        throw new Error(`Failed to upload sub images: ${uploadError.message}`);
      }
    } else if (productData.subImages) {
      // Use subImages from request body if provided
      subImagesData = productData.subImages;
    }

    // At this point, validators have already sanitized the values
    // Prepare product data
    const createData = {
      name: productData.name,
      description: productData.description || null,
      shortDescription: productData.shortDescription || null,
      price: productData.price, // Already validated and converted by validator
      ...(productData.comparePrice !== undefined && { comparePrice: productData.comparePrice }),
      ...(productData.costPrice !== undefined && { costPrice: productData.costPrice }),
      sku: productData.sku || null,
      barcode: productData.barcode || null,
      ...(productData.trackQuantity !== undefined && { trackQuantity: productData.trackQuantity }),
      ...(productData.quantity !== undefined && { quantity: productData.quantity }),
      ...(productData.lowStockAlert !== undefined && { lowStockAlert: productData.lowStockAlert }),
      ...(productData.weight !== undefined && { weight: productData.weight }),
      ...(productData.weightUnit && { weightUnit: productData.weightUnit }),
      // Connect category if provided
      ...(productData.categoryId && { category: { connect: { id: productData.categoryId } } }),
      ...(productData.status && { status: productData.status }),
      ...(productData.isActive !== undefined && { isActive: productData.isActive }),
      ...(productData.isFeatured !== undefined && { isFeatured: productData.isFeatured }),
      metaTitle: productData.metaTitle || null,
      metaDescription: productData.metaDescription || null,
      metaKeywords: Array.isArray(productData.metaKeywords) ? productData.metaKeywords : [],
      slug,
      // Connect required store relation (avoid "Argument `store` is missing" error)
      store: { connect: { id: storeId } },
      // Only include mainImage if it's provided
      ...(mainImageData && { mainImage: mainImageData }),
      // Only include subImages if there are any
      ...(subImagesData.length > 0 && { subImages: subImagesData }),
      // Set thumbnail to main image URL if available
      ...(mainImageData && { thumbnail: mainImageData.path })
    };

    // Remove the old images field if it exists
    delete createData.images;

    // Create product
    const product = await prisma.product.create({
      data: createData,
      include: {
        category: true
      }
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    // Clean up uploaded images on error
    if (error.mainImagePublicId) {
      await cloudinary.uploader.destroy(error.mainImagePublicId);
    }
    if (error.subImagePublicIds) {
      await Promise.all(error.subImagePublicIds.map(id => cloudinary.uploader.destroy(id)));
    }
    throw error;
  }
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
  const { productId, storeId } = req.params;
  const updateData = req.body;

  try {
    // Get existing product to check old images
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.storeId;
    delete updateData.slug;
    delete updateData.viewCount;
    delete updateData.soldCount;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    
    // Parse numeric values that might come as strings from FormData
    if (updateData.price !== undefined) {
      updateData.price = parseFloat(updateData.price);
    }
    if (updateData.comparePrice !== undefined && updateData.comparePrice !== null && updateData.comparePrice !== '') {
      updateData.comparePrice = parseFloat(updateData.comparePrice);
    } else if (updateData.comparePrice === '' || updateData.comparePrice === null) {
      updateData.comparePrice = null;
    }
    if (updateData.costPrice !== undefined && updateData.costPrice !== null && updateData.costPrice !== '') {
      updateData.costPrice = parseFloat(updateData.costPrice);
    } else if (updateData.costPrice === '' || updateData.costPrice === null) {
      updateData.costPrice = null;
    }
    if (updateData.quantity !== undefined) {
      updateData.quantity = parseInt(updateData.quantity);
    }
    if (updateData.lowStockAlert !== undefined) {
      updateData.lowStockAlert = parseInt(updateData.lowStockAlert);
    }
    if (updateData.weight !== undefined && updateData.weight !== null && updateData.weight !== '') {
      updateData.weight = parseFloat(updateData.weight);
    } else if (updateData.weight === '' || updateData.weight === null) {
      updateData.weight = null;
    }
    
    // Parse metaKeywords if it's a string
    if (updateData.metaKeywords && typeof updateData.metaKeywords === 'string') {
      try {
        updateData.metaKeywords = JSON.parse(updateData.metaKeywords);
      } catch (e) {
        updateData.metaKeywords = [];
      }
    }

    // Handle image uploads and removals
    let mainImageData = existingProduct.mainImage;
    let subImagesData = existingProduct.subImages || [];
    let imagesToDelete = [];

    // Handle removed images from Cloudinary
    if (updateData.removedImages) {
      try {
        const removedImageIds = JSON.parse(updateData.removedImages);
        
        // Find images to delete
        for (const publicId of removedImageIds) {
          // Check if it's the main image
          if (mainImageData && mainImageData.public_id === publicId) {
            imagesToDelete.push(publicId);
            mainImageData = null;
          } else {
            // Check in sub images
            const subImageIndex = subImagesData.findIndex(img => img.public_id === publicId);
            if (subImageIndex !== -1) {
              imagesToDelete.push(publicId);
              subImagesData.splice(subImageIndex, 1);
            }
          }
        }
      } catch (e) {
        console.error('Error parsing removed images:', e);
      }
    }
    
    // Clean up updateData - remove fields that shouldn't be in the Prisma update
    delete updateData.removedImages;

    // Handle new main image upload
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      const mainImageFile = req.files.mainImage[0];
      
      try {
        // Delete old main image from Cloudinary if it exists
        if (mainImageData && mainImageData.public_id) {
          imagesToDelete.push(mainImageData.public_id);
        }

        // Upload new main image
        const fileStr = `data:${mainImageFile.mimetype};base64,${mainImageFile.buffer.toString('base64')}`;
        
        const result = await cloudinary.uploader.upload(fileStr, {
          folder: `ordify/stores/${storeId}/products`,
          resource_type: 'image'
        });
        
        mainImageData = {
          path: result.secure_url,
          public_id: result.public_id
        };
      } catch (uploadError) {
        res.status(500);
        throw new Error(`Failed to upload main image: ${uploadError.message}`);
      }
    }

    // Handle sub images upload
    if (req.files && req.files.subImages && req.files.subImages.length > 0) {
      try {
        const uploadPromises = req.files.subImages.map(async (file) => {
          const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
          
          const result = await cloudinary.uploader.upload(fileStr, {
            folder: `ordify/stores/${storeId}/products`,
            resource_type: 'image'
          });
          
          return {
            path: result.secure_url,
            public_id: result.public_id
          };
        });
        
        const newSubImages = await Promise.all(uploadPromises);
        subImagesData = [...subImagesData, ...newSubImages];
      } catch (uploadError) {
        res.status(500);
        throw new Error(`Failed to upload sub images: ${uploadError.message}`);
      }
    }

    // Handle main image index (which image should be main)
    if (updateData.mainImageIndex !== undefined) {
      const mainIndex = parseInt(updateData.mainImageIndex);
      const allImages = [...(mainImageData ? [mainImageData] : []), ...subImagesData];
      
      if (mainIndex >= 0 && mainIndex < allImages.length) {
        // Rearrange images so the selected index becomes the main image
        mainImageData = allImages[mainIndex];
        subImagesData = allImages.filter((_, idx) => idx !== mainIndex);
      }
    }

    // Delete removed images from Cloudinary
    if (imagesToDelete.length > 0) {
      try {
        await Promise.all(
          imagesToDelete.map(publicId =>
            cloudinary.uploader.destroy(publicId).catch(err =>
              console.error(`Failed to delete image ${publicId}:`, err)
            )
          )
        );
      } catch (deleteError) {
        console.error('Error deleting images from Cloudinary:', deleteError);
      }
    }

    // Extract categoryId before creating prismaUpdateData
    const categoryId = updateData.categoryId;
    delete updateData.categoryId;
    delete updateData.mainImageIndex;
    
    // Prepare update data object with only valid Prisma fields
    const prismaUpdateData = {
      name: updateData.name,
      description: updateData.description || null,
      shortDescription: updateData.shortDescription || null,
      price: updateData.price,
      comparePrice: updateData.comparePrice,
      costPrice: updateData.costPrice,
      sku: updateData.sku || null,
      barcode: updateData.barcode || null,
      trackQuantity: updateData.trackQuantity,
      quantity: updateData.quantity,
      lowStockAlert: updateData.lowStockAlert,
      weight: updateData.weight,
      weightUnit: updateData.weightUnit,
      status: updateData.status,
      isActive: updateData.isActive,
      isFeatured: updateData.isFeatured,
      metaTitle: updateData.metaTitle || null,
      metaDescription: updateData.metaDescription || null,
      metaKeywords: updateData.metaKeywords || [],
      mainImage: mainImageData,
      subImages: subImagesData,
      thumbnail: mainImageData ? mainImageData.path : null
    };
    
    // Handle category relation update
    if (categoryId) {
      prismaUpdateData.category = {
        connect: { id: categoryId }
      };
    } else if (categoryId === null) {
      prismaUpdateData.category = {
        disconnect: true
      };
    }

    // Update product in database
    const product = await prisma.product.update({
      where: { id: productId },
      data: prismaUpdateData,
      include: {
        category: true
      }
    });

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
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
