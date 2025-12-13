// Export all actions
export {
  fetchProducts,
  createProduct,
  fetchProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct,
  bulkDeleteProducts,
  bulkUpdateProducts,
  duplicateProduct
} from './actions';

// Export all slice actions and selectors
export {
  setSelectedProduct,
  clearSelectedProduct,
  setProductFilters,
  resetProductFilters,
  clearError,
  updateProductInState,
  updateProductQuantity,
  incrementProductView,
  resetProducts,
  productSelectors
} from './productSlice';

// Export the reducer as default
export { default } from './productSlice';