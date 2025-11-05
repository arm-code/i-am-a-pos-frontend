import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  nombreNegocio: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

export default function SidebarHeader({
  nombreNegocio,
  isSidebarOpen,
  toggleSidebar,
  isMobile
}: SidebarHeaderProps) {
  // En móvil no mostramos el botón de toggle, solo en desktop
  const showToggleButton = !isMobile;

  return (
    <div className="flex items-center justify-between p-4 border-b border-violet-200">
      {/* Logo y nombre */}
      <div className={`flex items-center gap-3 transition-all duration-300 ${
        isSidebarOpen ? 'w-full' : 'w-12'
      }`}>
        <div className="w-10 h-10 bg-white border border-violet-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img 
            src='/images/mob-mendoza.png' 
            alt="Logo" 
            className="w-8 h-8 object-contain"
          />
        </div>
        
        {isSidebarOpen && (
          <div className="flex-1 min-w-0">
            <span className="font-bold text-violet-900 text-sm ">
              {nombreNegocio}
            </span>            
          </div>
        )}
      </div>

      {/* Botón toggle (solo visible en desktop cuando el sidebar está abierto) */}
      {showToggleButton && isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-8 text-violet-600 hover:bg-violet-100 rounded-lg transition-colors flex-shrink-0"
          title="Contraer menú"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Botón para expandir cuando está colapsado (solo desktop) */}
      {/* {showToggleButton && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-8 text-violet-600 hover:bg-violet-100 rounded-lg transition-colors flex-shrink-0"
          title="Expandir menú"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )} */}
    </div>
  );
}