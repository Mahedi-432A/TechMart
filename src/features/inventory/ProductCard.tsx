import type { Product } from "./productsApi";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void; // অপশনাল, পরে লাগবে
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative flex items-center justify-center h-40 p-4 bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain max-h-full mix-blend-multiply"
        />
        <span className="absolute px-2 py-1 text-xs text-white rounded top-2 right-2 bg-slate-900">
          ${product.price}
        </span>
      </div>
      
      <CardContent className="flex-1 p-4">
        <div className="mb-1 text-sm capitalize text-slate-500">{product.category}</div>
        <h3 className="font-bold text-slate-800 line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        <p className="mt-1 text-xs text-slate-400">Stock: {product.stock}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          <Plus size={16} className="mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;