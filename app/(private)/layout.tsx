'use client'

import SidebarLayout from '@/components/sidebar/Sidebar'
import { View } from '@/types/View.types'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentView, setCurrentView] = useState<View>('principal')

  useEffect(() => {
    // sincróniza currentView según la ruta actual
    if (pathname.includes('categories')) setCurrentView('categories')
    else if (pathname.includes('products')) setCurrentView('products')
    else if (pathname.includes('create-product')) setCurrentView('create-product')
    else if (pathname.includes('settings')) setCurrentView('configuracion')
    else setCurrentView('principal')
  }, [pathname])

  return (
    <SidebarLayout currentView={currentView} onViewChange={(view) => {
      // navegación real en lugar de useState
      const paths: Record<string, string> = {
        principal: '/',
        products: '/productos',
        categories: '/categorias',
        'create-product': '/crear-producto',
        'global-settings': '/configuracion',
      }
      router.push(paths[view] || '/')
    }}>
      {children}
    </SidebarLayout>
  )
}
