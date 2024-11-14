import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./orders/ordersApi";
import { productsApi } from "./products/productsApi";
import authSlice from './auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersApi.middleware, productsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
