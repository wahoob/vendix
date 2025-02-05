import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authReducer } from "../features/auth";
import { sidebarReducer } from "../features/sidebar";
import { productsReducer } from "../features/products";
import { usersReducer } from "../features/users";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    products: productsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Provide refreshing the page options.
setupListeners(store.dispatch);
