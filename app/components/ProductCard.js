import { useState } from 'react';
import { DollarSign, ShoppingCart, Trash2 } from 'lucide-react';

export default function ProductCard({ product, isInCart, onAddToCart, onRemoveFromCart }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      id={`product-${product.id}`}
      className="border rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate mb-2">{product.title}</h3>
        <div className="flex items-center text-gray-700 mb-4">
          <DollarSign size={16} className="mr-1 text-green-600" />
          <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Available: {product.stock}
          </span>
          {product.stock > 0 ? (
            !isInCart ? (
              <button
                onClick={onAddToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center transition-colors"
              >
                <ShoppingCart size={16} className="mr-1" />
                Add to Cart
              </button>
            ) : (
              <button
                onClick={onRemoveFromCart}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center transition-colors"
              >
                <Trash2 size={16} className="mr-1" />
                Remove
              </button>
            )
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-3 py-2 rounded flex items-center cursor-not-allowed"
            >
              <ShoppingCart size={16} className="mr-1" />
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
