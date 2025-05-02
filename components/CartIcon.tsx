// components/CartIcon.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartIcon() {
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <div className="relative cursor-pointer text-white bg-indigo-500 p-4 rounded-full shadow-lg hover:bg-indigo-600 transition">
        <ShoppingCart size={40} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2">
            {cart.length}
          </span>
        )}
      </div>
    </Link>
  );
}
