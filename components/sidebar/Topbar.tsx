import { Menu, X } from 'lucide-react';

interface TopbarProps {
  session: any;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export default function Topbar({ session, onMenuToggle, isSidebarOpen, isMobile }: TopbarProps) {
  const getPageTitle = () => {
    if (!session) return 'Acceso Público';
    return 'Panel de Control';
  };

  // Calcular el margen izquierdo basado en el estado del sidebar
  const leftMargin = isMobile ? 'left-0' : (isSidebarOpen ? 'left-64' : 'left-20');

  return (
    <header className={`fixed top-0 right-0 ${leftMargin} z-30 bg-white border-b border-violet-200 shadow-sm transition-all duration-300`}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Botón menú móvil - siempre visible en móvil */}
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {/* Botón menú desktop - solo cuando sidebar está colapsado */}
        {!isMobile && !isSidebarOpen && (
          <button
            onClick={onMenuToggle}
            className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
            title="Expandir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Título */}
        <h1 className="text-xl lg:text-2xl font-bold text-violet-900 text-center lg:text-left flex-1 lg:flex-none">
          {getPageTitle()}
        </h1>

        {/* Información de usuario (visible en desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-violet-700">
              {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-violet-900">
              {session?.user?.email || 'Usuario'}
            </p>
            <p className="text-xs text-violet-600">Bienvenido</p>
          </div>
        </div>
      </div>
    </header>
  );
}