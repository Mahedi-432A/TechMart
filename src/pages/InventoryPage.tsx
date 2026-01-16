import { useGetProductsQuery } from "@/features/inventory/productsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

const InventoryPage = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-10 w-10 rounded object-cover bg-slate-100"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell className="capitalize text-slate-500">{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  {/* স্টক কম থাকলে লাল ব্যাজ দেখাবে */}
                  {product.stock < 10 ? (
                    <Badge variant="destructive">Low Stock ({product.stock})</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                      In Stock ({product.stock})
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" title="Edit">
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="outline" size="icon" title="Delete">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryPage;