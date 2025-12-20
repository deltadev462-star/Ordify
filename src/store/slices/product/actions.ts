import { API_ENDPOINTS } from "@/store/config/api";
import type { 
  ProductState, 
  Product, 
  ProductFormData, 
  ProductFilters,
  ProductsResponse,
  BulkProductUpdate,
  ImageUploadData
} from "@/types/product.types";
import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "@/store/store";

// Helper function to get storeId from the user's store
const getStoreId = (state: RootState): string => {
  const user = state.auth.user;
  if (!user || !user.storeId) {
    throw new Error('User does not have a store');
  }
  return user.storeId;
};

// Fetch products with filters
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: ProductFilters = {}, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      // Clean up filters before sending to backend
      const cleanedFilters: any = {};
      
      Object.entries(filters).forEach(([key, value]) => {
        // Skip "all" values and undefined/null values
        if (value !== 'all' && value !== undefined && value !== null) {
          // For boolean values that are strings, convert them
          if (key === 'isActive' || key === 'isFeatured' || key === 'inStock') {
            if (typeof value === 'string') {
              cleanedFilters[key] = value === 'true';
            } else {
              cleanedFilters[key] = value;
            }
          } else {
            cleanedFilters[key] = value;
          }
        }
      });
      
      const response = await axios.get(API_ENDPOINTS.getStoreProducts(storeId), {
        params: cleanedFilters
      });
      
      const { success, data, pagination } = response.data;
      if (success) {
        // Transform backend response to match frontend expectations
        return {
          products: data,
          total: pagination.total,
          page: pagination.page,
          totalPages: pagination.pages
        } as ProductsResponse;
      }
      
      return rejectWithValue('Failed to fetch products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Create new product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ productData, images }: { productData: ProductFormData; images?: ImageUploadData }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const formData = new FormData();
      
      // Append product data
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      // Append images
      if (images?.mainImage) {
        formData.append('mainImage', images.mainImage);
      }
      if (images?.subImages) {
        images.subImages.forEach((image, index) => {
          formData.append(`subImages`, image);
        });
      }
      
      const response = await axios.post(API_ENDPOINTS.createProduct(storeId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { success, data } = response.data;
      
      if (success) {
        return data as Product;
      }
      
      return rejectWithValue('Failed to create product');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to create product');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Fetch single product
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.get(API_ENDPOINTS.getProduct(storeId, productId));
      const { success, data } = response.data;
      
      if (success) {
        return data as Product;
      }
      
      return rejectWithValue('Failed to fetch product');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch product');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, data, images }: { productId: string; data: ProductFormData; images?: ImageUploadData }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const formData = new FormData();
      
      // Append product data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      // Handle images
      if (images) {
        if (images.removeMainImage) {
          formData.append('removeMainImage', 'true');
        } else if (images.mainImage) {
          formData.append('mainImage', images.mainImage);
        }
        
        if (images.subImages) {
          images.subImages.forEach((image) => {
            formData.append('subImages', image);
          });
        }
        
        if (images.removeSubImageIds && images.removeSubImageIds.length > 0) {
          formData.append('removedImages', JSON.stringify(images.removeSubImageIds));
        }
      }
      
      const response = await axios.put(API_ENDPOINTS.updateProduct(storeId, productId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { success, data: productData } = response.data;
      
      if (success) {
        return productData as Product;
      }
      
      return rejectWithValue('Failed to update product');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update product');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Update product status
export const updateProductStatus = createAsyncThunk(
  'products/updateProductStatus',
  async ({ productId, status }: { productId: string; status: Product['status'] }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.patch(API_ENDPOINTS.updateProductStatus(storeId, productId), {
        status
      });
      
      const { success, data } = response.data;
      
      if (success) {
        return { productId, status };
      }
      
      return rejectWithValue('Failed to update product status');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update product status');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.delete(API_ENDPOINTS.deleteProduct(storeId, productId));
      const { success } = response.data;
      
      if (success) {
        return productId;
      }
      
      return rejectWithValue('Failed to delete product');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete product');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Bulk delete products
export const bulkDeleteProducts = createAsyncThunk(
  'products/bulkDeleteProducts',
  async (productIds: string[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.delete(API_ENDPOINTS.bulkDeleteProducts(storeId), {
        data: { productIds }
      });
      const { success } = response.data;
      
      if (success) {
        return productIds;
      }
      
      return rejectWithValue('Failed to delete products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Bulk update products
export const bulkUpdateProducts = createAsyncThunk(
  'products/bulkUpdateProducts',
  async (bulkUpdate: BulkProductUpdate, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.patch(API_ENDPOINTS.bulkUpdateProducts(storeId), bulkUpdate);
      const { success, data } = response.data;
      
      if (success) {
        return bulkUpdate;
      }
      
      return rejectWithValue('Failed to update products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Duplicate product
export const duplicateProduct = createAsyncThunk(
  'products/duplicateProduct',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.post(API_ENDPOINTS.duplicateProduct(storeId, productId));
      const { success, data } = response.data;
      
      if (success) {
        return data as Product;
      }
      
      return rejectWithValue('Failed to duplicate product');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to duplicate product');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Action handlers
export const fetchProductsHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.total;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

export const createProductHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(createProduct.pending, (state) => {
      state.createLoading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.createLoading = false;
      state.products.unshift(action.payload);
      state.totalProducts += 1;
      state.error = null;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.createLoading = false;
      state.error = action.payload as string;
    });
};

export const fetchProductHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = null;
    })
    .addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

export const updateProductHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(updateProduct.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.updateLoading = false;
      const index = state.products.findIndex(prod => prod.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
      state.error = null;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });
};

export const updateProductStatusHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(updateProductStatus.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    })
    .addCase(updateProductStatus.fulfilled, (state, action) => {
      state.updateLoading = false;
      const product = state.products.find(prod => prod.id === action.payload.productId);
      if (product) {
        product.status = action.payload.status;
      }
      if (state.selectedProduct?.id === action.payload.productId) {
        state.selectedProduct.status = action.payload.status;
      }
      state.error = null;
    })
    .addCase(updateProductStatus.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });
};

export const deleteProductHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(deleteProduct.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.products = state.products.filter(prod => prod.id !== action.payload);
      state.totalProducts -= 1;
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null;
      }
      state.error = null;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload as string;
    });
};

export const bulkDeleteProductsHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(bulkDeleteProducts.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
    })
    .addCase(bulkDeleteProducts.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.products = state.products.filter(prod => !action.payload.includes(prod.id));
      state.totalProducts -= action.payload.length;
      if (state.selectedProduct && action.payload.includes(state.selectedProduct.id)) {
        state.selectedProduct = null;
      }
      state.error = null;
    })
    .addCase(bulkDeleteProducts.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload as string;
    });
};

export const bulkUpdateProductsHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(bulkUpdateProducts.pending, (state) => {
      state.bulkLoading = true;
      state.error = null;
    })
    .addCase(bulkUpdateProducts.fulfilled, (state, action) => {
      state.bulkLoading = false;
      const { productIds, updates } = action.payload;
      
      state.products = state.products.map(product => {
        if (productIds.includes(product.id)) {
          return {
            ...product,
            ...updates
          };
        }
        return product;
      });
      
      if (state.selectedProduct && productIds.includes(state.selectedProduct.id)) {
        state.selectedProduct = {
          ...state.selectedProduct,
          ...updates
        };
      }
      state.error = null;
    })
    .addCase(bulkUpdateProducts.rejected, (state, action) => {
      state.bulkLoading = false;
      state.error = action.payload as string;
    });
};

export const duplicateProductHandler = (builder: ActionReducerMapBuilder<ProductState>) => {
  builder
    .addCase(duplicateProduct.pending, (state) => {
      state.createLoading = true;
      state.error = null;
    })
    .addCase(duplicateProduct.fulfilled, (state, action) => {
      state.createLoading = false;
      state.products.unshift(action.payload);
      state.totalProducts += 1;
      state.error = null;
    })
    .addCase(duplicateProduct.rejected, (state, action) => {
      state.createLoading = false;
      state.error = action.payload as string;
    });
};