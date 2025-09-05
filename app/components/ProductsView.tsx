'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  description?: string
  price: number
  category: string
  stock: number
}

export default function ProductsView() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Simular carga de productos - aquí conectarías con tu API
  useEffect(() => {
    // Datos de ejemplo - reemplazar con llamada a tu API
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Producto 1', price: 25.99, category: 'Categoría A', stock: 10 },
        { id: 2, name: 'Producto 2', price: 45.50, category: 'Categoría B', stock: 5 },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando productos...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-64"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
          <p className="text-gray-600">Comienza agregando tu primer producto</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">{product.category}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm">Editar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}