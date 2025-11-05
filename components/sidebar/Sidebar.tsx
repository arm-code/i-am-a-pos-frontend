'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import Topbar from './Topbar';
import { supabaseBrowser } from '@/lib/supabase/supabaseBrowser';
import { View } from '@/types/View.types';
import { Home, Package, PackagePlus, Settings, Tags } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  children: React.ReactNode;
}

const nombre_negocio = 'Mobiliario Mendoza';

export default function SidebarLayout({
  currentView,
  onViewChange,
  children,
}: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    setSession(null);
    router.push('/auth/login');
  };

  const menuItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'principal', label: 'Principal', icon: <Home className='w-5 h-5' /> },
    {
      id: 'productos',
      label: 'Productos',
      icon: <Package className='w-5 h-5' />,
    },
    {
      id: 'crear-producto',
      label: 'Nuevo Producto',
      icon: <PackagePlus className='w-5 h-5' />,
    },
    {
      id: 'categorias',
      label: 'Categorías',
      icon: <Tags className='w-5 h-5' />,
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: <Settings className='w-5 h-5' />,
    },
  ];

  return (
    <div
      className='flex bg-violet-50'
      style={{
        // ← Define el ancho del sidebar para el header
        ['--sidebar-width' as any]: isSidebarOpen ? '16rem' : '4rem',
      }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 flex flex-col h-screen transition-all duration-300 bg-white border-r border-violet-300 shadow-sm
    ${isSidebarOpen ? 'w-64' : 'w-16'}
  `}
      >
        {/* Cabecera */}
        <SidebarHeader
          nombreNegocio={nombre_negocio}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Contenedor scrollable del menú */}
        <div className='flex-1 overflow-y-auto'>
          <SidebarNav
            items={menuItems}
            currentView={currentView}
            onViewChange={onViewChange}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* Footer fijo al fondo */}
        <SidebarFooter
          isSidebarOpen={isSidebarOpen}
          session={session}
          onLogout={handleLogout}
        />
      </aside>

      <div
        className={`flex min-h-screen w-full justify-center bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? 'pl-64' : 'pl-16'
        }`}
      >
        {/* Content area */}
        <div className='flex-1 flex flex-col'>
          <Topbar session={session} />
          <main className='p-4 pt-20'>{children}</main>
        </div>
      </div>
    </div>
  );
}
