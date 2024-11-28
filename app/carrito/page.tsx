'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Carrito() {
  const { items, removeFromCart, clearCart, getCartTotal, addToCart } = useCart()
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const cartTimestamp = localStorage.getItem('cartTimestamp')
    if (cartTimestamp) {
      const expiration = new Date(parseInt(cartTimestamp) + 2 * 24 * 60 * 60 * 1000)
      setExpirationDate(expiration)
    }

    // Initialize quantities state
    const initialQuantities = items.reduce((acc, item) => ({
      ...acc,
      [item.id]: item.quantity
    }), {})
    setQuantities(initialQuantities)
  }, [items])

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantities(prev => ({ ...prev, [id]: newQuantity }))
      const item = items.find(item => item.id === id)
      if (item) {
        addToCart(item, newQuantity - item.quantity)
      }
    }
  }

  if (items.length === 0) {
    return (
      <motion.div 
        className="container mx-auto px-4 py-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-primary">Tu carrito está vacío</h1>
        <p className="mb-4 text-muted-foreground">¿Por qué no agregas algunos productos?</p>
        <Button asChild>
          <Link href="/catalogo">Ir al Catálogo</Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-primary">Tu Carrito</h1>
      {expirationDate && (
        <p className="mb-4 text-muted-foreground">
          Tu carrito se guardará hasta: {expirationDate.toLocaleString()}
        </p>
      )}
      <div className="space-y-4">
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            className="flex items-center justify-between border-b pb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-foreground">{item.name}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.id, quantities[item.id] - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantities[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 text-center"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.id, quantities[item.id] + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-primary font-medium mt-2">${(item.price * quantities[item.id]).toFixed(2)}</p>
              </div>
            </div>
            <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        <p className="text-2xl font-bold text-primary">Total: ${getCartTotal().toFixed(2)}</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/pago">Proceder al Pago</Link>
          </Button>
          <Button variant="outline" onClick={clearCart} className="w-full">
            Vaciar Carrito
          </Button>
        </div>
      </div>
    </motion.div>
  )
}