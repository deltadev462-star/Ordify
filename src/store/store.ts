import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth/authSlice"
import categoryReducer from "./slices/category/categorySlice"

export const makeStore = () => {

  return configureStore({
    reducer: {
      auth:authReducer,
      categories:categoryReducer,
    },
  devTools: import.meta.env.DEV, // Disable in production
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']