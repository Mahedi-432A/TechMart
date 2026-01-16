import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import PosPage from "@/pages/PosPage";
import InventoryPage from "@/pages/InventoryPage";
import { Toaster } from "@/components/ui/sonner";
import CustomersPage from "@/pages/CustomersPage";
import SettingsPage from "@/pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
