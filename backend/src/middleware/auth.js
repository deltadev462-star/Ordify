const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');

// Protect routes
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    req.user = await global.prisma.user.findUnique({
      where: {
        id: decoded.id
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        stores: {
          select: {
            id: true,
            slug: true,
            name: true,
            status: true
          }
        },
        staffStores: {
          include: {
            store: {
              select: {
                id: true,
                slug: true,
                name: true,
                status: true
              }
            }
          }
        }
      }
    });

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (!req.user.isActive) {
      res.status(401);
      throw new Error('User account is inactive');
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`User role ${req.user.role} is not authorized to access this route`);
    }
    next();
  };
};

// Verify store ownership or staff access
const verifyStoreAccess = expressAsyncHandler(async (req, res, next) => {
  const storeId = req.params.storeId || req.body.storeId || req.query.storeId;

  if (!storeId) {
    res.status(400);
    throw new Error('Store ID is required');
  }

  // Super admin has access to all stores
  if (req.user.role === 'SUPER_ADMIN') {
    next();
    return;
  }

  // Check if user owns the store
  const ownedStore = req.user.stores.find(store => store.id === storeId);
  
  // Check if user is staff in the store
  const staffStore = req.user.staffStores.find(staff => staff.store.id === storeId);

  if (!ownedStore && !staffStore) {
    res.status(403);
    throw new Error('You do not have access to this store');
  }

  // Add store info to request
  req.store = ownedStore || staffStore.store;
  req.isOwner = !!ownedStore;
  req.isStaff = !!staffStore;
  
  if (staffStore) {
    req.permissions = staffStore.permissions || [];
  }

  next();
});

// Check specific permission for staff
const checkPermission = (permission) => {
  return (req, res, next) => {
    // Owners and super admins have all permissions
    if (req.user.role === 'SUPER_ADMIN' || req.isOwner) {
      next();
      return;
    }

    // Check staff permissions
    if (req.isStaff && req.permissions && req.permissions.includes(permission)) {
      next();
      return;
    }

    res.status(403);
    throw new Error(`Permission denied: ${permission} required`);
  };
};

// Get store from slug in subdomain or path
const extractStore = expressAsyncHandler(async (req, res, next) => {
  let storeSlug;

  // Check for subdomain
  const host = req.get('host');
  const subdomain = host.split('.')[0];
  
  // If not 'www' or 'api', it's a store subdomain
  if (subdomain && subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'localhost') {
    storeSlug = subdomain;
  }

  // Check for store slug in path (override subdomain if exists)
  if (req.params.storeSlug) {
    storeSlug = req.params.storeSlug;
  }

  if (storeSlug) {
    const store = await global.prisma.store.findUnique({
      where: {
        slug: storeSlug
      },
      select: {
        id: true,
        slug: true,
        name: true,
        status: true,
        isActive: true,
        theme: true,
        currency: true,
        language: true,
        timezone: true
      }
    });

    if (!store) {
      res.status(404);
      throw new Error('Store not found');
    }

    if (!store.isActive || store.status !== 'ACTIVE') {
      res.status(403);
      throw new Error('Store is not active');
    }

    req.store = store;
  }

  next();
});

module.exports = {
  protect,
  authorize,
  verifyStoreAccess,
  checkPermission,
  extractStore
};
