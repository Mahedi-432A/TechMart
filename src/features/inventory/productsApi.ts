import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
  description: string; // ডিজাইনে লাগতে পারে
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// DummyJSON এখন ক্যাটাগরি অবজেক্ট আকারে দেয়
export interface Category {
  slug: string;
  name: string;
  url: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    // ১. সব প্রোডাক্ট আনা
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "products?limit=100", // ডেমো হিসেবে ১০০টা আনছি
    }),
    
    // ২. সার্চ করা (Server Side Search)
    searchProducts: builder.query<ProductsResponse, string>({
      query: (searchTerm) => `products/search?q=${searchTerm}`,
    }),

    // ৩. সব ক্যাটাগরি লিস্ট আনা (ড্রপডাউনের জন্য)
    getCategories: builder.query<Category[], void>({
      query: () => "products/categories",
    }),

    // ৪. নির্দিষ্ট ক্যাটাগরির প্রোডাক্ট আনা
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (categorySlug) => `products/category/${categorySlug}`,
    }),
  }),
});

// হুক এক্সপোর্ট
export const { 
  useGetProductsQuery, 
  useSearchProductsQuery, 
  useGetCategoriesQuery, 
  useGetProductsByCategoryQuery 
} = productsApi;