const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, verifyStoreAccess, checkPermission } = require('../middleware/auth');
const { validateCreateOrder, validateUpdateOrder } = require('../validators/order.validator');

// Protected routes - require authentication
router.use(protect);

// Store-specific order routes
router.get('/:storeId/orders', verifyStoreAccess, checkPermission('orders.view'), orderController.getStoreOrders);
router.post('/:storeId/orders', verifyStoreAccess, checkPermission('orders.create'), validateCreateOrder, orderController.createOrder);
router.get('/:storeId/orders/:orderId', verifyStoreAccess, checkPermission('orders.view'), orderController.getOrder);
router.put('/:storeId/orders/:orderId', verifyStoreAccess, checkPermission('orders.update'), validateUpdateOrder, orderController.updateOrder);
router.delete('/:storeId/orders/:orderId', verifyStoreAccess, checkPermission('orders.delete'), orderController.cancelOrder);

// Order status management
router.patch('/:storeId/orders/:orderId/status', verifyStoreAccess, checkPermission('orders.update'), orderController.updateOrderStatus);
router.patch('/:storeId/orders/:orderId/payment-status', verifyStoreAccess, checkPermission('orders.update'), orderController.updatePaymentStatus);
router.patch('/:storeId/orders/:orderId/fulfillment', verifyStoreAccess, checkPermission('orders.update'), orderController.updateFulfillmentStatus);

// Order items management
router.post('/:storeId/orders/:orderId/items', verifyStoreAccess, checkPermission('orders.update'), orderController.addOrderItem);
router.put('/:storeId/orders/:orderId/items/:itemId', verifyStoreAccess, checkPermission('orders.update'), orderController.updateOrderItem);
router.delete('/:storeId/orders/:orderId/items/:itemId', verifyStoreAccess, checkPermission('orders.update'), orderController.removeOrderItem);

// Shipping and tracking
router.patch('/:storeId/orders/:orderId/shipping', verifyStoreAccess, checkPermission('orders.update'), orderController.updateShippingInfo);
router.patch('/:storeId/orders/:orderId/tracking', verifyStoreAccess, checkPermission('orders.update'), orderController.updateTrackingInfo);

// Order notes
router.post('/:storeId/orders/:orderId/notes', verifyStoreAccess, checkPermission('orders.update'), orderController.addOrderNote);

// Payments
router.get('/:storeId/orders/:orderId/payments', verifyStoreAccess, checkPermission('orders.view'), orderController.getOrderPayments);
router.post('/:storeId/orders/:orderId/payments', verifyStoreAccess, checkPermission('orders.update'), orderController.recordPayment);
router.post('/:storeId/orders/:orderId/refund', verifyStoreAccess, checkPermission('orders.update'), orderController.refundOrder);

// Analytics and reporting
router.get('/:storeId/orders/analytics', verifyStoreAccess, checkPermission('orders.view'), orderController.getOrderAnalytics);
router.get('/:storeId/orders/report', verifyStoreAccess, checkPermission('orders.view'), orderController.generateOrderReport);

// Bulk operations
router.patch('/:storeId/orders/bulk/update-status', verifyStoreAccess, checkPermission('orders.update'), orderController.bulkUpdateStatus);
router.post('/:storeId/orders/bulk/export', verifyStoreAccess, checkPermission('orders.view'), orderController.bulkExport);

module.exports = router;