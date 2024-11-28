'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/contexts/CartContext'
import { ModeToggle } from './mode-toggle'
import Image from 'next/image'

export function Header() {
  const { items } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold text-primary">
            <Image 
              src="https://via.placeholder.com/40x40?text=A" 
              alt="Arturo Logo" 
              width={40} 
              height={40} 
              className="mr-2" 
            />
            Arturo
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/catalogo" className="text-foreground hover:text-primary">
              Catálogo
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-8 pr-2 py-1 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
            <Link href="/carrito" className="text-foreground hover:text-primary relative">
              <ShoppingCart />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
            <ModeToggle />
          </div>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              <Link href="/catalogo" className="text-foreground hover:text-primary">
                Catálogo
              </Link>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-8 pr-2 py-1 rounded-md w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </form>
              <Link href="/carrito" className="text-foreground hover:text-primary flex items-center">
                <ShoppingCart className="mr-2" />
                Carrito ({items.length})
              </Link>
              <ModeToggle />
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}