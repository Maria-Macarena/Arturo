'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { motion } from 'framer-motion'
import { CreditCard, Calendar, Lock } from 'lucide-react'

export default function Pago() {
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCart()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos'
      isValid = false
    }

    if (formData.cardName.trim().length < 3) {
      newErrors.cardName = 'El nombre debe tener al menos 3 caracteres'
      isValid = false
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'La fecha debe tener el formato MM/YY'
      isValid = false
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 o 4 dígitos'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsProcessing(true)
      try {
        // Simular procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        toast({
          title: "Pago procesado",
          description: "Tu pago ha sido procesado con éxito.",
        })
        clearCart()
        router.push('/confirmacion')
      } catch {
        toast({
          title: "Error en el pago",
          description: "Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Finalizar Compra</h1>
          <div className="mb-6 bg-muted p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-gray-200 rounded-md mr-4" />
                  )}
                  <span>{item.name} x {item.quantity}</span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="text-xl font-bold mt-4 text-primary">
              Total: ${getCartTotal().toFixed(2)}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="pl-10"
                  maxLength={16}
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.cardNumber && <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div>
              <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
              <Input
                id="cardName"
                name="cardName"
                type="text"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleInputChange}
              />
              {errors.cardName && <p className="text-destructive text-sm mt-1">{errors.cardName}</p>}
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="pl-10"
                    maxLength={5}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.expiryDate && <p className="text-destructive text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              <div className="flex-1">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    name="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="pl-10"
                    maxLength={4}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.cvv && <p className="text-destructive text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? 'Procesando...' : 'Procesar Pago'}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}