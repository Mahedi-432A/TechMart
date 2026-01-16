import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MoreHorizontal } from "lucide-react";

// ডামি কাস্টমার ডাটা
const customers = [
  { id: 1, name: "Ahsan Habib", email: "ahsan@gmail.com", phone: "+8801711223344", spent: "$1,200", orders: 12 },
  { id: 2, name: "Karim Uddin", email: "karim@yahoo.com", phone: "+8801911223344", spent: "$850", orders: 5 },
  { id: 3, name: "Rahima Khatun", email: "rahima@outlook.com", phone: "+8801811223344", spent: "$2,300", orders: 24 },
  { id: 4, name: "Sokina Begum", email: "sokina@gmail.com", phone: "+8801611223344", spent: "$120", orders: 1 },
  { id: 5, name: "Jamal Hossain", email: "jamal@tech.com", phone: "+8801511223344", spent: "$3,450", orders: 45 },
];

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Button>Add Customer</Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-62.5">Customer</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{customer.name}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Mail size={12}/> {customer.email}</span>
                    <span className="flex items-center gap-1"><Phone size={12}/> {customer.phone}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell className="font-bold text-green-600">{customer.spent}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
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

export default CustomersPage;