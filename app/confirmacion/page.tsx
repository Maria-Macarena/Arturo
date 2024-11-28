'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Confirmacion() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a la página principal después de 5 segundos
    const timeout = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background"
    >
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-primary mb-2">¡Gracias por tu compra!</h1>
      <p className="text-lg text-muted-foreground mb-6">Tu pedido ha sido procesado con éxito.</p>
      <p className="text-sm text-muted-foreground mb-4">Serás redirigido a la página principal en 5 segundos.</p>
      <Button onClick={() => router.push('/')}>Volver a la tienda</Button>
    </motion.div>
  )
}