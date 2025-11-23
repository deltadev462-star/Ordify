const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth');
const { validateCreateUser, validateUpdateUser } = require('../validators/user.validator');

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', userController.getUserProfile);
router.put('/profile', validateUpdateUser, userController.updateUserProfile);

// Super admin routes
router.get('/', authorize('SUPER_ADMIN'), userController.getAllUsers);
router.post('/', authorize('SUPER_ADMIN'), validateCreateUser, userController.createUser);
router.get('/:userId', authorize('SUPER_ADMIN'), userController.getUser);
router.put('/:userId', authorize('SUPER_ADMIN'), validateUpdateUser, userController.updateUser);
router.delete('/:userId', authorize('SUPER_ADMIN'), userController.deleteUser);
router.patch('/:userId/status', authorize('SUPER_ADMIN'), userController.updateUserStatus);
router.patch('/:userId/role', authorize('SUPER_ADMIN'), userController.updateUserRole);

module.exports = router;
