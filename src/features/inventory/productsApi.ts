import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ১. প্রোডাক্টের টাইপ ডিফাইন করা (যেন টাইপস্ক্রিপ্ট ভুল না ধরে)
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
}

// API থেকে যে রেসপন্স আসবে তার স্ট্রাকচার
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// ২. মেইন API স্লাইস (Fake Database Connection)
export const productsApi = createApi({
  reducerPath: "productsApi", // স্টোরে এই নামেই থাকবে
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }), // <--- এই URL থেকেই ডাটা আসবে
  endpoints: (builder) => ({
    // সব প্রোডাক্ট আনার জন্য কুয়েরি
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "products?limit=20", // প্রথম ২০টি প্রোডাক্ট
    }),
  }),
});

// ৩. অটোমেটিক হুক এক্সপোর্ট
export const { useGetProductsQuery } = productsApi;