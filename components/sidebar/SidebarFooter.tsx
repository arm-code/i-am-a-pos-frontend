import { User, Power, LogOut } from 'lucide-react';

export default function SidebarFooter({
  isSidebarOpen,
  session,
  onLogout,
}: {
  isSidebarOpen: boolean;
  session: any;
  onLogout: () => void;
}) {
  if (!session) {
    return (
      <div className="p-4 border-t border-violet-200">
        <p className="text-xs text-violet-500 text-center">No autenticado</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-violet-200 bg-violet-50">
      <div className={`flex items-center gap-3 transition-all duration-300 ${
        isSidebarOpen ? 'justify-start' : 'justify-center'
      }`}>
        {/* Avatar */}
        <div className="w-10 h-10 bg-violet-100 border border-violet-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-violet-600" />
        </div>

        {/* Información del usuario (solo cuando sidebar está abierto) */}
        {isSidebarOpen && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-violet-900 truncate">
              {session.user?.email || 'Usuario'}
            </p>
            <button
              onClick={onLogout}
              className="flex items-center text-xs text-violet-600 hover:text-violet-700 mt-1 transition-colors group"
            >
              <LogOut className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Botón de logout cuando sidebar está colapsado */}
        {!isSidebarOpen && (
          <button
            onClick={onLogout}
            className="p-2 text-violet-600 hover:bg-violet-100 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <Power className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}