import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => {
  
  const handleSave = () => {
    toast.success("Settings updated successfully!");
  };

  return (
    <div className="space-y-6 pb-10">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Update your store details for invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="TechMart Electronics" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123, Dhanmondi, Dhaka" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+880 1711 000000" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="tax">Tax Rate (%)</Label>
                    <Input id="tax" defaultValue="15" type="number" />
                </div>
            </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-slate-500">Enable dark theme for the dashboard</p>
                </div>
                <Switch />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-slate-500">Play sound on add to cart</p>
                </div>
                <Switch defaultChecked />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600">Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;