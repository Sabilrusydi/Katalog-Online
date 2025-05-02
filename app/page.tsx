// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { ShoppingCart, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products?limit=12");
      const data = await res.json();

      // Tambahkan properti kuota stok untuk tiap item
      const dataWithStock = data.map((item: any) => ({
        ...item,
        stock: Math.floor(Math.random() * 5) + 1, // stok antara 1-5
      }));

      setProducts(dataWithStock);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-white mt-10">Memuat data...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-600 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">Simple Katalog Online</h1>
        <Link href="/cart">
          <div className="relative cursor-pointer text-white">
            <ShoppingCart size={32} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2">
                {cart.length}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isInCart = cart.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="object-contain h-48 w-full mb-4"
              />
              <h2 className="font-semibold text-lg text-gray-800 mb-2">{product.title}</h2>
              <p className="flex items-center text-indigo-600 font-bold mb-2">
                <DollarSign className="w-4 h-4 mr-1" />
                {product.price}
              </p>
              <p className="text-sm text-gray-500 mb-2">Stok tersedia: {product.stock}</p>

              <button
                onClick={() =>
                  isInCart ? removeFromCart(product.id) : addToCart({ ...product, quantity: 1 })
                }
                disabled={product.stock === 0}
                className={`mt-auto px-4 py-2 rounded-lg font-semibold transition-all ${
                  isInCart
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : product.stock === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                {product.stock === 0 ? "Stok Habis" : isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
