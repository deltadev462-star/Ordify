const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, verifyStoreAccess, checkPermission } = require('../middleware/auth');
const { validateCreateProduct, validateUpdateProduct } = require('../validators/product.validator');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Public routes (for customers)
router.get('/public/:storeSlug', productController.getPublicProducts);
router.get('/public/:storeSlug/:productSlug', productController.getPublicProduct);

// Protected routes - require authentication
router.use(protect);

// Store-specific product routes
router.get('/:storeId/products', verifyStoreAccess, productController.getStoreProducts);
router.post('/:storeId/products', verifyStoreAccess, checkPermission('products.create'), validateCreateProduct, productController.createProduct);
router.get('/:storeId/products/:productId', verifyStoreAccess, productController.getProduct);
router.put('/:storeId/products/:productId', verifyStoreAccess, checkPermission('products.update'), validateUpdateProduct, productController.updateProduct);
router.delete('/:storeId/products/:productId', verifyStoreAccess, checkPermission('products.delete'), productController.deleteProduct);

// Product status management
router.patch('/:storeId/products/:productId/status', verifyStoreAccess, checkPermission('products.update'), productController.updateProductStatus);
router.patch('/:storeId/products/:productId/featured', verifyStoreAccess, checkPermission('products.update'), productController.toggleFeatured);

// Product images
router.post('/:storeId/products/:productId/images', verifyStoreAccess, checkPermission('products.update'), upload.array('images', 10), productController.uploadImages);
router.delete('/:storeId/products/:productId/images/:imageUrl', verifyStoreAccess, checkPermission('products.update'), productController.deleteImage);

// Product variants
router.get('/:storeId/products/:productId/variants', verifyStoreAccess, productController.getProductVariants);
router.post('/:storeId/products/:productId/variants', verifyStoreAccess, checkPermission('products.create'), productController.createVariant);
router.put('/:storeId/products/:productId/variants/:variantId', verifyStoreAccess, checkPermission('products.update'), productController.updateVariant);
router.delete('/:storeId/products/:productId/variants/:variantId', verifyStoreAccess, checkPermission('products.delete'), productController.deleteVariant);

// Bulk operations
router.post('/:storeId/products/bulk/import', verifyStoreAccess, checkPermission('products.create'), upload.single('file'), productController.bulkImport);
router.post('/:storeId/products/bulk/export', verifyStoreAccess, productController.bulkExport);
router.patch('/:storeId/products/bulk/update', verifyStoreAccess, checkPermission('products.update'), productController.bulkUpdate);
router.delete('/:storeId/products/bulk/delete', verifyStoreAccess, checkPermission('products.delete'), productController.bulkDelete);

module.exports = router;