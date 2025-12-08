import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CategoryState } from '@/types/category.types';
import {
  fetchCategoriesHandler,
  createCategoryHandler,
  fetchCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  bulkDeleteCategoriesHandler,
  reorderCategoriesHandler,
  updateCategoryParentHandler
} from './actions';

const initialState: CategoryState = {
  categories: [],
  hierarchy: [],
  selectedCategory: null,
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
  filters: {
    includeInactive: false
  }
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.selectedCategory = null;
      } else {
        const category = state.categories.find(cat => cat.id === action.payload);
        state.selectedCategory = category || null;
      }
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    setIncludeInactive: (state, action: PayloadAction<boolean>) => {
      state.filters.includeInactive = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateCategoryInState: (state, action: PayloadAction<{ id: string; updates: Partial<CategoryState['categories'][0]> }>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload.updates
        };
        // Rebuild hierarchy after update
        state.hierarchy = buildHierarchy(state.categories);
      }
    },
    resetCategories: (state) => {
      state.categories = [];
      state.hierarchy = [];
      state.selectedCategory = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    fetchCategoriesHandler(builder);
    createCategoryHandler(builder);
    fetchCategoryHandler(builder);
    updateCategoryHandler(builder);
    deleteCategoryHandler(builder);
    bulkDeleteCategoriesHandler(builder);
    reorderCategoriesHandler(builder);
    updateCategoryParentHandler(builder);
  }
});

// Helper function to build hierarchy
const buildHierarchy = (categories: CategoryState['categories']): CategoryState['hierarchy'] => {
  const buildTree = (parentId: string | null = null): CategoryState['hierarchy'] => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildTree(cat.id)
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  };
  return buildTree();
};

// Selectors
export const categorySelectors = {
  // Get all categories
  selectAllCategories: (state: { categories: CategoryState }) => state.categories.categories,
  
  // Get category hierarchy
  selectCategoryHierarchy: (state: { categories: CategoryState }) => state.categories.hierarchy,
  
  // Get selected category
  selectSelectedCategory: (state: { categories: CategoryState }) => state.categories.selectedCategory,
  
  // Get category by ID
  selectCategoryById: (categoryId: string) => (state: { categories: CategoryState }) =>
    state.categories.categories.find(cat => cat.id === categoryId),
  
  // Get categories by parent ID
  selectCategoriesByParentId: (parentId: string | null) => (state: { categories: CategoryState }) =>
    state.categories.categories.filter(cat => cat.parentId === parentId),
  
  // Get active categories only
  selectActiveCategories: (state: { categories: CategoryState }) =>
    state.categories.categories.filter(cat => cat.isActive),
  
  // Get root categories (no parent)
  selectRootCategories: (state: { categories: CategoryState }) =>
    state.categories.categories.filter(cat => cat.parentId === null),
  
  // Get category path (breadcrumb)
  selectCategoryPath: (categoryId: string) => (state: { categories: CategoryState }) => {
    const path: CategoryState['categories'] = [];
    let currentCategory = state.categories.categories.find(cat => cat.id === categoryId);
    
    while (currentCategory) {
      path.unshift(currentCategory);
      currentCategory = currentCategory.parentId
        ? state.categories.categories.find(cat => cat.id === currentCategory!.parentId)
        : undefined;
    }
    
    return path;
  },
  
  // Get loading states
  selectCategoryLoading: (state: { categories: CategoryState }) => state.categories.loading,
  selectCategoryCreateLoading: (state: { categories: CategoryState }) => state.categories.createLoading,
  selectCategoryUpdateLoading: (state: { categories: CategoryState }) => state.categories.updateLoading,
  selectCategoryDeleteLoading: (state: { categories: CategoryState }) => state.categories.deleteLoading,
  
  // Get error
  selectCategoryError: (state: { categories: CategoryState }) => state.categories.error,
  
  // Get filters
  selectCategoryFilters: (state: { categories: CategoryState }) => state.categories.filters
};

export const {
  setSelectedCategory,
  clearSelectedCategory,
  setIncludeInactive,
  clearError,
  updateCategoryInState,
  resetCategories
} = categorySlice.actions;

export default categorySlice.reducer;