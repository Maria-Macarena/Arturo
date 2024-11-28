import Link from 'next/link'


export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 mb-4">© 2024 Arturo. Todos los derechos reservados.</p>
          <p className="text-gray-600 mb-4">By Mora Software.</p>
        </div>
      </div>
    </footer>
  )
}