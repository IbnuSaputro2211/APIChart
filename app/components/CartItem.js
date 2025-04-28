import { useState } from 'react';
import { DollarSign, Trash2, Plus, Minus } from 'lucide-react';

export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div className="flex items-center border-b py-4">
      <div className="w-16 h-16 mr-4">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <div className="flex items-center mt-1">
          <DollarSign size={14} className="text-green-600" />
          <span>${item.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 border rounded-l"
        >
          <Minus size={14} />
        </button>
        <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 border rounded-r"
          disabled={item.quantity >= item.stock}
        >
          <Plus size={14} />
        </button>
      </div>
      <button 
        onClick={() => removeFromCart(item.id)}
        className="ml-4 text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}