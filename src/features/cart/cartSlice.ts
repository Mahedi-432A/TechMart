import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../inventory/productsApi";

// 1. কার্ট আইটেমের টাইপ (Product এর সাথে quantity যোগ হবে)
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number; // টোটাল দাম
  tax: number;         // ভ্যাট
  grandTotal: number;  // সব মিলিয়ে
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  tax: 0,
  grandTotal: 0,
};

// হেল্পার ফাংশন: বার বার টোটাল হিসেব করার জন্য
const calculateTotals = (state: CartState) => {
  state.totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  state.tax = state.totalAmount * 0.15; // ধরে নিলাম ১৫% ভ্যাট
  state.grandTotal = state.totalAmount + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ১. কার্টে প্রোডাক্ট যোগ করা
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      calculateTotals(state);
    },

    // ২. কার্ট থেকে প্রোডাক্ট কমানো (১ এর নিচে নামলে রিমুভ হবে)
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      calculateTotals(state);
    },

    // ৩. পুরো আইটেম ডিলিট করা
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      calculateTotals(state);
    },

    // ৪. পুরো কার্ট ক্লিয়ার করা
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { addToCart, removeFromCart, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;