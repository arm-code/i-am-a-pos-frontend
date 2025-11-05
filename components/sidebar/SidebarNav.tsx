import { View } from '@/types/View.types';

export default function SidebarNav({
  items,
  currentView,
  onViewChange,
  isSidebarOpen,
}: {
  items: { id: View; label: string; icon: React.ReactNode }[];
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
                className={`w-full flex items-center transition-all duration-200 rounded-lg group
                  ${
                    isActive
                      ? 'bg-violet-100 text-violet-700 shadow-sm border border-violet-200'
                      : 'text-violet-600 hover:bg-violet-50 hover:text-violet-700'
                  }
                  ${isSidebarOpen ? 'px-4 py-3 justify-start space-x-3' : 'p-3 justify-center'}
                `}
                title={!isSidebarOpen ? item.label : undefined} // Tooltip cuando está colapsado
              >
                <span className={`transition-transform ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {item.icon}
                </span>

                {isSidebarOpen && (
                  <span className="font-medium text-sm transition-all duration-200">
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}