export interface CategoryImage {
  path: string;
  public_id: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: CategoryImage | null;
  storeId: string;
  parentId?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  parent?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  children?: Category[];
  _count?: {
    children: number;
    products: number;
  };
}

export interface CategoryFormData {
  name: string;
  description?: string;
  parentId?: string | null;
  image?: CategoryImage;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CategoryState {
  categories: Category[];
  hierarchy: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  error: string | null;
  filters: {
    includeInactive: boolean;
  };
}

export interface ReorderCategoryItem {
  id: string;
  sortOrder: number;
}