'use client'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export const ErrorState = ({ 
  title = "Algo salió mal", 
  message, 
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-4xl mb-4">❌</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}