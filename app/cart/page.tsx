// app/cart/page.tsx
"use client";

import { useCart } from "@/components/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id: number, quantity: number, stock: number) => {
    if (quantity >= 1 && quantity <= stock) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-600 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Keranjang kamu kosong.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            <ArrowLeft size={16} />
            Kembali ke Katalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white text-gray-800 rounded-lg shadow p-4 flex items-center gap-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="object-contain"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-600">Harga: ${item.price}</p>
                <p className="text-sm text-gray-600">Stok: {item.stock}</p>

                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value), item.stock)
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            <ArrowLeft size={16} />
            Tambah Item Lagi
          </Link>
        </div>
      )}
    </main>
  );
}
