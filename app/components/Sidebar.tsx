interface SidebarProps {
  currentView: string
  onViewChange: (view: 'products' | 'categories' | 'create-product') => void
}

const nombre_negocio = 'POS Mobiliario Mendoza'

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'principal', label: 'Principal', icon: '🏠' },
    { id: 'products', label: 'Productos', icon: '📦' },
    { id: 'create-product', label: 'Nuevo Producto', icon: '➕' },
    { id: 'categories', label: 'Categorías', icon: '🏷️' },
    { id: 'global-settings', label: 'Settings', icon: '🎛️' }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-300 h-full">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">{ nombre_negocio }</h1>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} >
              <button
                onClick={() => onViewChange(item.id as any)}
                className={`w-full flex items-center hover:cursor-pointer space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}