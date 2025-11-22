const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create super admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ordify.com' },
    update: {},
    create: {
      email: 'admin@ordify.com',
      password: adminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      emailVerified: true,
      isActive: true
    }
  });
  console.log('✅ Created super admin:', admin.email);

  // Create demo store owner
  const ownerPassword = await bcrypt.hash('Demo@123', 10);
  const storeOwner = await prisma.user.upsert({
    where: { email: 'demo@ordify.com' },
    update: {},
    create: {
      email: 'demo@ordify.com',
      password: ownerPassword,
      firstName: 'Demo',
      lastName: 'Owner',
      phone: '+1234567890',
      role: 'STORE_OWNER',
      emailVerified: true,
      isActive: true
    }
  });
  console.log('✅ Created demo store owner:', storeOwner.email);

  // Create demo store
  const demoStore = await prisma.store.upsert({
    where: { slug: 'demo-store' },
    update: {},
    create: {
      name: 'Demo Store',
      slug: 'demo-store',
      description: 'A demonstration store showcasing Ordify features',
      email: 'store@demo.com',
      phone: '+1234567890',
      address: '123 Demo Street',
      city: 'Demo City',
      state: 'Demo State',
      country: 'Demo Country',
      postalCode: '12345',
      currency: 'USD',
      language: 'en',
      timezone: 'UTC',
      status: 'ACTIVE',
      isActive: true,
      ownerId: storeOwner.id,
      metaTitle: 'Demo Store - Best Products Online',
      metaDescription: 'Shop the best products at Demo Store',
      metaKeywords: ['demo', 'store', 'shopping', 'ecommerce']
    }
  });
  console.log('✅ Created demo store:', demoStore.name);

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and accessories',
      storeId: demoStore.id,
      isActive: true,
      sortOrder: 1
    }
  });

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      slug: 'clothing',
      description: 'Fashion and apparel',
      storeId: demoStore.id,
      isActive: true,
      sortOrder: 2
    }
  });

  const smartphones = await prisma.category.create({
    data: {
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Mobile phones and accessories',
      storeId: demoStore.id,
      parentId: electronics.id,
      isActive: true,
      sortOrder: 1
    }
  });

  console.log('✅ Created categories');

  // Create products
  const products = [
    {
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      description: 'The latest iPhone with advanced features',
      shortDescription: 'Premium smartphone with A17 Pro chip',
      price: 999.99,
      comparePrice: 1099.99,
      sku: 'IPH15PRO',
      quantity: 50,
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      categoryId: smartphones.id,
      storeId: demoStore.id,
      images: [],
      metaKeywords: ['iphone', 'smartphone', 'apple']
    },
    {
      name: 'Samsung Galaxy S24',
      slug: 'samsung-galaxy-s24',
      description: 'Flagship Android smartphone',
      shortDescription: 'Powerful Android device with AI features',
      price: 899.99,
      comparePrice: 999.99,
      sku: 'SAM24',
      quantity: 30,
      status: 'PUBLISHED',
      isActive: true,
      categoryId: smartphones.id,
      storeId: demoStore.id,
      images: [],
      metaKeywords: ['samsung', 'android', 'galaxy']
    },
    {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'Premium noise-canceling wireless headphones',
      shortDescription: 'High-quality audio experience',
      price: 299.99,
      sku: 'WH001',
      quantity: 100,
      status: 'PUBLISHED',
      isActive: true,
      categoryId: electronics.id,
      storeId: demoStore.id,
      images: [],
      metaKeywords: ['headphones', 'audio', 'wireless']
    },
    {
      name: 'Classic T-Shirt',
      slug: 'classic-tshirt',
      description: 'Comfortable cotton t-shirt',
      shortDescription: '100% cotton comfort',
      price: 29.99,
      comparePrice: 39.99,
      sku: 'TSH001',
      quantity: 200,
      status: 'PUBLISHED',
      isActive: true,
      categoryId: clothing.id,
      storeId: demoStore.id,
      images: [],
      metaKeywords: ['tshirt', 'clothing', 'cotton']
    }
  ];

  for (const productData of products) {
    await prisma.product.create({ data: productData });
  }
  console.log('✅ Created sample products');

  // Create demo customers
  const customer1 = await prisma.customer.create({
    data: {
      email: 'john.customer@example.com',
      firstName: 'John',
      lastName: 'Customer',
      phone: '+1234567891',
      storeId: demoStore.id,
      isActive: true
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      email: 'jane.customer@example.com',
      firstName: 'Jane',
      lastName: 'Customer',
      phone: '+1234567892',
      storeId: demoStore.id,
      isActive: true
    }
  });

  console.log('✅ Created demo customers');

  // Create customer addresses
  await prisma.address.create({
    data: {
      customerId: customer1.id,
      type: 'BOTH',
      isDefault: true,
      fullName: 'John Customer',
      addressLine1: '456 Customer Street',
      city: 'Customer City',
      state: 'Customer State',
      country: 'USA',
      postalCode: '54321',
      phone: '+1234567891'
    }
  });

  console.log('✅ Created customer addresses');

  console.log('✨ Database seeding completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('Super Admin: admin@ordify.com / Admin@123');
  console.log('Store Owner: demo@ordify.com / Demo@123');
  console.log('Store Slug: demo-store');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });