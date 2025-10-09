import { View } from '@/types/View.types';

export default function SidebarNav({
  items,
  currentView,
  onViewChange,
  isSidebarOpen,
}: {
  items: { id: View; label: string; icon: string }[];
  currentView: View;
  onViewChange: (view: View) => void;
  isSidebarOpen: boolean;
}) {
  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {items.map((item) => {
          const isActive = currentView === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center hover:cursor-pointer px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${
                    isActive
                      ? isSidebarOpen
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700 shadow-inner'
                        : 'bg-blue-100 text-blue-700 border-none shadow-none justify-center'
                      : 'text-gray-700 hover:bg-gray-100 justify-center'
                  }
                  ${isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'}
                `}
              >
                {/* Icono */}
                <span
                  className={`text-lg transition-transform ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                >
                  {item.icon}
                </span>

                {/* Etiqueta visible solo si el sidebar está abierto */}
                {isSidebarOpen && (
                  <span className="font-medium ml-3 truncate">{item.label}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
