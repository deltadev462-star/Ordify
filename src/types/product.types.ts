// Product Status constants
export const ProductStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
} as const;

export type ProductStatus = typeof ProductStatus[keyof typeof ProductStatus];

// Product Image interface
export interface ProductImage {
  path: string;
  public_id: string;
}

// Product interface matching Prisma schema
export interface Product {
  id: string;
  storeId: string;
  
  // Basic Information
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  
  // Pricing
  price: number;
  comparePrice?: number | null;
  costPrice?: number | null;
  
  // Inventory
  sku?: string | null;
  barcode?: string | null;
  trackQuantity: boolean;
  quantity: number;
  lowStockAlert: number;
  
  // Product Details
  weight?: number | null;
  weightUnit: string;
  
  // Media
  mainImage: ProductImage;
  subImages?: ProductImage[] | null;
  thumbnail?: string | null;
  
  // SEO
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords: string[];
  
  // Status
  status: ProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  
  // Relations
  categoryId?: string | null;
  category?: any | null; // Category type from category.types.ts
  
  // Analytics
  viewCount: number;
  soldCount: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// Product Form Data for create/update operations
export interface ProductFormData {
  // Basic Information
  name: string;
  slug?: string;
  description?: string | null;
  shortDescription?: string | null;
  
  // Pricing
  price: number;
  comparePrice?: number | null;
  costPrice?: number | null;
  
  // Inventory
  sku?: string | null;
  barcode?: string | null;
  trackQuantity?: boolean;
  quantity?: number;
  lowStockAlert?: number;
  
  // Product Details
  weight?: number | null;
  weightUnit?: string;
  
  // SEO
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[];
  
  // Status
  status?: ProductStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  
  // Relations
  categoryId?: string | null;
}

// Product filters for fetching
export interface ProductFilters {
  search?: string;
  categoryId?: string | null;
  status?: ProductStatus | 'all';
  isActive?: boolean | 'all';
  isFeatured?: boolean | 'all';
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt' | 'soldCount' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Bulk operations
export interface BulkProductUpdate {
  productIds: string[];
  updates: {
    status?: ProductStatus;
    isActive?: boolean;
    isFeatured?: boolean;
    categoryId?: string | null;
  };
}

// Product state for Redux
export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  bulkLoading: boolean;
  error: string | null;
  filters: ProductFilters;
}

// API Response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
}

export interface ProductsListResponse {
  success: boolean;
  data?: ProductsResponse;
  error?: string;
}

// Image upload types
export interface ImageUploadData {
  mainImage?: File | null;
  subImages?: File[] | null;
  removeMainImage?: boolean;
  removeSubImageIds?: string[];
}