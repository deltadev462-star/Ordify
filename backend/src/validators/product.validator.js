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
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .customSanitizer(value => parseFloat(value))
    .custom(value => !isNaN(value) && value >= 0)
    .withMessage('Price must be a positive number'),
  body('comparePrice')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Compare price must be a number')
    .customSanitizer(value => parseFloat(value))
    .custom(value => !isNaN(value) && value >= 0)
    .withMessage('Compare price must be a positive number'),
  body('costPrice')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Cost price must be a number')
    .customSanitizer(value => parseFloat(value))
    .custom(value => !isNaN(value) && value >= 0)
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
    .toBoolean()
    .isBoolean()
    .withMessage('Track quantity must be a boolean'),
  body('quantity')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Quantity must be a number')
    .customSanitizer(value => parseInt(value))
    .custom(value => !isNaN(value) && value >= 0)
    .withMessage('Quantity must be a non-negative integer'),
  body('lowStockAlert')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Low stock alert must be a number')
    .customSanitizer(value => parseInt(value))
    .custom(value => !isNaN(value) && value >= 0)
    .withMessage('Low stock alert must be a non-negative integer'),
  body('weight')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Weight must be a number')
    .customSanitizer(value => parseFloat(value))
    .custom(value => !isNaN(value) && value >= 0)
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
    .toBoolean()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('isFeatured')
    .optional()
    .toBoolean()
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
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Price must be a number')
    .toFloat()
    .custom(value => value >= 0)
    .withMessage('Price must be a positive number'),
  body('comparePrice')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Compare price must be a number')
    .toFloat()
    .custom(value => value >= 0)
    .withMessage('Compare price must be a positive number'),
  body('costPrice')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Cost price must be a number')
    .toFloat()
    .custom(value => value >= 0)
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
    .toBoolean()
    .isBoolean()
    .withMessage('Track quantity must be a boolean'),
  body('quantity')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Quantity must be a number')
    .toInt()
    .custom(value => value >= 0)
    .withMessage('Quantity must be a non-negative integer'),
  body('lowStockAlert')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Low stock alert must be a number')
    .toInt()
    .custom(value => value >= 0)
    .withMessage('Low stock alert must be a non-negative integer'),
  body('weight')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Weight must be a number')
    .toFloat()
    .custom(value => value >= 0)
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
    .toBoolean()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('isFeatured')
    .optional()
    .toBoolean()
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
