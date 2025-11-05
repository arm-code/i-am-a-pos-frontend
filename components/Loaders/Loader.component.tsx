interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export const Loader = ({ size = 'md', text }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`
          ${sizeClasses[size]} 
          border-2 border-violet-300 border-t-violet-600 
          rounded-full animate-spin
        `}
      />
      {text && (
        <p className="mt-2 text-sm text-violet-600">{text}</p>
      )}
    </div>
  )
}

// Variante para cargas de página completa
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-violet-600">Cargando...</p>
      </div>
    </div>
  )
}