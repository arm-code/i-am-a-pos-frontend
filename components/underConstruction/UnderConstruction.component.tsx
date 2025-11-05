'use client'

interface UnderConstructionProps {
  title?: string
  message?: string
}

export const UnderConstruction = ({ 
  title = "Página en construcción", 
  message = "Estamos trabajando en esta sección. Vuelve pronto." 
}: UnderConstructionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors cursor-pointer"
        >
          Volver atrás
        </button>
      </div>
    </div>
  )
}