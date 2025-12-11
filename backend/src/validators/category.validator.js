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
    .custom((value) => {
      // Allow null or empty for no parent
      if (value === null || value === '' || value === undefined) {
        return true;
      }
      // Otherwise, check if it's a valid MongoDB ID
      return /^[0-9a-fA-F]{24}$/.test(value);
    })
    .withMessage('Invalid parent category ID'),
  // Image validation is now handled by multer middleware
  // No need to validate image in body as it comes from file upload
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
    .custom((value) => {
      // Allow null or empty for no parent
      if (value === null || value === '' || value === undefined) {
        return true;
      }
      // Otherwise, check if it's a valid MongoDB ID
      return /^[0-9a-fA-F]{24}$/.test(value);
    })
    .withMessage('Invalid parent category ID'),
  // Image validation is now handled by multer middleware
  // No need to validate image in body as it comes from file upload
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
