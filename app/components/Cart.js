import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Cart({ count }) {
  if (count === 0) return null;
  
  return (
    <Link href="/cart">
      <div className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110 cursor-pointer">
        <div className="relative">
          <ShoppingBag size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        </div>
      </div>
    </Link>
  );
}