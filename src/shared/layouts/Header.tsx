import { useAppDispatch } from "@/app/hooks";
import { toggleSidebar } from "@/features/ui/uiSlice";
import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b shadow-sm border-slate-200">
      {/* Left Side: Sidebar Toggle */}
      <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())}>
        <Menu className="w-6 h-6 text-slate-700" />
      </Button>

      {/* Right Side: Profile & Notifications */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></span>
        </Button>
        
        <div className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 border border-blue-200 rounded-full cursor-pointer">
            <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;