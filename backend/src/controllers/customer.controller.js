const expressAsyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get store customers
// @route   GET /api/v1/customers/:storeId/customers
// @access  Private (Store Access Required)
const getStoreCustomers = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const {
    page = 1,
    limit = 20,
    search,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = { storeId };

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        _count: {
          select: {
            orders: true,
            addresses: true
          }
        }
      },
      orderBy: { [sortBy]: order }
    }),
    prisma.customer.count({ where })
  ]);

  res.json({
    success: true,
    data: customers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Create customer
// @route   POST /api/v1/customers/:storeId/customers
// @access  Private (Store Owner/Staff with permission)
const createCustomer = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const customerData = req.body;

  // Check if customer exists
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      storeId_email: {
        storeId,
        email: customerData.email
      }
    }
  });

  if (existingCustomer) {
    res.status(400);
    throw new Error('Customer with this email already exists');
  }

  const customer = await prisma.customer.create({
    data: {
      ...customerData,
      storeId
    }
  });

  res.status(201).json({
    success: true,
    data: customer
  });
});

// @desc    Get single customer
// @route   GET /api/v1/customers/:storeId/customers/:customerId
// @access  Private (Store Access Required)
const getCustomer = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      addresses: true,
      _count: {
        select: {
          orders: true,
          reviews: true
        }
      }
    }
  });

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.json({
    success: true,
    data: customer
  });
});

// @desc    Update customer
// @route   PUT /api/v1/customers/:storeId/customers/:customerId
// @access  Private (Store Owner/Staff with permission)
const updateCustomer = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const updateData = req.body;

  delete updateData.id;
  delete updateData.storeId;
  delete updateData.totalSpent;
  delete updateData.orderCount;

  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: updateData
  });

  res.json({
    success: true,
    data: customer
  });
});

// @desc    Delete customer
// @route   DELETE /api/v1/customers/:storeId/customers/:customerId
// @access  Private (Store Owner/Staff with permission)
const deleteCustomer = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;

  await prisma.customer.delete({
    where: { id: customerId }
  });

  res.json({
    success: true,
    message: 'Customer deleted successfully'
  });
});

// @desc    Get customer orders
// @route   GET /api/v1/customers/:storeId/customers/:customerId/orders
// @access  Private (Store Access Required)
const getCustomerOrders = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const orders = await prisma.order.findMany({
    where: { customerId },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              thumbnail: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc    Get customer addresses
// @route   GET /api/v1/customers/:storeId/customers/:customerId/addresses
// @access  Private (Store Access Required)
const getCustomerAddresses = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const addresses = await prisma.address.findMany({
    where: { customerId },
    orderBy: { isDefault: 'desc' }
  });

  res.json({
    success: true,
    count: addresses.length,
    data: addresses
  });
});

// @desc    Add customer address
// @route   POST /api/v1/customers/:storeId/customers/:customerId/addresses
// @access  Private (Store Owner/Staff with permission)
const addCustomerAddress = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const addressData = req.body;

  const address = await prisma.address.create({
    data: {
      ...addressData,
      customerId
    }
  });

  res.status(201).json({
    success: true,
    data: address
  });
});

// @desc    Update customer address
// @route   PUT /api/v1/customers/:storeId/customers/:customerId/addresses/:addressId
// @access  Private (Store Owner/Staff with permission)
const updateCustomerAddress = expressAsyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const updateData = req.body;

  const address = await prisma.address.update({
    where: { id: addressId },
    data: updateData
  });

  res.json({
    success: true,
    data: address
  });
});

// @desc    Delete customer address
// @route   DELETE /api/v1/customers/:storeId/customers/:customerId/addresses/:addressId
// @access  Private (Store Owner/Staff with permission)
const deleteCustomerAddress = expressAsyncHandler(async (req, res) => {
  const { addressId } = req.params;

  await prisma.address.delete({
    where: { id: addressId }
  });

  res.json({
    success: true,
    message: 'Address deleted successfully'
  });
});

// @desc    Get customer analytics
// @route   GET /api/v1/customers/:storeId/customers/:customerId/analytics
// @access  Private (Store Access Required)
const getCustomerAnalytics = expressAsyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const [customer, orderStats] = await Promise.all([
    prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        totalSpent: true,
        orderCount: true,
        lastOrderAt: true,
        createdAt: true
      }
    }),
    prisma.order.aggregate({
      where: { customerId },
      _avg: { total: true },
      _max: { total: true },
      _min: { total: true }
    })
  ]);

  res.json({
    success: true,
    data: {
      customer,
      orderStats
    }
  });
});

// Stub implementations for bulk operations
const bulkImport = expressAsyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Bulk import functionality to be implemented'
  });
});

const bulkExport = expressAsyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Bulk export functionality to be implemented'
  });
});

module.exports = {
  getStoreCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOrders,
  getCustomerAddresses,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
  getCustomerAnalytics,
  bulkImport,
  bulkExport
};
