'use client'
import React, { createContext, useContext, useState } from 'react'

export type Product = {
  id: number
  title: string
  price: number
  image: string
  stock: number
}

export type CartItem = Product & {
  quantity: number
}

const CartContext = createContext<{
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}>({ cart: [], addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {} })

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }])
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}