import { useState, useEffect, useMemo } from "react";
import productsData from "./data/products.json";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import InvoiceModal from "./components/InvoiceModal";
import WishlistDrawer from "./components/WishlistDrawer";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  // Trigger splash screen on initial page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Displays for 1.2 seconds

    return () => clearTimeout(timer);
  }, []);
  // Data & Network States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  // Search, Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Cart & Modal States
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("gadget_store_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("gadget_store_cart", JSON.stringify(cart));
  }, [cart]);

  // Initial Product Loading Simulation
  const loadProducts = (delay = 600) => {
    setLoading(true);
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, delay);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Toggle Network Delay Mode
  const handleToggleNetwork = () => {
    const newNetworkState = !networkError;
    setNetworkError(newNetworkState);
    loadProducts(newNetworkState ? 2200 : 400);
  };
  // Extract Unique Categories dynamically
  const categories = useMemo(() => {
    return ["All", ...new Set(productsData.map((p) => p.category))];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.id - b.id; // 'featured' default
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

  // Cart Handlers
  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      showToast(`Sorry, "${product.name}" is out of stock!`);
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast(`Cannot add more. Stock limit reached!`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };
  const handleUpdateQuantity = (productId, delta) => {
    // 1. Find the product to check its stock limit
    const product = products.find((p) => p.id === productId);

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;

          // Check if new quantity exceeds stock limit
          if (product && newQty > product.stock) {
            showToast(`Only ${product.stock} left in stock!`);
            return item; // Keep quantity unchanged if stock limit hit
          }

          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Load initial wishlist from LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("gadgetstore_wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("gadgetstore_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle wishlist handler
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      showToast(exists ? "Removed from Wishlist" : "Saved to Wishlist ❤️");
      return updated;
    });
  };
  const handleMoveToCart = (item) => {
    handleAddToCart(item); // Adds item to cart & triggers cart action
    setWishlist((prev) => prev.filter((id) => id !== item.id)); // Silently removes its ID from wishlist without the removal toast
    showToast(`Moved "${item.name}" to cart 🛒`);
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white">
        <div className="relative flex items-center justify-center">
          {/* Glowing animated background circle */}
          <div className="absolute w-24 h-24 rounded-full bg-indigo-600/30 blur-xl animate-pulse" />

          {/* Animated GadgetStore Logo Icon */}
          <div className="relative w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float-glow border border-indigo-400/40">
            <span className="text-4xl">⚡</span>
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="mt-6 text-2xl font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
          GadgetStore
        </h1>
        <p className="text-xs font-medium text-slate-500 tracking-widest uppercase mt-1">
          Loading Next-Gen Tech...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} flex flex-col transition-colors duration-500`}
    >
      {/* Top Navigation Bar */}
      <Navbar
        totalCartItems={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        onToggleNetwork={handleToggleNetwork}
        networkError={networkError}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        // setIsWishlistOpen={setIsWishlistOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {networkError && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-2">
              <span>⚠️</span>
              <span>
                Network Simulation Active: Artificial 2.2s latency enabled to
                demonstrate asynchronous loading & skeleton states.
              </span>
            </span>
          </div>
        )}

        <ProductList
          products={filteredProducts}
          allProducts={productsData}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAddToCart={handleAddToCart}
          onSelectProduct={setSelectedProduct}
          categories={categories}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onSelectProduct={(product) => {
          setIsCartOpen(false);
          setSelectedProduct(product);
        }}
        onCheckout={(subtotal, discount, total) => {
          // Save the receipt details before clearing
          setLastOrderDetails({
            items: [...cart],
            subtotal,
            discount,
            total,
          });
          //Close cart drawer & open receipt modal
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
          // Clear cart & show toast
          setCart([]);
          showToast("🎉 Order placed successfully!");
        }}
        darkMode={darkMode}
      />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistedProducts}
        onRemoveFromWishlist={toggleWishlist}
        onAddToCart={handleAddToCart}
        onMoveToCart={handleMoveToCart}
        onSelectProduct={setSelectedProduct}
        darkMode={darkMode}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderDetails={lastOrderDetails}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          darkMode={darkMode}
        />
      )}

      {/* Checkout Invoice Modal */}
      {isCheckoutOpen && (
        <InvoiceModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={handleClearCart}
          darkMode={darkMode}
        />
      )}
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-lg border border-indigo-400 animate-bounce transition-all">
          <span>✨</span>
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
}
