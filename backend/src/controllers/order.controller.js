const expressAsyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp}-${randomStr}`;
};

// @desc    Get store orders
// @route   GET /api/v1/orders/:storeId/orders
// @access  Private (Store Access Required)
const getStoreOrders = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const {
    page = 1,
    limit = 20,
    status,
    paymentStatus,
    fulfillmentStatus,
    customerId,
    startDate,
    endDate,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const where = { storeId };

  if (status) where.status = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;
  if (fulfillmentStatus) where.fulfillmentStatus = fulfillmentStatus;
  if (customerId) where.customerId = customerId;

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * parseInt(limit),
      take: parseInt(limit),
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        _count: {
          select: {
            items: true,
            payments: true
          }
        }
      },
      orderBy: { [sortBy]: order }
    }),
    prisma.order.count({ where })
  ]);

  res.json({
    success: true,
    data: orders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Create order
// @route   POST /api/v1/orders/:storeId/orders
// @access  Private (Store Owner/Staff with permission)
const createOrder = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const {
    customerId,
    guestEmail,
    guestName,
    guestPhone,
    items,
    shippingAddressId,
    billingAddressId,
    paymentMethod,
    shippingMethod,
    customerNote
  } = req.body;

  // Calculate order totals
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: {
        variants: item.variantId ? {
          where: { id: item.variantId }
        } : false
      }
    });

    if (!product) {
      res.status(400);
      throw new Error(`Product ${item.productId} not found`);
    }

    const price = item.variantId && product.variants[0]?.price 
      ? product.variants[0].price 
      : product.price;
    
    const itemTotal = price * item.quantity;
    subtotal += itemTotal;

    orderItems.push({
      productId: item.productId,
      variantId: item.variantId,
      productName: product.name,
      productSku: product.sku,
      variantName: item.variantId && product.variants[0] ? product.variants[0].name : null,
      price,
      quantity: item.quantity,
      total: itemTotal
    });
  }

  // Calculate total (you can add tax and shipping calculation here)
  const taxAmount = 0; // Implement tax calculation
  const shippingCost = 0; // Implement shipping calculation
  const discount = 0; // Implement discount calculation
  const total = subtotal + taxAmount + shippingCost - discount;

  // Create order
  const order = await prisma.order.create({
    data: {
      storeId,
      orderNumber: generateOrderNumber(),
      customerId,
      guestEmail,
      guestName,
      guestPhone,
      shippingAddressId,
      billingAddressId,
      subtotal,
      taxAmount,
      shippingCost,
      discount,
      total,
      paymentMethod,
      shippingMethod,
      customerNote,
      items: {
        create: orderItems
      }
    },
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
      },
      customer: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

// @desc    Get single order
// @route   GET /api/v1/orders/:storeId/orders/:orderId
// @access  Private (Store Access Required)
const getOrder = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              slug: true,
              thumbnail: true
            }
          },
          variant: {
            select: {
              name: true,
              attributes: true
            }
          }
        }
      },
      customer: true,
      shippingAddress: true,
      billingAddress: true,
      payments: true
    }
  });

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json({
    success: true,
    data: order
  });
});

// @desc    Update order
// @route   PUT /api/v1/orders/:storeId/orders/:orderId
// @access  Private (Store Owner/Staff with permission)
const updateOrder = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;

  // Remove fields that shouldn't be updated directly
  delete updateData.id;
  delete updateData.storeId;
  delete updateData.orderNumber;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: updateData,
    include: {
      items: true,
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
    data: order
  });
});

// @desc    Cancel order
// @route   DELETE /api/v1/orders/:storeId/orders/:orderId
// @access  Private (Store Owner/Staff with permission)
const cancelOrder = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date()
    }
  });

  res.json({
    success: true,
    data: order
  });
});

// @desc    Update order status
// @route   PATCH /api/v1/orders/:storeId/orders/:orderId/status
// @access  Private (Store Owner/Staff with permission)
const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });

  res.json({
    success: true,
    data: order
  });
});

// @desc    Update payment status
// @route   PATCH /api/v1/orders/:storeId/orders/:orderId/payment-status
// @access  Private (Store Owner/Staff with permission)
const updatePaymentStatus = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;

  const updateData = { paymentStatus };
  if (paymentStatus === 'PAID') {
    updateData.paidAt = new Date();
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: updateData
  });

  res.json({
    success: true,
    data: order
  });
});

// @desc    Update fulfillment status
// @route   PATCH /api/v1/orders/:storeId/orders/:orderId/fulfillment
// @access  Private (Store Owner/Staff with permission)
const updateFulfillmentStatus = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { fulfillmentStatus } = req.body;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { fulfillmentStatus }
  });

  res.json({
    success: true,
    data: order
  });
});

// @desc    Update shipping info
// @route   PATCH /api/v1/orders/:storeId/orders/:orderId/shipping
// @access  Private (Store Owner/Staff with permission)
const updateShippingInfo = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { shippingMethod, shippingCost } = req.body;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { subtotal: true, taxAmount: true, discount: true }
  });

  const newTotal = order.subtotal + order.taxAmount + (shippingCost || 0) - order.discount;

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      shippingMethod,
      shippingCost,
      total: newTotal
    }
  });

  res.json({
    success: true,
    data: updated
  });
});

// @desc    Update tracking info
// @route   PATCH /api/v1/orders/:storeId/orders/:orderId/tracking
// @access  Private (Store Owner/Staff with permission)
const updateTrackingInfo = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { trackingNumber, shippedAt } = req.body;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      trackingNumber,
      shippedAt: shippedAt ? new Date(shippedAt) : new Date(),
      status: 'SHIPPED'
    }
  });

  res.json({
    success: true,
    data: order
  });
});

// @desc    Get order analytics
// @route   GET /api/v1/orders/:storeId/orders/analytics
// @access  Private (Store Access Required)
const getOrderAnalytics = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { startDate, endDate } = req.query;

  const dateFilter = {};
  if (startDate || endDate) {
    dateFilter.createdAt = {};
    if (startDate) dateFilter.createdAt.gte = new Date(startDate);
    if (endDate) dateFilter.createdAt.lte = new Date(endDate);
  }

  const [orderStats, statusBreakdown, revenueStats] = await Promise.all([
    prisma.order.aggregate({
      where: { storeId, ...dateFilter },
      _count: true,
      _sum: { total: true },
      _avg: { total: true }
    }),
    prisma.order.groupBy({
      by: ['status'],
      where: { storeId, ...dateFilter },
      _count: true,
      _sum: { total: true }
    }),
    prisma.order.groupBy({
      by: ['paymentStatus'],
      where: { storeId, ...dateFilter },
      _count: true,
      _sum: { total: true }
    })
  ]);

  res.json({
    success: true,
    data: {
      orderStats,
      statusBreakdown,
      revenueStats
    }
  });
});

// Stub implementations for remaining functions
const addOrderItem = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

const updateOrderItem = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

const removeOrderItem = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

const addOrderNote = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { note } = req.body;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { staffNote: note }
  });

  res.json({ success: true, data: order });
});

const getOrderPayments = expressAsyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const payments = await prisma.payment.findMany({
    where: { orderId }
  });

  res.json({ success: true, data: payments });
});

const recordPayment = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

const refundOrder = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

const generateOrderReport = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

const bulkUpdateStatus = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const { orderIds, status } = req.body;

  const result = await prisma.order.updateMany({
    where: {
      id: { in: orderIds },
      storeId
    },
    data: { status }
  });

  res.json({
    success: true,
    message: `${result.count} orders updated successfully`
  });
});

const bulkExport = expressAsyncHandler(async (req, res) => {
  res.json({ success: true, message: 'To be implemented' });
});

module.exports = {
  getStoreOrders,
  createOrder,
  getOrder,
  updateOrder,
  cancelOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updateFulfillmentStatus,
  updateShippingInfo,
  updateTrackingInfo,
  getOrderAnalytics,
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
  addOrderNote,
  getOrderPayments,
  recordPayment,
  refundOrder,
  generateOrderReport,
  bulkUpdateStatus,
  bulkExport
};