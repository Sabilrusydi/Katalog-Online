// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import CartIcon from "@/components/CartIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Katalog with Cart",
  description: "Next.js + Tailwind E-Commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <div className="fixed bottom-6 right-6 z-50">
            <CartIcon />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
