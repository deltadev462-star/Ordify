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

// Validation rules for creating a category
const validateCreateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('parentId')
    .optional()
    .isMongoId()
    .withMessage('Invalid parent category ID'),
  body('image')
    .optional()
    .isObject()
    .withMessage('Image must be an object'),
  body('image.path')
    .optional({ checkFalsy: false })
    .if(body('image').exists())
    .notEmpty()
    .withMessage('Image path is required when image is provided')
    .isString()
    .withMessage('Image path must be a string'),
  body('image.public_id')
    .optional({ checkFalsy: false })
    .if(body('image').exists())
    .notEmpty()
    .withMessage('Image public_id is required when image is provided')
    .isString()
    .withMessage('Image public_id must be a string'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer'),
  validate
];

// Validation rules for updating a category
const validateUpdateCategory = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('parentId')
    .optional()
    .isMongoId()
    .withMessage('Invalid parent category ID'),
  body('image')
    .optional()
    .isObject()
    .withMessage('Image must be an object'),
  body('image.path')
    .optional({ checkFalsy: false })
    .if(body('image').exists())
    .notEmpty()
    .withMessage('Image path is required when image is provided')
    .isString()
    .withMessage('Image path must be a string'),
  body('image.public_id')
    .optional({ checkFalsy: false })
    .if(body('image').exists())
    .notEmpty()
    .withMessage('Image public_id is required when image is provided')
    .isString()
    .withMessage('Image public_id must be a string'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer'),
  validate
];

module.exports = {
  validateCreateCategory,
  validateUpdateCategory
};
