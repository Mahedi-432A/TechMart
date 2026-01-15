import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
            {/* Outlet এর মানে হলো এখানে চাইল্ড পেজগুলো রেন্ডার হবে */}
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;