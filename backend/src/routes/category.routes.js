const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect, verifyStoreAccess, checkPermission } = require('../middleware/auth');
const { validateCreateCategory, validateUpdateCategory } = require('../validators/category.validator');

// Public routes (for customers)
router.get('/public/:storeSlug', categoryController.getPublicCategories);

// Protected routes - require authentication
router.use(protect);

// Store-specific category routes
router.get('/:storeId/categories', verifyStoreAccess, categoryController.getStoreCategories);
router.post('/:storeId/categories', verifyStoreAccess, checkPermission('categories.create'), validateCreateCategory, categoryController.createCategory);
router.get('/:storeId/categories/:categoryId', verifyStoreAccess, categoryController.getCategory);
router.put('/:storeId/categories/:categoryId', verifyStoreAccess, checkPermission('categories.update'), validateUpdateCategory, categoryController.updateCategory);
router.delete('/:storeId/categories/:categoryId', verifyStoreAccess, checkPermission('categories.delete'), categoryController.deleteCategory);

// Category hierarchy
router.get('/:storeId/categories/:categoryId/children', verifyStoreAccess, categoryController.getCategoryChildren);
router.put('/:storeId/categories/:categoryId/parent', verifyStoreAccess, checkPermission('categories.update'), categoryController.updateCategoryParent);

// Bulk operations
router.patch('/:storeId/categories/bulk/reorder', verifyStoreAccess, checkPermission('categories.update'), categoryController.reorderCategories);
router.delete('/:storeId/categories/bulk/delete', verifyStoreAccess, checkPermission('categories.delete'), categoryController.bulkDeleteCategories);

module.exports = router;