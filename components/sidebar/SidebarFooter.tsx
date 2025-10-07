import { User, Power } from 'lucide-react';

export default function SidebarFooter({
  isSidebarOpen,
  session,
  onLogout,
}: {
  isSidebarOpen: boolean;
  session: any;
  onLogout: () => void;
}) {
  return (
    <div className='p-4 border-t border-gray-200 bg-gray-50'>
      {session ? (
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
            <User className='w-4 h-4 text-white' />
          </div>
          {isSidebarOpen && (
            <div className='flex-1 min-w-0 overflow-hidden'>
              <p className='text-sm font-medium text-gray-900 truncate w-full block'>
                {session.user?.email || 'Usuario'}
              </p>
              <button
                onClick={onLogout}
                className='flex items-center text-xs text-red-600 hover:underline mt-0.5'
              >
                <Power className='w-3 h-3 mr-1' /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className='text-xs text-gray-500'>No autenticado</p>
      )}
    </div>
  );
}
