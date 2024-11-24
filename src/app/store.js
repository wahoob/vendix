import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import productsReducer from "../features/products/productSlice";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Provide refreshing the page options.
setupListeners(store.dispatch);
