import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Invoice } from "./Invoice";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Printer, CheckCircle } from "lucide-react";
import type { CartItem } from "./cartSlice";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cartData: {
    items: CartItem[];
    totalAmount: number;
    tax: number;
    grandTotal: number;
  };
}

const CheckoutModal = ({ isOpen, onClose, onConfirm, cartData }: CheckoutModalProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  // প্রিন্ট হ্যান্ডলার
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePayment = () => {
    handlePrint(); // প্রথমে প্রিন্ট ডায়লগ আসবে
    // আপনি চাইলে এখানে ১ সেকেন্ড ডিলে দিয়ে কার্ট ক্লিয়ার করতে পারেন
    setTimeout(() => {
        onConfirm(); // কার্ট ক্লিয়ার হবে
        onClose();   // মডাল বন্ধ হবে
    }, 1000); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-50">
        <DialogHeader>
          <DialogTitle>Order Summary & Receipt</DialogTitle>
        </DialogHeader>

        {/* Invoice Preview */}
        <div className="bg-gray-200 p-4 rounded overflow-auto max-h-[60vh] flex justify-center">
            {/* এখানে আমরা ইনভয়েস কম্পোনেন্ট রেন্ডার করছি কিন্তু প্রিন্ট রিফ দিচ্ছি */}
            <Invoice 
                ref={componentRef} 
                items={cartData.items}
                total={cartData.totalAmount}
                tax={cartData.tax}
                grandTotal={cartData.grandTotal}
            />
        </div>

        <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handlePayment}>
                <Printer className="mr-2 h-4 w-4" /> Print & Pay
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;