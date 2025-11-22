const expressAsyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get user's stores
// @route   GET /api/v1/stores
// @access  Private
const getMyStores = expressAsyncHandler(async (req, res) => {
  const stores = await prisma.store.findMany({
    where: {
      OR: [
        { ownerId: req.user.id },
        {
          staff: {
            some: {
              userId: req.user.id,
              isActive: true
            }
          }
        }
      ]
    },
    include: {
      _count: {
        select: {
          products: true,
          orders: true,
          customers: true
        }
      }
    }
  });

  res.json({
    success: true,
    count: stores.length,
    data: stores
  });
});

// @desc    Create new store
// @route   POST /api/v1/stores
// @access  Private
const createStore = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    email,
    phone,
    address,
    city,
    state,
    country,
    postalCode,
    currency,
    language,
    timezone
  } = req.body;

  // Generate slug
  let slug = slugify(name, { lower: true, strict: true });

  // Check if slug exists
  const slugExists = await prisma.store.findUnique({
    where: { slug }
  });

  if (slugExists) {
    slug = `${slug}-${Date.now()}`;
  }

  // Create store
  const store = await prisma.store.create({
    data: {
      name,
      slug,
      description,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
      currency: currency || 'USD',
      language: language || 'en',
      timezone: timezone || 'UTC',
      ownerId: req.user.id,
      status: req.user.role === 'SUPER_ADMIN' ? 'ACTIVE' : 'PENDING',
      isActive: req.user.role === 'SUPER_ADMIN'
    }
  });

  res.status(201).json({
    success: true,
    data: store
  });
});

// @desc    Get single store
// @route   GET /api/v1/stores/:storeId
// @access  Private (Store Access Required)
const getStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: {
      owner: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      },
      _count: {
        select: {
          products: true,
          categories: true,
          customers: true,
          orders: true
        }
      }
    }
  });

  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }

  res.json({
    success: true,
    data: store
  });
});

// @desc    Update store
// @route   PUT /api/v1/stores/:storeId
// @access  Private (Store Owner)
const updateStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const updateData = req.body;

  // Remove fields that shouldn't be updated directly
  delete updateData.id;
  delete updateData.ownerId;
  delete updateData.slug;
  delete updateData.status;
  delete updateData.isActive;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  const store = await prisma.store.update({
    where: { id: storeId },
    data: updateData
  });

  res.json({
    success: true,
    data: store
  });
});

// @desc    Delete store
// @route   DELETE /api/v1/stores/:storeId
// @access  Private (Store Owner)
const deleteStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  // Only owner or super admin can delete
  if (req.user.role !== 'SUPER_ADMIN' && !req.isOwner) {
    res.status(403);
    throw new Error('Not authorized to delete this store');
  }

  await prisma.store.delete({
    where: { id: storeId }
  });

  res.json({
    success: true,
    message: 'Store deleted successfully'
  });
});

// @desc    Get store settings
// @route   GET /api/v1/stores/:storeId/settings
// @access  Private (Store Access Required)
const getStoreSettings = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: {
      currency: true,
      language: true,
      timezone: true,
      theme: true,
      customDomain: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
      businessName: true,
      taxNumber: true
    }
  });

  res.json({
    success: true,
    data: store
  });
});

// @desc    Update store settings
// @route   PUT /api/v1/stores/:storeId/settings
// @access  Private (Store Owner)
const updateStoreSettings = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const settings = req.body;

  const store = await prisma.store.update({
    where: { id: storeId },
    data: settings,
    select: {
      currency: true,
      language: true,
      timezone: true,
      theme: true,
      customDomain: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
      businessName: true,
      taxNumber: true
    }
  });

  res.json({
    success: true,
    data: store
  });
});

// @desc    Get store staff
// @route   GET /api/v1/stores/:storeId/staff
// @access  Private (Store Owner)
const getStoreStaff = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const staff = await prisma.storeStaff.findMany({
    where: { storeId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true
        }
      }
    }
  });

  res.json({
    success: true,
    count: staff.length,
    data: staff
  });
});

// @desc    Add store staff
// @route   POST /api/v1/stores/:storeId/staff
// @access  Private (Store Owner)
const addStoreStaff = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { email, permissions } = req.body;

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    // Create user with temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const { hashPassword } = require('../utils/password');
    const hashedPassword = await hashPassword(tempPassword);

    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'Staff',
        lastName: 'Member',
        role: 'STORE_STAFF'
      }
    });

    // In production, send email with temp password
  }

  // Check if already staff
  const existingStaff = await prisma.storeStaff.findUnique({
    where: {
      storeId_userId: {
        storeId,
        userId: user.id
      }
    }
  });

  if (existingStaff) {
    res.status(400);
    throw new Error('User is already a staff member');
  }

  // Add as staff
  const staff = await prisma.storeStaff.create({
    data: {
      storeId,
      userId: user.id,
      permissions: permissions || []
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });

  res.status(201).json({
    success: true,
    data: staff
  });
});

// @desc    Update store staff permissions
// @route   PUT /api/v1/stores/:storeId/staff/:staffId
// @access  Private (Store Owner)
const updateStoreStaff = expressAsyncHandler(async (req, res) => {
  const { storeId, staffId } = req.params;
  const { permissions, isActive } = req.body;

  const staff = await prisma.storeStaff.update({
    where: { id: staffId },
    data: {
      permissions,
      isActive
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });

  res.json({
    success: true,
    data: staff
  });
});

// @desc    Remove store staff
// @route   DELETE /api/v1/stores/:storeId/staff/:staffId
// @access  Private (Store Owner)
const removeStoreStaff = expressAsyncHandler(async (req, res) => {
  const { staffId } = req.params;

  await prisma.storeStaff.delete({
    where: { id: staffId }
  });

  res.json({
    success: true,
    message: 'Staff member removed successfully'
  });
});

// @desc    Get store analytics
// @route   GET /api/v1/stores/:storeId/analytics
// @access  Private (Store Access Required)
const getStoreAnalytics = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate) {
    dateFilter.gte = new Date(startDate);
  }
  if (endDate) {
    dateFilter.lte = new Date(endDate);
  }

  // Get order analytics
  const orders = await prisma.order.groupBy({
    by: ['status'],
    where: {
      storeId,
      ...(startDate || endDate ? { createdAt: dateFilter } : {})
    },
    _count: true,
    _sum: {
      total: true
    }
  });

  // Get product analytics
  const topProducts = await prisma.product.findMany({
    where: { storeId },
    orderBy: { soldCount: 'desc' },
    take: 10,
    select: {
      id: true,
      name: true,
      soldCount: true,
      viewCount: true
    }
  });

  // Get customer analytics
  const customers = await prisma.customer.aggregate({
    where: { storeId },
    _count: true,
    _avg: {
      totalSpent: true,
      orderCount: true
    }
  });

  res.json({
    success: true,
    data: {
      orders,
      topProducts,
      customers
    }
  });
});

// @desc    Get store dashboard data
// @route   GET /api/v1/stores/:storeId/dashboard
// @access  Private (Store Access Required)
const getStoreDashboard = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get counts
  const [
    totalProducts,
    activeProducts,
    totalOrders,
    todayOrders,
    totalCustomers,
    totalRevenue
  ] = await Promise.all([
    prisma.product.count({ where: { storeId } }),
    prisma.product.count({ where: { storeId, isActive: true, status: 'PUBLISHED' } }),
    prisma.order.count({ where: { storeId } }),
    prisma.order.count({ where: { storeId, createdAt: { gte: today, lt: tomorrow } } }),
    prisma.customer.count({ where: { storeId } }),
    prisma.order.aggregate({
      where: { storeId, paymentStatus: 'PAID' },
      _sum: { total: true }
    })
  ]);

  // Recent orders
  const recentOrders = await prisma.order.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  res.json({
    success: true,
    data: {
      stats: {
        totalProducts,
        activeProducts,
        totalOrders,
        todayOrders,
        totalCustomers,
        totalRevenue: totalRevenue._sum.total || 0
      },
      recentOrders
    }
  });
});

// @desc    Get public store (for customers)
// @route   GET /api/v1/stores/public/:storeSlug
// @access  Public
const getPublicStore = expressAsyncHandler(async (req, res) => {
  const { storeSlug } = req.params;

  const store = await prisma.store.findUnique({
    where: { 
      slug: storeSlug,
      isActive: true,
      status: 'ACTIVE'
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      logo: true,
      banner: true,
      currency: true,
      language: true,
      theme: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true
    }
  });

  if (!store) {
    res.status(404);
    throw new Error('Store not found or inactive');
  }

  res.json({
    success: true,
    data: store
  });
});

// @desc    Get all stores (Super Admin)
// @route   GET /api/v1/stores/admin/all
// @access  Private (Super Admin)
const getAllStores = expressAsyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const where = {};
  
  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [stores, total] = await Promise.all([
    prisma.store.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        owner: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        },
        _count: {
          select: {
            products: true,
            orders: true,
            customers: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.store.count({ where })
  ]);

  res.json({
    success: true,
    data: stores,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Update store status (Super Admin)
// @route   PUT /api/v1/stores/admin/:storeId/status
// @access  Private (Super Admin)
const updateStoreStatus = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { status, isActive } = req.body;

  const store = await prisma.store.update({
    where: { id: storeId },
    data: {
      status,
      isActive: isActive !== undefined ? isActive : status === 'ACTIVE'
    }
  });

  res.json({
    success: true,
    data: store
  });
});

module.exports = {
  getMyStores,
  createStore,
  getStore,
  updateStore,
  deleteStore,
  getStoreSettings,
  updateStoreSettings,
  getStoreStaff,
  addStoreStaff,
  updateStoreStaff,
  removeStoreStaff,
  getStoreAnalytics,
  getStoreDashboard,
  getPublicStore,
  getAllStores,
  updateStoreStatus
};