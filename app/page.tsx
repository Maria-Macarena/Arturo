import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 text-white">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a Arturo</h1>
        <p className="text-xl mb-8">Descubre nuestra colección de ropa elegante masculina</p>
        <Button asChild size="lg">
          <Link href="/catalogo">Ver Catálogo</Link>
        </Button>
      </div>
    </div>
  )
}