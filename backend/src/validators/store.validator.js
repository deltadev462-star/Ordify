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

// Validation rules for creating a store
const validateCreateStore = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Store name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Store name must be between 3 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid store email'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'EGP', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR'])
    .withMessage('Invalid currency code'),
  body('language')
    .optional()
    .isIn(['en', 'ar', 'fr', 'es', 'de'])
    .withMessage('Invalid language code'),
  body('timezone')
    .optional()
    .isString()
    .withMessage('Timezone must be a valid string'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address must not exceed 200 characters'),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City must not exceed 100 characters'),
  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('State must not exceed 100 characters'),
  body('country')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Country must not exceed 100 characters'),
  body('postalCode')
    .optional()
    .trim()
    .matches(/^[A-Za-z0-9\s-]+$/)
    .withMessage('Invalid postal code format'),
  validate
];

// Validation rules for updating a store
const validateUpdateStore = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Store name must be between 3 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid store email'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'EGP', 'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR'])
    .withMessage('Invalid currency code'),
  body('language')
    .optional()
    .isIn(['en', 'ar', 'fr', 'es', 'de'])
    .withMessage('Invalid language code'),
  body('timezone')
    .optional()
    .isString()
    .withMessage('Timezone must be a valid string'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('businessName')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Business name must not exceed 200 characters'),
  body('taxNumber')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Tax number must not exceed 50 characters'),
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
  body('facebook')
    .optional()
    .isURL()
    .withMessage('Invalid Facebook URL'),
  body('instagram')
    .optional()
    .isURL()
    .withMessage('Invalid Instagram URL'),
  body('twitter')
    .optional()
    .isURL()
    .withMessage('Invalid Twitter URL'),
  body('linkedin')
    .optional()
    .isURL()
    .withMessage('Invalid LinkedIn URL'),
  validate
];

module.exports = {
  validateCreateStore,
  validateUpdateStore
};