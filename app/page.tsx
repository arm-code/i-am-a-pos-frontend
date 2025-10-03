'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProductsView from './components/ProductsView'
import CategoriesView from './components/CategoriesView'
import CreateProductView from './components/CreateProductView'
import GlobalSettings from './components/GlobalSettings'
import BienvenidaView from './components/BienvenidaView'

type View = 'products' | 'categories' | 'create-product' | 'global-settings' | 'principal'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('principal')

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsView />
      case 'categories':
        return <CategoriesView />
      case 'create-product':
        return <CreateProductView onSuccess={() => setCurrentView('products')} />
      case 'global-settings':
        return <GlobalSettings/>
        case 'principal':
        return <BienvenidaView/>
      default:
        return <BienvenidaView />
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 h-full">
          {renderView()}
        </div>
      </main>
    </div>
  )
}