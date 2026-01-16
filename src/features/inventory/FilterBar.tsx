import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery, type Category } from "./productsApi";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onReset
}: FilterBarProps) => {
  // ক্যাটাগরি লিস্ট লোড করছি
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search Input */}
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
        />
      </div>

      {/* Right Side Controls */}
      <div className="flex w-full md:w-auto gap-3">
        
        {/* Category Dropdown */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-50 bg-slate-50">
            <SelectValue placeholder={isLoading ? "Loading..." : "All Categories"} />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat: Category) => (
              <SelectItem key={cat.slug} value={cat.slug} className="capitalize">
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button (যদি ফিল্টার করা থাকে তখনই দেখাবে) */}
        {(searchTerm || selectedCategory) && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onReset}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            title="Clear Filters"
          >
            <X size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;