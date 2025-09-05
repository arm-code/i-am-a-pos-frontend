'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProductsView from './components/ProductsView'
import CategoriesView from './components/CategoriesView'
import CreateProductView from './components/CreateProductView'

type View = 'products' | 'categories' | 'create-product'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('products')

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsView />
      case 'categories':
        return <CategoriesView />
      case 'create-product':
        return <CreateProductView onSuccess={() => setCurrentView('products')} />
      default:
        return <ProductsView />
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderView()}
        </div>
      </main>
    </div>
  )
}