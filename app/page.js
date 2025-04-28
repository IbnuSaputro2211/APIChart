'use client';
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const newCart = { 
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: (prevCart[product.id]?.quantity || 0) + 1
        }
      };
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });

    // Show animation feedback
    const element = document.getElementById(`product-${product.id}`);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 500);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading products...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Simple Online Shop</h1>
        <Link href="/cart" className="relative group">
          <div className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
            <ShoppingBag size={24} />
          </div>
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>
      </header>
      
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={!!cart[product.id]}
              onAddToCart={() => addToCart(product)}
              onRemoveFromCart={() => removeFromCart(product.id)}
            />
          ))}
        </div>
      </main>
      
      <Cart cart={cart} count={getCartCount()} />
    </div>
  );
}