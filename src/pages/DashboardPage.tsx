import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductsQuery } from "@/features/inventory/productsApi";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { DollarSign, CreditCard, Package, Users } from "lucide-react";

// ডামি চার্ট ডেটা (যেহেতু আমাদের রিয়েল ব্যাকএন্ড হিস্ট্রি এখনো নেই)
const salesData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 3200 },
  { name: "Jun", total: 4500 },
];

// ডামি রিসেন্ট সেলস
const recentSales = [
  { name: "Ahsan Habib", email: "ahsan@example.com", amount: "+$250.00" },
  { name: "Karim Uddin", email: "karim@example.com", amount: "+$120.50" },
  { name: "Rahim Mia", email: "rahim@example.com", amount: "+$450.00" },
  { name: "Sokina Begum", email: "sokina@example.com", amount: "+$80.00" },
];

const DashboardPage = () => {
  // রিয়েল ডাটা: ইনভেন্টরি থেকে টোটাল প্রোডাক্ট সংখ্যা নিচ্ছি
  const { data: productData } = useGetProductsQuery();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h2>

      {/* 1. Stats Cards Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-slate-500">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Total Sales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-slate-500">+180.1% from last month</p>
          </CardContent>
        </Card>

        {/* Total Products (Real Data from RTK Query) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productData?.total || 0}</div>
            <p className="text-xs text-slate-500">Live from Inventory</p>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-slate-500">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Charts & Recent Sales Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Bar Chart (Sales Overview) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-slate-500">You made 265 sales this month.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-xs font-bold text-slate-700">
                        {sale.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-slate-500">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;