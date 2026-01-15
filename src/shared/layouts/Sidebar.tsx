import { useAppSelector } from "@/app/hooks";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils"; // Shadcn utility

const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.ui);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ShoppingCart, label: "POS (Sell)", path: "/pos" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-slate-900 text-white transition-all duration-300 ease-in-out sticky top-0 left-0 border-r border-slate-800",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-slate-800">
        <h1 className={cn("font-bold text-2xl text-blue-500", !isSidebarOpen && "hidden")}>
          TechMart
        </h1>
        {/* লোগো আইকন যখন সাইডবার বন্ধ থাকবে */}
        {!isSidebarOpen && <span className="text-2xl font-bold text-blue-500">TM</span>}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800 transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-slate-400",
                !isSidebarOpen && "justify-center"
              )
            }
          >
            <item.icon size={22} />
            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;