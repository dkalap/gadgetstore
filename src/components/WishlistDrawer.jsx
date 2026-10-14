import React from 'react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onMoveToCart,
  darkMode
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className={`w-full max-w-md h-full flex flex-col shadow-2xl transition-colors ${
        darkMode ? 'bg-slate-900 border-l border-slate-800 text-slate-100' : 'bg-white border-l border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">❤️</span>
            <h3 className="font-bold text-lg">My Wishlist</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20">
              {wishlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <span className="text-4xl">🤍</span>
              <p className="text-sm">Your wishlist is empty</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/50 bg-slate-800/40 transition-all hover:border-slate-600"
              >
                {/* Clickable Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="w-14 h-14 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="text-sm font-semibold truncate cursor-pointer hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-indigo-400 mt-0.5">₹{item.price.toFixed(2)}</p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onMoveToCart(item)}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors flex items-center gap-1"
                    >
                      🛒 Move to Cart
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-sm"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}