import React, { useState } from "react";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onSelectProduct,
  handleCheckout,
  onCheckout,
  darkMode,
}) {
  // Coupon and Discount States
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  if (!isOpen) return null;

  // Coupon Validation Handler
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === "REACT20") {
      setDiscountPercent(20);
      setCouponSuccess("20% Discount Applied!");
      setCouponError("");
    } else if (code === "GREET10") {
      setDiscountPercent(10);
      setCouponSuccess("10% Discount Applied!");
      setCouponError("");
    } else {
      setCouponError("Invalid Code (Try REACT20 or GREET10)");
      setCouponSuccess("");
    }
  };

  // Price Calculations
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const finalSubtotal = rawSubtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div
        className={`w-full max-w-md h-full flex flex-col shadow-2xl transition-colors ${
          darkMode
            ? "bg-slate-900 border-l border-slate-800 text-slate-100"
            : "bg-white border-l border-slate-200 text-slate-800"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h3 className="font-bold text-lg">Shopping Cart</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
          {cart.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              {/* Empty State Icon */}
              <div className="w-16 h-16 mx-auto bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center text-2xl">
                🛒
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-200">
                  Your cart is empty
                </h4>
                <p className="text-xs text-slate-400 max-w-55 mx-auto">
                  Explore our collection of next-gen gadgets and add your
                  favorites to the cart!
                </p>
              </div>

              {/* Action Button to Close Cart and Start Shopping */}
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/50 bg-slate-800/40"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="w-14 h-14 object-cover rounded-lg cursor-pointer hover:opacity-80 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="text-sm font-semibold truncate cursor-pointer hover:text-indigo-400"
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-indigo-400 mt-0.5">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls*/}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(item.id, -1);
                      }}
                      className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs hover:bg-slate-700 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(item.id, 1);
                      }}
                      className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs hover:bg-slate-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 p-1"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout / Coupons */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-700/50 space-y-3">
            {/* Promo Code Input Section */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. REACT20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-950/60 border border-slate-700 text-slate-200 uppercase focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-[11px] text-emerald-400 mt-1">
                  🎉 {couponSuccess}
                </p>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{rawSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-indigo-400 pt-1">
                <span>Total</span>
                <span>₹{finalSubtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onCheckout(rawSubtotal, discountAmount, finalSubtotal)}
              disabled={cart.length === 0}
              className="w-full py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-sm shadow-lg shadow-indigo-600/20"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
