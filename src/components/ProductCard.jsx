export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
  darkMode,
  isWishlisted,
  onToggleWishlist,
}) {
  // Determine inventory status badge
  let stockBadge = null;
  if (product.stock === 0) {
    stockBadge = (
      <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
        Out of Stock
      </span>
    );
  } else if (product.stock <= 4) {
    stockBadge = (
      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full animate-pulse">
        🔥 Only {product.stock} left!
      </span>
    );
  } else {
    stockBadge = (
      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
        In Stock
      </span>
    );
  }

  return (
    <div
      className={`group ${darkMode ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900 shadow-xl"} backdrop-blur-md rounded-2xl border overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
    >
      <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
        <div className="relative h-60 bg-slate-950 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
          <span className="absolute top-3.5 left-3.5 bg-slate-900/90 backdrop-blur-md text-[11px] font-black px-3 py-1 rounded-full text-indigo-400 border border-slate-700/50 shadow-md">
            {product.category}
          </span>
          {/* Heart Button inside Product Card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
              isWishlisted
                ? "bg-rose-500/20 text-rose-500 border border-rose-500/40"
                : "bg-slate-900/40 text-slate-400 hover:text-rose-400 border border-slate-700/50"
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`font-bold text-sm ${darkMode ? "text-slate-100" : "text-slate-900"} group-hover:text-indigo-400 transition-colors line-clamp-1`}
            >
              {product.name}
            </h3>
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg flex items-center space-x-1">
              <span>★</span>
              <span>{product.rating}</span>
            </span>
          </div>
          {/* Stock badge */}
          <div className="mb-2">{stockBadge}</div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
      <div
        className={`p-5 pt-0 flex items-center justify-between border-t ${darkMode ? "border-slate-800/60" : "border-slate-100"} mt-3`}
      >
        <div className="flex flex-col pt-3">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
            Price
          </span>
          <span
            className={`text-lg font-black ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            ₹{product.price.toFixed(2)}
          </span>
        </div>
        <button
          disabled={product.stock === 0}
          onClick={() => onAddToCart(product)}
          className={`mt-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md border ${
            product.stock === 0
              ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white cursor-pointer border-indigo-500"
          }`}
        >
          {product.stock === 0 ? "Sold Out" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}