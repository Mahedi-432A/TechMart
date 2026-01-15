import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addToCart, removeFromCart, deleteItem, clearCart } from "./cartSlice";
import { ActionCreators } from "redux-undo"; // Undo/Redo অ্যাকশন
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, RotateCcw, RotateCw } from "lucide-react";

const CartPanel = () => {
  const dispatch = useAppDispatch();
  // undoable ব্যবহার করায় state.cart.present এ আসল ডাটা থাকে
  const { items, totalAmount, tax, grandTotal } = useAppSelector(
    (state) => state.cart.present
  );
  
  // Undo/Redo হিস্ট্রি চেক করা
  const { past, future } = useAppSelector((state) => state.cart);

  return (
    <div className="flex flex-col h-full bg-white border-l shadow-xl w-96">
      {/* Header with Undo/Redo */}
      <div className="flex items-center justify-between p-4 border-b bg-slate-50">
        <h2 className="text-lg font-bold">Current Order</h2>
        <div className="flex gap-2">
            <Button 
                variant="outline" size="icon" 
                disabled={past.length === 0}
                onClick={() => dispatch(ActionCreators.undo())}
                title="Undo"
            >
                <RotateCcw size={16} />
            </Button>
            <Button 
                variant="outline" size="icon" 
                disabled={future.length === 0}
                onClick={() => dispatch(ActionCreators.redo())}
                title="Redo"
            >
                <RotateCw size={16} />
            </Button>
            <Button 
                variant="destructive" size="icon" 
                onClick={() => dispatch(clearCart())}
                title="Clear Cart"
            >
                <Trash2 size={16} />
            </Button>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {items.length === 0 ? (
          <div className="mt-10 text-center text-slate-400">Cart is empty</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between pb-2 border-b">
              <div className="w-1/2">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-slate-500">${item.price} x {item.quantity}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="w-6 h-6" onClick={() => dispatch(removeFromCart(item.id))}>
                    <Minus size={12} />
                </Button>
                <span className="w-4 text-sm font-bold text-center">{item.quantity}</span>
                <Button size="icon" variant="outline" className="w-6 h-6" onClick={() => dispatch(addToCart(item))}>
                    <Plus size={12} />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => dispatch(deleteItem(item.id))} className="text-xs text-red-500 hover:underline">
                    Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Calculations */}
      <div className="p-4 space-y-2 border-t bg-slate-50">
        <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
            <span>Tax (15%):</span>
            <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 text-xl font-bold border-t border-slate-200">
            <span>Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" size="lg">
            Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CartPanel;