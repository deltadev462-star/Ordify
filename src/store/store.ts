import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth/authSlice"
import categoryReducer from "./slices/category/categorySlice"
import productReducer from "./slices/product/productSlice"

export const makeStore = () => {

  return configureStore({
    reducer: {
      auth:authReducer,
      categories:categoryReducer,
      products:productReducer,
    },
  devTools: import.meta.env.DEV, // Disable in production
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']