import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import { productsApi } from "../features/inventory/productsApi";
import cartReducer from "../features/cart/cartSlice"; // ইম্পোর্ট
import undoable from "redux-undo";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [productsApi.reducerPath]: productsApi.reducer, // <--- ১. রিডিউসার অ্যাড করা

    cart: undoable(cartReducer, {
      limit: 10, // ইউজার সর্বোচ্চ ১০ ধাপ পেছনে (Undo) যেতে পারবে
    }),
  },
  // ২. মিডলওয়্যার অ্যাড করা (এটা ছাড়া লোডিং/ক্যাশিং কাজ করবে না)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;