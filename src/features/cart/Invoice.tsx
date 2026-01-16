import React from "react";
import type { CartItem } from "./cartSlice";

interface InvoiceProps {
  items: CartItem[];
  total: number;
  tax: number;
  grandTotal: number;
}

// forwardRef ব্যবহার করছি যাতে প্রিন্টিং লাইব্রেরি এই কম্পোনেন্টকে রেফারেন্স করতে পারে
export const Invoice = React.forwardRef<HTMLDivElement, InvoiceProps>(
  ({ items, total, tax, grandTotal }, ref) => {
    return (
      <div ref={ref} className="p-8 bg-white text-black w-[80mm] min-h-[100mm] mx-auto text-sm font-mono border shadow-sm print:shadow-none print:border-none">
        {/* Header */}
        <div className="text-center mb-4 border-b pb-2 border-dashed border-black">
          <h1 className="text-xl font-bold uppercase">TechMart POS</h1>
          <p>Dhaka, Bangladesh</p>
          <p>Tel: +880 1234 567890</p>
          <p className="text-xs mt-1">{new Date().toLocaleString()}</p>
        </div>

        {/* Items */}
        <div className="mb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black">
                <th className="py-1">Item</th>
                <th className="py-1 text-right">Qty</th>
                <th className="py-1 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-1 truncate max-w-25">{item.title}</td>
                  <td className="py-1 text-right">{item.quantity}</td>
                  <td className="py-1 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="border-t border-dashed border-black pt-2 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (15%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-black">
            <span>Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs border-t border-dashed border-black pt-2">
          <p>Thank you for shopping!</p>
          <p>Please come again.</p>
        </div>
      </div>
    );
  }
);