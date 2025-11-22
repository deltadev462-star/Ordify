const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const { protect, verifyStoreAccess, checkPermission } = require('../middleware/auth');
const { validateCreateCustomer, validateUpdateCustomer } = require('../validators/customer.validator');

// Protected routes - require authentication
router.use(protect);

// Store-specific customer routes
router.get('/:storeId/customers', verifyStoreAccess, checkPermission('customers.view'), customerController.getStoreCustomers);
router.post('/:storeId/customers', verifyStoreAccess, checkPermission('customers.create'), validateCreateCustomer, customerController.createCustomer);
router.get('/:storeId/customers/:customerId', verifyStoreAccess, checkPermission('customers.view'), customerController.getCustomer);
router.put('/:storeId/customers/:customerId', verifyStoreAccess, checkPermission('customers.update'), validateUpdateCustomer, customerController.updateCustomer);
router.delete('/:storeId/customers/:customerId', verifyStoreAccess, checkPermission('customers.delete'), customerController.deleteCustomer);

// Customer orders
router.get('/:storeId/customers/:customerId/orders', verifyStoreAccess, checkPermission('customers.view'), customerController.getCustomerOrders);

// Customer addresses
router.get('/:storeId/customers/:customerId/addresses', verifyStoreAccess, checkPermission('customers.view'), customerController.getCustomerAddresses);
router.post('/:storeId/customers/:customerId/addresses', verifyStoreAccess, checkPermission('customers.update'), customerController.addCustomerAddress);
router.put('/:storeId/customers/:customerId/addresses/:addressId', verifyStoreAccess, checkPermission('customers.update'), customerController.updateCustomerAddress);
router.delete('/:storeId/customers/:customerId/addresses/:addressId', verifyStoreAccess, checkPermission('customers.update'), customerController.deleteCustomerAddress);

// Customer analytics
router.get('/:storeId/customers/:customerId/analytics', verifyStoreAccess, checkPermission('customers.view'), customerController.getCustomerAnalytics);

// Bulk operations
router.post('/:storeId/customers/bulk/import', verifyStoreAccess, checkPermission('customers.create'), customerController.bulkImport);
router.post('/:storeId/customers/bulk/export', verifyStoreAccess, checkPermission('customers.view'), customerController.bulkExport);

module.exports = router;