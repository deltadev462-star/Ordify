const expressAsyncHandler = require('express-async-handler');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = expressAsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone, storeName } = req.body;

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
      role: 'STORE_OWNER'
    }
  });

  // Create default store if storeName provided
  let store = null;
  if (storeName) {
    const slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Check if slug exists
    const slugExists = await prisma.store.findUnique({
      where: { slug }
    });

    const finalSlug = slugExists ? `${slug}-${Date.now()}` : slug;

    store = await prisma.store.create({
      data: {
        name: storeName,
        slug: finalSlug,
        email: email,
        ownerId: user.id,
        status: 'PENDING'
      }
    });
  }

  // Generate tokens
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      store: store ? {
        id: store.id,
        name: store.name,
        slug: store.slug
      } : null,
      token,
      refreshToken
    }
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      stores: {
        select: {
          id: true,
          name: true,
          slug: true,
          status: true
        }
      }
    }
  });

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check password
  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check if account is active
  if (!user.isActive) {
    res.status(401);
    throw new Error('Account is inactive');
  }

  // Generate tokens
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      stores: user.stores,
      token,
      refreshToken
    }
  });
});

// @desc    Refresh token
// @route   POST /api/v1/auth/refresh-token
// @access  Public
const refreshToken = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error('Refresh token required');
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error('Invalid refresh token');
    }

    const newToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid refresh token');
  }
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = expressAsyncHandler(async (req, res) => {
  // In a production app, you might want to blacklist the token here
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = expressAsyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
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

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        isActive: user.isActive
      },
      stores: user.stores,
      staffStores: user.staffStores
    }
  });
});

// @desc    Update password
// @route   PUT /api/v1/auth/update-password
// @access  Private
const updatePassword = expressAsyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  // Check current password
  const isPasswordMatch = await comparePassword(currentPassword, user.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedPassword }
  });

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Update profile
// @route   PUT /api/v1/auth/update-profile
// @access  Private
const updateProfile = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      firstName,
      lastName,
      phone
    }
  });

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role
      }
    }
  });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // In production, you would:
  // 1. Generate a reset token
  // 2. Save it to database with expiration
  // 3. Send email with reset link

  res.json({
    success: true,
    message: 'Password reset email sent'
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password/:token
// @access  Public
const resetPassword = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // In production, you would:
  // 1. Verify the reset token
  // 2. Check if it's expired
  // 3. Update the password
  // 4. Delete the reset token

  res.json({
    success: true,
    message: 'Password reset successfully'
  });
});

// @desc    Verify email
// @route   GET /api/v1/auth/verify-email/:token
// @access  Public
const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;

  // In production, you would:
  // 1. Verify the email verification token
  // 2. Update user's emailVerified status
  // 3. Delete the verification token

  res.json({
    success: true,
    message: 'Email verified successfully'
  });
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  verifyEmail
};
