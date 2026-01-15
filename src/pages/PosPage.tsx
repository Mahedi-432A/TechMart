import { useGetProductsQuery } from "@/features/inventory/productsApi";
import ProductCard from "@/features/inventory/ProductCard";
import CartPanel from "@/features/cart/CartPanel";
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { Loader2 } from "lucide-react";

const PosPage = () => {
  const { data, isLoading } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-[calc(100vh-80px)]"> {/* ফুল স্ক্রিন হাইট - হেডার */}
      
      {/* বাম পাশ: প্রোডাক্ট লিস্ট */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold">Select Products</h2>
        
        {isLoading ? (
          <div className="flex justify-center mt-20"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => dispatch(addToCart(product))} // কার্ডে ক্লিক করলে কার্টে যোগ হবে
              />
            ))}
          </div>
        )}
      </div>

      {/* ডান পাশ: কার্ট প্যানেল */}
      <CartPanel />
    </div>
  );
};

export default PosPage;