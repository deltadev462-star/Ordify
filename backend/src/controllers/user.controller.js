const expressAsyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../utils/password');
const prisma = new PrismaClient();

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerified: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: {
          stores: true,
          staffStores: true
        }
      }
    }
  });

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      firstName,
      lastName,
      phone
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true
    }
  });

  res.json({
    success: true,
    data: user
  });
});

// @desc    Get all users (Super Admin)
// @route   GET /api/v1/users
// @access  Private (Super Admin)
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    role,
    isActive,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = {};

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } }
    ];
  }

  if (role) where.role = role;
  if (isActive !== undefined) where.isActive = isActive === 'true';

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            stores: true,
            staffStores: true
          }
        }
      },
      orderBy: { [sortBy]: order }
    }),
    prisma.user.count({ where })
  ]);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Create user (Super Admin)
// @route   POST /api/v1/users
// @access  Private (Super Admin)
const createUser = expressAsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone, role } = req.body;

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      role: role || 'STORE_OWNER'
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true
    }
  });

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Get single user (Super Admin)
// @route   GET /api/v1/users/:userId
// @access  Private (Super Admin)
const getUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      stores: {
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          isActive: true
        }
      },
      staffStores: {
        include: {
          store: {
            select: {
              id: true,
              name: true,
              slug: true,
              status: true,
              isActive: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user (Super Admin)
// @route   PUT /api/v1/users/:userId
// @access  Private (Super Admin)
const updateUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  // Remove sensitive fields
  delete updateData.id;
  delete updateData.password;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerified: true,
      isActive: true
    }
  });

  res.json({
    success: true,
    data: user
  });
});

// @desc    Delete user (Super Admin)
// @route   DELETE /api/v1/users/:userId
// @access  Private (Super Admin)
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Check if user has stores
  const storesCount = await prisma.store.count({
    where: { ownerId: userId }
  });

  if (storesCount > 0) {
    res.status(400);
    throw new Error('Cannot delete user with active stores');
  }

  await prisma.user.delete({
    where: { id: userId }
  });

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Update user status (Super Admin)
// @route   PATCH /api/v1/users/:userId/status
// @access  Private (Super Admin)
const updateUserStatus = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: { isActive }
  });

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user role (Super Admin)
// @route   PATCH /api/v1/users/:userId/role
// @access  Private (Super Admin)
const updateUserRole = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['SUPER_ADMIN', 'STORE_OWNER', 'STORE_STAFF'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role');
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  res.json({
    success: true,
    data: user
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateUserRole
};
