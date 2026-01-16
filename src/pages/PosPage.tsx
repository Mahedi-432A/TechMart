import { useState } from "react";
import { 
  useGetProductsQuery, 
  useSearchProductsQuery, 
  useGetProductsByCategoryQuery,
  type Product
} from "@/features/inventory/productsApi";
import ProductCard from "@/features/inventory/ProductCard";
import CartPanel from "@/features/cart/CartPanel";
import FilterBar from "@/features/inventory/FilterBar";
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { Loader2, PackageOpen } from "lucide-react";
import { toast } from "sonner";

const PosPage = () => {
  // ২. এই লাইনটি আপনার কোডে মিসিং ছিল, এটি ছাড়া অ্যাকশন ডিসপ্যাচ হবে না
  const dispatch = useAppDispatch();

  // Local State for Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ৩. 'any' সরিয়ে 'Product' টাইপ ব্যবহার করা হয়েছে
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    
    // টোস্ট ট্রিগার (Beautiful Notification)
    toast.success(`${product.title} added to cart`, {
      description: `Price: $${product.price}`,
      duration: 2000, // ২ সেকেন্ড পর চলে যাবে
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'), // চাইলে এখানে আনডু লজিক দিতে পারেন
      },
    });
  };
  
  // --- RTK Query Logic (Smart Fetching) ---
  
  // ডিফল্ট ডাটা (যদি সার্চ বা ক্যাটাগরি না থাকে)
  const { data: allData, isLoading: isLoadingAll } = useGetProductsQuery(undefined, {
    skip: searchTerm.length > 0 || selectedCategory.length > 0,
  });

  // সার্চ ডাটা
  const { data: searchData, isLoading: isLoadingSearch } = useSearchProductsQuery(searchTerm, {
    skip: searchTerm.length === 0,
  });

  // ক্যাটাগরি ডাটা
  const { data: categoryData, isLoading: isLoadingCategory } = useGetProductsByCategoryQuery(selectedCategory, {
    skip: selectedCategory.length === 0 || searchTerm.length > 0,
  });

  // ফাইনাল ডাটা ডিসাইড করা
  const products = searchTerm ? searchData?.products : selectedCategory ? categoryData?.products : allData?.products;
  const isLoading = isLoadingAll || isLoadingSearch || isLoadingCategory;

  // রিসেট হ্যান্ডলার
  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden"> 
      {/* বাম পাশ: প্রোডাক্ট লিস্ট এরিয়া */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* টপ বার: ফিল্টার */}
        <div className="p-4 pb-0">
          <FilterBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onReset={handleReset}
          />
        </div>

        {/* প্রোডাক্ট গ্রিড (স্ক্রল হবে) */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <Loader2 className="animate-spin h-10 w-10 mb-2 text-blue-600" />
              <p>Loading products...</p>
            </div>
          ) : !products || products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed rounded-lg m-4">
              <PackageOpen size={48} className="mb-2 opacity-50" />
              <p>No products found</p>
              <button onClick={handleReset} className="text-blue-500 hover:underline mt-2">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddToCart(product)} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ডান পাশ: কার্ট প্যানেল (ফিক্সড) */}
      <CartPanel />
    </div>
  );
};

export default PosPage;