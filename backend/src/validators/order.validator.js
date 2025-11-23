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

// Validation rules for creating an order
const validateCreateOrder = [
  body('customerId')
    .optional()
    .isMongoId()
    .withMessage('Invalid customer ID'),
  body('guestEmail')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid guest email'),
  body('guestName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Guest name must be between 2 and 100 characters'),
  body('guestPhone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must have at least one item'),
  body('items.*.productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('items.*.variantId')
    .optional()
    .isMongoId()
    .withMessage('Invalid variant ID'),
  body('shippingAddressId')
    .optional()
    .isMongoId()
    .withMessage('Invalid shipping address ID'),
  body('billingAddressId')
    .optional()
    .isMongoId()
    .withMessage('Invalid billing address ID'),
  body('paymentMethod')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Payment method must not exceed 50 characters'),
  body('shippingMethod')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Shipping method must not exceed 50 characters'),
  body('customerNote')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Customer note must not exceed 1000 characters'),
  validate
];

// Validation rules for updating an order
const validateUpdateOrder = [
  body('status')
    .optional()
    .isIn(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'])
    .withMessage('Invalid order status'),
  body('paymentStatus')
    .optional()
    .isIn(['PENDING', 'PAID', 'PARTIALLY_PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED'])
    .withMessage('Invalid payment status'),
  body('fulfillmentStatus')
    .optional()
    .isIn(['UNFULFILLED', 'PARTIALLY_FULFILLED', 'FULFILLED'])
    .withMessage('Invalid fulfillment status'),
  body('shippingCost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Shipping cost must be a positive number'),
  body('taxAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Tax amount must be a positive number'),
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount must be a positive number'),
  body('trackingNumber')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Tracking number must not exceed 100 characters'),
  body('customerNote')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Customer note must not exceed 1000 characters'),
  body('staffNote')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Staff note must not exceed 1000 characters'),
  validate
];

module.exports = {
  validateCreateOrder,
  validateUpdateOrder
};
