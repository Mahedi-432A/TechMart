import { useGetProductsQuery } from "@/features/inventory/productsApi";
import ProductCard from "@/features/inventory/ProductCard";
import { Loader2 } from "lucide-react";

const InventoryPage = () => {
  // RTK Query হুক কল করা হচ্ছে
  const { data, isLoading, error } = useGetProductsQuery();

  // ১. লোডিং অবস্থা
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <span className="ml-2 text-slate-500">Loading Inventory...</span>
      </div>
    );
  }

  // ২. এরর অবস্থা
  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="p-10 text-center text-red-500 rounded-lg bg-red-50">
        Failed to load products. Please check your internet connection.
      </div>
    );
  }

  // ৩. সাকসেস অবস্থা
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Inventory Management</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
          Total Products: {data?.products.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;