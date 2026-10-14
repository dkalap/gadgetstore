import React from 'react';

export default function CheckoutModal({ isOpen, onClose, orderDetails }) {
  if (!isOpen || !orderDetails) return null;

  const orderId = `GS-${Math.floor(100000 + Math.random() * 900000)}`;
  const today = new Date();
  const deliveryDate = new Date(today.setDate(today.getDate() + 3)).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 relative">
        
        {/* Success Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
            ✓
          </div>
          <h3 className="text-xl font-black">Order Placed Successfully!</h3>
          <p className="text-xs text-slate-400">Order ID: <span className="font-mono text-slate-200">{orderId}</span></p>
        </div>

        {/* Invoice Items Summary */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-3 max-h-48 overflow-y-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Summary</p>
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-xs">
              <span className="text-slate-300 truncate max-w-50">
                {item.name} <span className="text-slate-500">x{item.quantity}</span>
              </span>
              <span className="font-semibold text-slate-200">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Bill Total & Discount Breakdown */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal</span>
            <span>₹{orderDetails.subtotal.toFixed(2)}</span>
          </div>
          {orderDetails.discount > 0 && (
            <div className="flex justify-between text-emerald-400 font-medium">
              <span>Discount</span>
              <span>-₹{orderDetails.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-400">
            <span>Estimated Delivery</span>
            <span className="text-indigo-400 font-semibold">{deliveryDate}</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
            <span>Total Paid</span>
            <span className="text-indigo-400">₹{orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
}