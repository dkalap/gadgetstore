export default function ProductDetail({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200">
        <div className="relative h-64 bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">✕</button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs bg-indigo-50 text-indigo-600 font-bold px-2.5 py-1 rounded">{product.category}</span>
            <span className="text-sm font-bold text-amber-500">★ {product.rating}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-6">{product.description}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}