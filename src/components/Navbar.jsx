export default function Navbar({
  totalCartItems,
  onOpenCart,
  onToggleNetwork,
  networkError,
  darkMode,
  setDarkMode,
  wishlist = [],
  setIsWishlistOpen,
  onOpenWishlist,
  wishlistCount,
}) {
  return (
    <header className={`${darkMode ? 'bg-slate-900/80 border-slate-800/80' : 'bg-white/80 border-slate-200 shadow-sm'} backdrop-blur-xl border-b sticky top-0 z-30 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3.5 cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30">
            ⚡
          </div>
          <div>
            <span className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>GadgetStore</span>
            <span className="block text-[10px] text-indigo-500 font-extrabold uppercase tracking-widest">Next-Gen Tech Hub</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${darkMode ? 'bg-slate-950 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-300 text-indigo-900 hover:bg-slate-200'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={onToggleNetwork}
            className={`text-xs px-4 py-2.5 rounded-xl font-bold transition-all border flex items-center space-x-2 ${networkError ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 animate-pulse' : darkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700/80' : 'bg-slate-100 text-slate-700 border-slate-300'}`}
          >
            <span>{networkError ? "⚠️ Slow Network Active" : "⚡ Simulate Slow Network"}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className={`relative p-2.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              darkMode
                ? 'bg-slate-800/80 border-slate-700 text-rose-400 hover:bg-slate-700'
                : 'bg-white/80 border-slate-200 text-rose-500 hover:bg-slate-100 shadow-sm'
            }`}
            title="View Wishlist"
          >
            ❤️
            <span className="text-xs font-bold">({wishlistCount})</span>
          </button>

          <button
            onClick={onOpenCart}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-black flex items-center space-x-2.5 transition-all shadow-xl shadow-indigo-600/30 cursor-pointer"
          >
            <span>🛒 Cart</span>
            {totalCartItems > 0 && (
              <span className="bg-white text-indigo-900 px-2 py-0.5 rounded-full font-black text-xs">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}