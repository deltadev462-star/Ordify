import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth/authSlice"

export const makeStore = () => {

  return configureStore({
    reducer: {
      auth:authReducer
    },
  devTools: import.meta.env.DEV, // Disable in production
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']