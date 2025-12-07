
const API_BASE_URL = import.meta.env.API_BASE_URL  || 'http://localhost:5000/api/v1';


export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    getProfile: `${API_BASE_URL}/auth/me`,
    updateProfile: `${API_BASE_URL}/auth/update-profile`,
    updatePassword: `${API_BASE_URL}/auth/update-password`,
    
    // Category endpoints
    getStoreCategories: (storeId: string) => `${API_BASE_URL}/categories/${storeId}/categories`,
    createCategory: (storeId: string) => `${API_BASE_URL}/categories/${storeId}/categories`,
    getCategory: (storeId: string, categoryId: string) => `${API_BASE_URL}/categories/${storeId}/categories/${categoryId}`,
    updateCategory: (storeId: string, categoryId: string) => `${API_BASE_URL}/categories/${storeId}/categories/${categoryId}`,
    deleteCategory: (storeId: string, categoryId: string) => `${API_BASE_URL}/categories/${storeId}/categories/${categoryId}`,
    getCategoryChildren: (storeId: string, categoryId: string) => `${API_BASE_URL}/categories/${storeId}/categories/${categoryId}/children`,
    updateCategoryParent: (storeId: string, categoryId: string) => `${API_BASE_URL}/categories/${storeId}/categories/${categoryId}/parent`,
    reorderCategories: (storeId: string) => `${API_BASE_URL}/categories/${storeId}/categories/bulk/reorder`,
    bulkDeleteCategories: (storeId: string) => `${API_BASE_URL}/categories/${storeId}/categories/bulk/delete`,
    getPublicCategories: (storeSlug: string) => `${API_BASE_URL}/categories/public/${storeSlug}`,
} as const;