import { API_ENDPOINTS } from "@/store/config/api";
import type { CategoryState, CategoryFormData, ReorderCategoryItem } from "@/types/category.types";
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

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (includeInactive: boolean = false, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.get(API_ENDPOINTS.getStoreCategories(storeId), {
        params: { includeInactive }
      });
      
      const { success, data } = response.data;
      if (success) {
        return data; // { flat: Category[], hierarchy: Category[] }
      }
      
      return rejectWithValue('Failed to fetch categories');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch categories');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async ({ categoryData, imageFile }: { categoryData: CategoryFormData; imageFile?: File | null }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', categoryData.name);
      if (categoryData.description) {
        formData.append('description', categoryData.description);
      }
      if (categoryData.parentId) {
        formData.append('parentId', categoryData.parentId);
      }
      formData.append('isActive', String(categoryData.isActive ?? true));
      formData.append('sortOrder', String(categoryData.sortOrder ?? 0));
      
      // Append image if provided
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      const response = await axios.post(API_ENDPOINTS.createCategory(storeId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { success, data } = response.data;
      
      if (success) {
        return data;
      }
      
      return rejectWithValue('Failed to create category');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to create category');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchCategory = createAsyncThunk(
  'categories/fetchCategory',
  async (categoryId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.get(API_ENDPOINTS.getCategory(storeId, categoryId));
      const { success, data } = response.data;
      
      if (success) {
        return data;
      }
      
      return rejectWithValue('Failed to fetch category');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch category');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ categoryId, data, imageFile }: { categoryId: string; data: CategoryFormData; imageFile?: File | null }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', data.name);
      if (data.description) {
        formData.append('description', data.description);
      }
      if (data.parentId) {
        formData.append('parentId', data.parentId);
      }
      formData.append('isActive', String(data.isActive ?? true));
      formData.append('sortOrder', String(data.sortOrder ?? 0));
      
      // Handle image: either new file or explicit removal (null)
      if (imageFile !== undefined) {
        if (imageFile === null) {
          // Explicitly removing the image
          formData.append('removeExistingImage', 'true');
        } else {
          // Adding new image
          formData.append('image', imageFile);
        }
      }
      
      const response = await axios.put(API_ENDPOINTS.updateCategory(storeId, categoryId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { success, data: categoryData } = response.data;
      
      if (success) {
        return categoryData;
      }
      
      return rejectWithValue('Failed to update category');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update category');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.delete(API_ENDPOINTS.deleteCategory(storeId, categoryId));
      const { success } = response.data;
      
      if (success) {
        return categoryId;
      }
      
      return rejectWithValue('Failed to delete category');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete category');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const bulkDeleteCategories = createAsyncThunk(
  'categories/bulkDeleteCategories',
  async (categoryIds: string[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.delete(API_ENDPOINTS.bulkDeleteCategories(storeId), {
        data: { categoryIds }
      });
      const { success } = response.data;
      
      if (success) {
        return categoryIds;
      }
      
      return rejectWithValue('Failed to delete categories');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete categories');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const reorderCategories = createAsyncThunk(
  'categories/reorderCategories',
  async (categories: ReorderCategoryItem[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.patch(API_ENDPOINTS.reorderCategories(storeId), {
        categories
      });
      const { success } = response.data;
      
      if (success) {
        return categories;
      }
      
      return rejectWithValue('Failed to reorder categories');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to reorder categories');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateCategoryParent = createAsyncThunk(
  'categories/updateCategoryParent',
  async ({ categoryId, parentId }: { categoryId: string; parentId: string | null }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const storeId = getStoreId(state);
      
      const response = await axios.put(API_ENDPOINTS.updateCategoryParent(storeId, categoryId), {
        parentId
      });
      const { success, data } = response.data;
      
      if (success) {
        return data;
      }
      
      return rejectWithValue('Failed to update category parent');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update category parent');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Action handlers
export const fetchCategoriesHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.flat;
      state.hierarchy = action.payload.hierarchy;
      state.error = null;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

export const createCategoryHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(createCategory.pending, (state) => {
      state.createLoading = true;
      state.error = null;
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.createLoading = false;
      state.categories.push(action.payload);
      state.error = null;
      // Rebuild hierarchy after adding new category
      state.hierarchy = buildHierarchy(state.categories);
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.createLoading = false;
      state.error = action.payload as string;
    });
};

export const fetchCategoryHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(fetchCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCategory = action.payload;
      state.error = null;
    })
    .addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

export const updateCategoryHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(updateCategory.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.updateLoading = false;
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      if (state.selectedCategory?.id === action.payload.id) {
        state.selectedCategory = action.payload;
      }
      // Rebuild hierarchy after update
      state.hierarchy = buildHierarchy(state.categories);
      state.error = null;
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });
};

export const deleteCategoryHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(deleteCategory.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
      if (state.selectedCategory?.id === action.payload) {
        state.selectedCategory = null;
      }
      // Rebuild hierarchy after deletion
      state.hierarchy = buildHierarchy(state.categories);
      state.error = null;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload as string;
    });
};

export const bulkDeleteCategoriesHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(bulkDeleteCategories.pending, (state) => {
      state.deleteLoading = true;
      state.error = null;
    })
    .addCase(bulkDeleteCategories.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.categories = state.categories.filter(cat => !action.payload.includes(cat.id));
      if (state.selectedCategory && action.payload.includes(state.selectedCategory.id)) {
        state.selectedCategory = null;
      }
      // Rebuild hierarchy after bulk deletion
      state.hierarchy = buildHierarchy(state.categories);
      state.error = null;
    })
    .addCase(bulkDeleteCategories.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload as string;
    });
};

export const reorderCategoriesHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(reorderCategories.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    })
    .addCase(reorderCategories.fulfilled, (state, action) => {
      state.updateLoading = false;
      // Update sort order for reordered categories
      action.payload.forEach(item => {
        const category = state.categories.find(cat => cat.id === item.id);
        if (category) {
          category.sortOrder = item.sortOrder;
        }
      });
      // Sort categories by sortOrder
      state.categories.sort((a, b) => a.sortOrder - b.sortOrder);
      // Rebuild hierarchy after reordering
      state.hierarchy = buildHierarchy(state.categories);
      state.error = null;
    })
    .addCase(reorderCategories.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });
};

export const updateCategoryParentHandler = (builder: ActionReducerMapBuilder<CategoryState>) => {
  builder
    .addCase(updateCategoryParent.pending, (state) => {
      state.updateLoading = true;
      state.error = null;
    })
    .addCase(updateCategoryParent.fulfilled, (state, action) => {
      state.updateLoading = false;
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      if (state.selectedCategory?.id === action.payload.id) {
        state.selectedCategory = action.payload;
      }
      // Rebuild hierarchy after parent change
      state.hierarchy = buildHierarchy(state.categories);
      state.error = null;
    })
    .addCase(updateCategoryParent.rejected, (state, action) => {
      state.updateLoading = false;
      state.error = action.payload as string;
    });
};

// Helper function to build hierarchy
const buildHierarchy = (categories: any[]): any[] => {
  const buildTree = (parentId: string | null = null): any[] => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildTree(cat.id)
      }));
  };
  return buildTree();
};