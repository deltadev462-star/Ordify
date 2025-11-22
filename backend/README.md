# Ordify Backend API

A multi-tenant e-commerce platform backend built with Node.js, Express, Prisma, and MongoDB.

## Features

- 🏪 **Multi-tenant Architecture**: Each merchant gets their own isolated store
- 🔐 **JWT Authentication**: Secure token-based authentication
- 👥 **Role-based Access Control**: Super Admin, Store Owner, and Store Staff roles
- 📦 **Product Management**: Products, variants, categories, and inventory
- 🛒 **Order Management**: Complete order lifecycle management
- 👨‍👩‍👧‍👦 **Customer Management**: Customer profiles, addresses, and order history
- 💰 **Payment Processing**: Payment tracking and refund management
- 📊 **Analytics**: Store and order analytics
- 🔍 **Search & Filtering**: Advanced search capabilities
- 📱 **RESTful API**: Well-structured REST endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ordify?retryWrites=true&w=majority"
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Push the schema to MongoDB:
```bash
npx prisma db push
```

7. (Optional) Seed the database:
```bash
npm run seed
```

8. Start the development server:
```bash
npm run dev
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register
- **POST** `/auth/register`
- **Body**: `{ email, password, firstName, lastName, phone?, storeName? }`

#### Login
- **POST** `/auth/login`
- **Body**: `{ email, password }`

#### Get Current User
- **GET** `/auth/me`
- **Headers**: `Authorization: Bearer <token>`

### Store Endpoints

#### Get My Stores
- **GET** `/stores`
- **Headers**: `Authorization: Bearer <token>`

#### Create Store
- **POST** `/stores`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name, email, description?, phone?, address?, ... }`

#### Get Store Details
- **GET** `/stores/:storeId`
- **Headers**: `Authorization: Bearer <token>`

#### Update Store
- **PUT** `/stores/:storeId`
- **Headers**: `Authorization: Bearer <token>`

### Product Endpoints

#### Get Store Products
- **GET** `/products/:storeId/products`
- **Headers**: `Authorization: Bearer <token>`
- **Query**: `page, limit, search, category, status, featured, sortBy, order`

#### Create Product
- **POST** `/products/:storeId/products`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Product data

#### Get Public Products (for customers)
- **GET** `/products/public/:storeSlug`
- **Query**: `page, limit, search, category, minPrice, maxPrice`

### Category Endpoints

#### Get Store Categories
- **GET** `/categories/:storeId/categories`
- **Headers**: `Authorization: Bearer <token>`

#### Create Category
- **POST** `/categories/:storeId/categories`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name, description?, parentId?, image? }`

#### Get Public Categories (for customers)
- **GET** `/categories/public/:storeSlug`

### Customer Endpoints

#### Get Store Customers
- **GET** `/customers/:storeId/customers`
- **Headers**: `Authorization: Bearer <token>`
- **Query**: `page, limit, search`

#### Create Customer
- **POST** `/customers/:storeId/customers`
- **Headers**: `Authorization: Bearer <token>`

### Order Endpoints

#### Get Store Orders
- **GET** `/orders/:storeId/orders`
- **Headers**: `Authorization: Bearer <token>`
- **Query**: `page, limit, status, paymentStatus, customerId, startDate, endDate`

#### Create Order
- **POST** `/orders/:storeId/orders`
- **Headers**: `Authorization: Bearer <token>`

#### Update Order Status
- **PATCH** `/orders/:storeId/orders/:orderId/status`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ status }`

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js            # Database seeder
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── auth.controller.js
│   │   ├── store.controller.js
│   │   ├── product.controller.js
│   │   ├── category.controller.js
│   │   ├── customer.controller.js
│   │   ├── order.controller.js
│   │   └── user.controller.js
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── routes/           # API routes
│   │   ├── auth.routes.js
│   │   ├── store.routes.js
│   │   ├── product.routes.js
│   │   ├── category.routes.js
│   │   ├── customer.routes.js
│   │   ├── order.routes.js
│   │   └── user.routes.js
│   ├── utils/            # Utility functions
│   │   ├── jwt.js
│   │   └── password.js
│   ├── validators/       # Request validators
│   │   ├── auth.validator.js
│   │   ├── store.validator.js
│   │   ├── product.validator.js
│   │   ├── category.validator.js
│   │   ├── customer.validator.js
│   │   ├── order.validator.js
│   │   └── user.validator.js
│   └── server.js         # Express app setup
├── uploads/              # File uploads directory
├── .env                  # Environment variables
├── .env.example         # Example environment variables
├── package.json         # Dependencies and scripts
└── README.md           # Documentation

```

## Database Schema

The application uses MongoDB with the following main collections:

- **Users**: Store owners and staff members
- **Stores**: Individual merchant stores
- **Products**: Store products with variants
- **Categories**: Product categories with hierarchy
- **Customers**: Store customers
- **Orders**: Customer orders
- **Payments**: Payment transactions
- **Reviews**: Product reviews
- **Addresses**: Customer addresses

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet for security headers
- Input validation
- MongoDB injection prevention

## Development

### Running in Development Mode
```bash
npm run dev
```

### Database Management

View database with Prisma Studio:
```bash
npm run prisma:studio
```

Update database schema:
```bash
npm run prisma:push
```

Generate Prisma client:
```bash
npm run prisma:generate
```

### Testing with cURL

Register a new user:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123",
    "firstName": "John",
    "lastName": "Doe",
    "storeName": "John's Store"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Set up MongoDB Atlas for cloud database
4. Configure proper CORS origins
5. Use HTTPS in production
6. Set strong JWT secrets
7. Enable rate limiting
8. Set up monitoring and logging

## License

ISC

## Support

For issues and questions, please create an issue in the repository.