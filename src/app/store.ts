import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import { productsApi } from "../features/inventory/productsApi";
import cartReducer from "../features/cart/cartSlice";
import undoable from "redux-undo";

// 1. Redux Persist ইম্পোর্ট
import storage from "redux-persist/lib/storage"; // LocalStorage ডিফল্ট হিসেবে ব্যবহার হবে
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

// 2. কনফিগারেশন: আমরা শুধু 'cart' স্লাইসটি সেভ রাখতে চাই
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // শুধুমাত্র কার্ট সেভ থাকবে, বাকিগুলো রিফ্রেশে রিসেট হবে
};

// 3. রুট রিডিউসার তৈরি (সব রিডিউসার একসাথে)
const rootReducer = combineReducers({
  ui: uiReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  // কার্ট রিডিউসারকে undoable দিয়ে র‍্যাপ করা হয়েছে
  cart: undoable(cartReducer, { limit: 10 }),
});

// 4. পারসিস্টেড রিডিউসার তৈরি
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // মেইন রিডিউসার হিসেবে পারসিস্টেড রিডিউসার ব্যবহার
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist এর ওয়ার্নিং ইগনোর করার জন্য
    }).concat(productsApi.middleware),
});

// 5. পারসিস্টর এক্সপোর্ট
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;