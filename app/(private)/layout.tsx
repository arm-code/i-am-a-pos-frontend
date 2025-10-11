'use client'

import SidebarLayout from '@/components/sidebar/Sidebar'
import { View, TOPBAR_COPY } from '@/types/View.types'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentView, setCurrentView] = useState<View>('principal')

  useEffect(() => {
    if (pathname.includes('categorias')) 
      setCurrentView('categorias')
    else if (pathname.includes('productos')) 
      setCurrentView('productos')
    else if (pathname.includes('crear-producto')) 
      setCurrentView('crear-producto')
    else if (pathname.includes('configuracion')) 
      setCurrentView('configuracion')
    else 
      setCurrentView('principal')
  }, [pathname])

  const { title, subtitle } = TOPBAR_COPY[currentView]

  return (
    <SidebarLayout
      currentView={currentView}
      onViewChange={(view) => {
        const paths: Record<string, string> = {
          'principal': '/',
          'productos': '/productos',
          'categorias': '/categorias',
          'crear-producto': '/crear-producto',
          'configuracion': '/configuracion',
        }
        router.push(paths[view] || '/')
      }}
      topbarContent={{ title, subtitle }}
    >
      {children}
    </SidebarLayout>
  )
}
