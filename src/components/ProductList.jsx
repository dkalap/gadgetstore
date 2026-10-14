import { useState } from 'react';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';

export default function ProductList({ 
  products, 
  allProducts,
  loading, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy, 
  onAddToCart, 
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  categories,
  darkMode
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter autocomplete suggestions based on search input
  const suggestions = searchTerm.trim() 
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : [];

  return (
    <div className="relative">
      {/* Search, Filter & Sort Toolbar - Z-INDEX 50 */}
      <div className={`relative z-50 ${darkMode ? 'bg-slate-900/90 border-slate-800 text-white shadow-2xl shadow-indigo-950/40' : 'bg-white/90 border-slate-200 text-slate-900 shadow-xl'} backdrop-blur-xl p-5 rounded-2xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300`}>
        
        {/* Search Bar with Autocomplete Suggestions */}
        <div className="w-full md:w-80 relative">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search high-tech gadgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className={`w-full pl-10 pr-4 py-2.5 ${darkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:ring-indigo-500' : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-indigo-600'} border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 transition-all shadow-inner`}
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          {/* Autocomplete Dropdown Suggestions */}
          {isSearchFocused && suggestions.length > 0 && (
            <div className={`absolute top-full left-0 right-0 mt-2 ${darkMode ? 'bg-slate-900 border-slate-700 text-white shadow-2xl shadow-indigo-950' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'} border rounded-xl overflow-hidden z-50 max-h-60 overflow-y-auto`}>
              <div className="px-3 py-2 text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider border-b border-slate-800/40 bg-indigo-500/10">
                Suggested Gadgets ({suggestions.length})
              </div>
              {suggestions.map(item => (
                <div 
                  key={item.id}
                  onMouseDown={() => {
                    setSearchTerm(item.name);
                    setIsSearchFocused(false);
                  }}
                  className={`px-4 py-3 text-xs font-semibold cursor-pointer flex items-center justify-between border-b last:border-0 ${darkMode ? 'border-slate-800/50 hover:bg-indigo-600/30 hover:text-indigo-300' : 'border-slate-100 hover:bg-indigo-50 hover:text-indigo-600'} transition-colors`}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-md">₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-indigo-600/30 scale-105 border border-indigo-500' : darkMode ? 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div className="w-full md:w-auto flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-indigo-400 focus:outline-none cursor-pointer"
            >
              <option value="featured" className={darkMode ? 'bg-slate-900' : 'bg-white'}>Featured</option>
              <option value="price-low" className={darkMode ? 'bg-slate-900' : 'bg-white'}>Price: Low to High</option>
              <option value="price-high" className={darkMode ? 'bg-slate-900' : 'bg-white'}>Price: High to Low</option>
              <option value="rating" className={darkMode ? 'bg-slate-900' : 'bg-white'}>Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Section - LOWER Z-INDEX 10 */}
      <div className="relative z-10">
        {loading ? (
          <SkeletonLoader darkMode={darkMode} />
        ) : products.length === 0 ? (
          <div className={`text-center py-24 ${darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'} backdrop-blur-md rounded-2xl border`}>
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">🔍</div>
            <h3 className="text-base font-bold">No matching gadgets found</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting a different category.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                onSelectProduct={onSelectProduct} 
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}