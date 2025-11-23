const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const { protect, authorize, verifyStoreAccess } = require('../middleware/auth');
const { validateCreateStore, validateUpdateStore } = require('../validators/store.validator');

// All routes require authentication
router.use(protect);

// Routes for managing stores
router.get('/', storeController.getMyStores);
router.post('/', validateCreateStore, storeController.createStore);

// Store-specific routes (require store access)
router.get('/:storeId', verifyStoreAccess, storeController.getStore);
router.put('/:storeId', verifyStoreAccess, validateUpdateStore, storeController.updateStore);
router.delete('/:storeId', verifyStoreAccess, storeController.deleteStore);

// Store settings
router.get('/:storeId/settings', verifyStoreAccess, storeController.getStoreSettings);
router.put('/:storeId/settings', verifyStoreAccess, storeController.updateStoreSettings);

// Store staff management
router.get('/:storeId/staff', verifyStoreAccess, storeController.getStoreStaff);
router.post('/:storeId/staff', verifyStoreAccess, storeController.addStoreStaff);
router.put('/:storeId/staff/:staffId', verifyStoreAccess, storeController.updateStoreStaff);
router.delete('/:storeId/staff/:staffId', verifyStoreAccess, storeController.removeStoreStaff);

// Store analytics
router.get('/:storeId/analytics', verifyStoreAccess, storeController.getStoreAnalytics);
router.get('/:storeId/dashboard', verifyStoreAccess, storeController.getStoreDashboard);

// Public store routes (for customers)
router.get('/public/:storeSlug', storeController.getPublicStore);

// Super admin only routes
router.get('/admin/all', authorize('SUPER_ADMIN'), storeController.getAllStores);
router.put('/admin/:storeId/status', authorize('SUPER_ADMIN'), storeController.updateStoreStatus);

module.exports = router;
