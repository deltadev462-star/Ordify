import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { ProductState, Product, ProductFilters } from '@/types/product.types';
import {
  fetchProductsHandler,
  createProductHandler,
  fetchProductHandler,
  updateProductHandler,
  updateProductStatusHandler,
  deleteProductHandler,
  bulkDeleteProductsHandler,
  bulkUpdateProductsHandler,
  duplicateProductHandler
} from './actions';

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  bulkLoading: false,
  error: null,
  filters: {
    status: 'all',
    isActive: 'all',
    isFeatured: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.selectedProduct = null;
      } else {
        const product = state.products.find(prod => prod.id === action.payload);
        state.selectedProduct = product || null;
      }
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setProductFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    resetProductFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateProductInState: (state, action: PayloadAction<{ id: string; updates: Partial<Product> }>) => {
      const index = state.products.findIndex(prod => prod.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload.updates
        };
      }
    },
    updateProductQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.products.find(prod => prod.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct.quantity = action.payload.quantity;
      }
    },
    incrementProductView: (state, action: PayloadAction<string>) => {
      const product = state.products.find(prod => prod.id === action.payload);
      if (product) {
        product.viewCount += 1;
      }
    },
    resetProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.totalProducts = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    fetchProductsHandler(builder);
    createProductHandler(builder);
    fetchProductHandler(builder);
    updateProductHandler(builder);
    updateProductStatusHandler(builder);
    deleteProductHandler(builder);
    bulkDeleteProductsHandler(builder);
    bulkUpdateProductsHandler(builder);
    duplicateProductHandler(builder);
  }
});

// Base selectors
const selectProductState = (state: { products: ProductState }) => state.products;
const selectProducts = (state: { products: ProductState }) => state.products.products;

// Memoized selectors
export const productSelectors = {
  // Get all products
  selectAllProducts: selectProducts,
  
  // Get selected product
  selectSelectedProduct: (state: { products: ProductState }) => state.products.selectedProduct,
  
  // Get product by ID
  selectProductById: (productId: string) => (state: { products: ProductState }) =>
    state.products.products.find(prod => prod.id === productId),
  
  // Get products by category
  selectProductsByCategory: (categoryId: string | null) => (state: { products: ProductState }) =>
    state.products.products.filter(prod => prod.categoryId === categoryId),
  
  // Get active products only
  selectActiveProducts: createSelector(
    [selectProducts],
    (products) => products.filter(prod => prod.isActive)
  ),
  
  // Get published products only
  selectPublishedProducts: createSelector(
    [selectProducts],
    (products) => products.filter(prod => prod.status === 'PUBLISHED' && prod.isActive)
  ),
  
  // Get featured products
  selectFeaturedProducts: createSelector(
    [selectProducts],
    (products) => products.filter(prod => prod.isFeatured && prod.isActive && prod.status === 'PUBLISHED')
  ),
  
  // Get products in stock
  selectInStockProducts: createSelector(
    [selectProducts],
    (products) => products.filter(prod => {
      if (!prod.trackQuantity) return true;
      return prod.quantity > 0;
    })
  ),
  
  // Get low stock products
  selectLowStockProducts: createSelector(
    [selectProducts],
    (products) => products.filter(prod => {
      if (!prod.trackQuantity) return false;
      return prod.quantity <= prod.lowStockAlert && prod.quantity > 0;
    })
  ),
  
  // Get out of stock products
  selectOutOfStockProducts: createSelector(
    [selectProducts],
    (products) => products.filter(prod => {
      if (!prod.trackQuantity) return false;
      return prod.quantity === 0;
    })
  ),
  
  // Get product counts by status - MEMOIZED
  selectProductCountsByStatus: createSelector(
    [selectProducts],
    (products) => ({
      total: products.length,
      draft: products.filter(p => p.status === 'DRAFT').length,
      published: products.filter(p => p.status === 'PUBLISHED').length,
      archived: products.filter(p => p.status === 'ARCHIVED').length,
      active: products.filter(p => p.isActive).length,
      featured: products.filter(p => p.isFeatured).length,
      inStock: products.filter(p => !p.trackQuantity || p.quantity > 0).length,
      lowStock: products.filter(p => p.trackQuantity && p.quantity <= p.lowStockAlert && p.quantity > 0).length,
      outOfStock: products.filter(p => p.trackQuantity && p.quantity === 0).length
    })
  ),
  
  // Get pagination info - MEMOIZED
  selectProductPagination: createSelector(
    [selectProductState],
    (productState) => ({
      currentPage: productState.currentPage,
      totalPages: productState.totalPages,
      totalProducts: productState.totalProducts,
      productsPerPage: productState.filters.limit || 20
    })
  ),
  
  // Get loading states
  selectProductLoading: (state: { products: ProductState }) => state.products.loading,
  selectProductCreateLoading: (state: { products: ProductState }) => state.products.createLoading,
  selectProductUpdateLoading: (state: { products: ProductState }) => state.products.updateLoading,
  selectProductDeleteLoading: (state: { products: ProductState }) => state.products.deleteLoading,
  selectProductBulkLoading: (state: { products: ProductState }) => state.products.bulkLoading,
  selectAnyProductLoading: (state: { products: ProductState }) => 
    state.products.loading || 
    state.products.createLoading || 
    state.products.updateLoading || 
    state.products.deleteLoading ||
    state.products.bulkLoading,
  
  // Get error
  selectProductError: (state: { products: ProductState }) => state.products.error,
  
  // Get filters
  selectProductFilters: (state: { products: ProductState }) => state.products.filters,
  
  // Get sorted products - MEMOIZED
  selectSortedProducts: createSelector(
    [selectProducts, (state: { products: ProductState }) => state.products.filters],
    (products, filters) => {
      const sortedProducts = [...products];
      const { sortBy, sortOrder } = filters;
      
      return sortedProducts.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'createdAt':
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case 'soldCount':
            comparison = a.soldCount - b.soldCount;
            break;
          case 'viewCount':
            comparison = a.viewCount - b.viewCount;
            break;
          default:
            comparison = 0;
        }
        
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }
  ),
  
  // Advanced product search
  selectSearchedProducts: (searchTerm: string) => (state: { products: ProductState }) => {
    if (!searchTerm) return state.products.products;
    
    const term = searchTerm.toLowerCase();
    return state.products.products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.sku?.toLowerCase().includes(term) ||
      product.barcode?.toLowerCase().includes(term)
    );
  }
};

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setProductFilters,
  resetProductFilters,
  clearError,
  updateProductInState,
  updateProductQuantity,
  incrementProductView,
  resetProducts
} = productSlice.actions;

export default productSlice.reducer;