const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Validation rules for creating a product
const validateCreateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Product name must be between 3 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Short description must not exceed 500 characters'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('comparePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Compare price must be a positive number'),
  body('costPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),
  body('sku')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('SKU must not exceed 100 characters'),
  body('barcode')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Barcode must not exceed 100 characters'),
  body('trackQuantity')
    .optional()
    .isBoolean()
    .withMessage('Track quantity must be a boolean'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('lowStockAlert')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Low stock alert must be a non-negative integer'),
  body('weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),
  body('weightUnit')
    .optional()
    .isIn(['kg', 'g', 'lb', 'oz'])
    .withMessage('Invalid weight unit'),
  body('categoryId')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Invalid product status'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('Meta title must not exceed 160 characters'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 320 })
    .withMessage('Meta description must not exceed 320 characters'),
  body('metaKeywords')
    .optional()
    .isArray()
    .withMessage('Meta keywords must be an array'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  validate
];

// Validation rules for updating a product
const validateUpdateProduct = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Product name must be between 3 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Short description must not exceed 500 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('comparePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Compare price must be a positive number'),
  body('costPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),
  body('sku')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('SKU must not exceed 100 characters'),
  body('barcode')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Barcode must not exceed 100 characters'),
  body('trackQuantity')
    .optional()
    .isBoolean()
    .withMessage('Track quantity must be a boolean'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('lowStockAlert')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Low stock alert must be a non-negative integer'),
  body('weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),
  body('weightUnit')
    .optional()
    .isIn(['kg', 'g', 'lb', 'oz'])
    .withMessage('Invalid weight unit'),
  body('categoryId')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Invalid product status'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('Meta title must not exceed 160 characters'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 320 })
    .withMessage('Meta description must not exceed 320 characters'),
  body('metaKeywords')
    .optional()
    .isArray()
    .withMessage('Meta keywords must be an array'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  validate
];

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
};
