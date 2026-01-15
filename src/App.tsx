import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import PosPage from "@/pages/PosPage";
import InventoryPage from "@/pages/InventoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="inventory" element={<InventoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;