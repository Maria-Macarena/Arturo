'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

type CartItem = Product & {
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }

    // Verificar permisos de notificación
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items))
      localStorage.setItem('cartTimestamp', Date.now().toString())

      // Programar notificación para 2 días después
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000
      const notificationTimeout = setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('¡No olvides tu carrito!', {
            body: 'Tienes productos esperando en tu carrito de Arturo.',
          })
        }
      }, twoDaysInMs)

      return () => clearTimeout(notificationTimeout)
    } else {
      localStorage.removeItem('cart')
      localStorage.removeItem('cartTimestamp')
    }
  }, [items])

  const addToCart = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  )
}