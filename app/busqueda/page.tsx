'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'

type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

const products: Product[] = [
  { id: 1, name: "Camisa Satín", price: 129.99, image: "/images/camisa.webp", category: "Camisas", description: "Elegante camisa de satín, perfecta para ocasiones formales." },
  { id: 2, name: "Chaleco", price: 119.99, image: "/images/chaleco.jpg", category: "Chalecos", description: "Chaleco versátil que complementa cualquier conjunto elegante." },
  { id: 3, name: "Cinturón", price: 70.99, image: "/images/cinturon.avif", category: "Accesorios", description: "Cinturón de cuero de alta calidad para un toque de distinción." },
  { id: 4, name: "Corbata", price: 99.99, image: "/images/corbata.webp", category: "Accesorios", description: "Corbata elegante para completar tu look formal." },
  { id: 5, name: "Traje", price: 450.99, image: "/images/elegante.jpg", category: "Trajes", description: "Traje completo para ocasiones que requieren máxima elegancia." },
  { id: 6, name: "Gemelos", price: 365.99, image: "/images/gemelos.jpg", category: "Accesorios", description: "Gemelos sofisticados para un toque de lujo en tu atuendo." },
  { id: 7, name: "Traje Sport", price: 436.99, image: "/images/sport.jpg", category: "Trajes", description: "Traje sport para un look elegante pero relajado." },
  { id: 8, name: "Zapatos", price: 326.99, image: "/images/zapatos.jpg", category: "Calzado", description: "Zapatos de cuero fino para complementar tu vestimenta." },
]

export default function Busqueda() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)
  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    if (query) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredProducts)
    } else {
      setResults(products)
    }
  }, [query])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Resultados de búsqueda para: {query || 'Todos los productos'}</h1>
      {results.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron resultados para tu búsqueda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/producto/${product.id}`} className="block h-48 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover object-center"
                />
              </Link>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  variant={addedToCart === product.id ? "outline" : "default"}
                >
                  {addedToCart === product.id ? "¡Agregado!" : "Agregar al carrito"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}