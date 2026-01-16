import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Invoice } from "./Invoice";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Printer } from "lucide-react";
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
    contentRef: componentRef, // v3+ এর জন্য contentRef ব্যবহার করা ভালো, তবে content: () => componentRef.current ও কাজ করবে
    documentTitle: "TechMart_Invoice",
    onAfterPrint: () => {
      onConfirm(); // পেমেন্ট কনফার্ম এবং কার্ট ক্লিয়ার
      onClose();   // মডাল বন্ধ
    },
  });

  const handlePayment = () => {
    handlePrint(); 
  };

  return (
    <>
      {/* ১. অদৃশ্য ইনভয়েস (শুধুমাত্র প্রিন্টের জন্য) */}
      {/* এটি মডালের বাইরে এবং সবসময় DOM-এ থাকে, তাই ref কখনো null হবে না */}
      <div style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
        <div ref={componentRef}>
           <Invoice 
              items={cartData.items}
              total={cartData.totalAmount}
              tax={cartData.tax}
              grandTotal={cartData.grandTotal}
           />
        </div>
      </div>

      {/* ২. দৃশ্যমান মডাল (শুধুমাত্র প্রিভিউ দেখার জন্য) */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-slate-50">
          <DialogHeader>
            <DialogTitle>Order Summary & Receipt</DialogTitle>
          </DialogHeader>

          {/* Invoice Preview (এখানে কোনো ref নেই, কারণ এটা প্রিন্ট হবে না) */}
          <div className="bg-gray-200 p-4 rounded overflow-auto max-h-[60vh] flex justify-center scale-90 origin-top">
              <Invoice 
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
    </>
  );
};

export default CheckoutModal;