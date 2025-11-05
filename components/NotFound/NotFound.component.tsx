'use client'

import Link from 'next/link'

interface NotFoundProps {
  title?: string
  message?: string
  showBackButton?: boolean
}

export const NotFound = ({ 
  title = "Página no encontrada", 
  message = "La página que buscas no existe o ha sido movida.",
  showBackButton = true
}: NotFoundProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBackButton && (
            <Link 
              href="#" // Link vacío para mantener consistencia
              onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-center"
            >
              Volver atrás
            </Link>
          )}
          <Link 
            href="/"
            className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors text-center"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}