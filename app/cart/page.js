'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, Trash2, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (productId, newQuantity, maxStock) => {
    if (newQuantity < 1 || newQuantity > maxStock) return;
    
    setCart(prevCart => {
      const updatedCart = {
        ...prevCart,
        [productId]: {
          ...prevCart[productId],
          quantity: newQuantity
        }
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading cart...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700">
          <ArrowLeft size={20} className="mr-1" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      </header>

      {getItemCount() === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingCart size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items ({getItemCount()})</h2>
              <div className="border-t">
                {Object.values(cart).map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row py-6 border-b items-center">
                    <div className="sm:w-1/4 mb-4 sm:mb-0">
                      <div className="w-24 h-24 mx-auto">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </div>
                    <div className="sm:w-2/4 mb-4 sm:mb-0">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <div className="flex items-center mt-2">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="sm:w-1/4 flex flex-col items-center">
                      <div className="flex items-center border rounded mb-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={item.quantity >= item.stock}
                        >
                          <ChevronRight size={16} className={item.quantity >= item.stock ? "text-gray-300" : ""} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between py-4 font-semibold">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-4 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
