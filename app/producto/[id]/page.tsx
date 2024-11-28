'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

const products: Product[] = [
  { id: 1, name: "Camisa Satín", price: 129.99, image: "/images/camisa.webp", description: "Elegante camisa de satín, perfecta para ocasiones formales. Confeccionada con los mejores materiales para garantizar comodidad y estilo.", category: "Camisas" },
  { id: 2, name: "Chaleco", price: 119.99, image: "/images/chaleco.jpg", description: "Chaleco versátil que complementa cualquier conjunto elegante. Ideal para eventos formales o para dar un toque de distinción a tu atuendo diario.", category: "Chalecos" },
  { id: 3, name: "Cinturón", price: 70.99, image: "/images/cinturon.avif", description: "Cinturón de cuero de alta calidad para un toque de distinción. Fabricado con los mejores materiales para garantizar durabilidad y estilo.", category: "Accesorios" },
  { id: 4, name: "Corbata", price: 99.99, image: "/images/corbata.webp", description: "Corbata elegante para completar tu look formal. Disponible en varios diseños para adaptarse a cualquier ocasión.", category: "Accesorios" },
  { id: 5, name: "Traje", price: 450.99, image: "/images/elegante.jpg", description: "Traje completo para ocasiones que requieren máxima elegancia. Confeccionado a medida para garantizar un ajuste perfecto.", category: "Trajes" },
  { id: 6, name: "Gemelos", price: 365.99, image: "/images/gemelos.jpg", description: "Gemelos sofisticados para un toque de lujo en tu atuendo. El complemento perfecto para tus camisas de puño francés.", category: "Accesorios" },
  { id: 7, name: "Traje Sport", price: 436.99, image: "/images/sport.jpg", description: "Traje sport para un look elegante pero relajado. Ideal para eventos semi-formales o para el trabajo.", category: "Trajes" },
  { id: 8, name: "Zapatos", price: 326.99, image: "/images/zapatos.jpg", description: "Zapatos de cuero fino para complementar tu vestimenta. Cómodos y elegantes, perfectos para cualquier ocasión.", category: "Calzado" },
]

export default function ProductoDetalle({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Button variant="outline" onClick={() => router.push('/catalogo')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    toast({
      title: "Producto agregado",
      description: `${product.name} (${quantity}) ha sido agregado al carrito.`,
    })
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-md object-cover object-center"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4 text-primary">${product.price.toFixed(2)}</p>
          <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Descripción del producto:</h2>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Categoría: {product.category}</p>
          <div className="flex items-center mb-4">
            <Label htmlFor="quantity" className="mr-2">Cantidad:</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 mx-2 text-center"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuantity(prev => prev + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            onClick={handleAddToCart} 
            className="w-full mb-4"
            disabled={addedToCart}
          >
            {addedToCart ? (
              "¡Agregado al carrito!"
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => router.push('/catalogo')} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
          </Button>
        </div>
      </div>
    </motion.div>
  )
}