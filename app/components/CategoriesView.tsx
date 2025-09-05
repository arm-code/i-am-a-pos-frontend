'use client'

import { useState, useEffect } from 'react'

interface Category {
  id: number
  name: string
  description?: string
  productCount: number
}

export default function CategoriesView() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })

  // Simular carga de categorías
  useEffect(() => {
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'Categoría A', description: 'Productos tipo A', productCount: 5 },
        { id: 2, name: 'Categoría B', description: 'Productos tipo B', productCount: 3 },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aquí harías la llamada a tu API
    console.log('Nueva categoría:', newCategory)
    
    // Simular creación
    const newCat: Category = {
      id: Date.now(),
      name: newCategory.name,
      description: newCategory.description,
      productCount: 0
    }
    
    setCategories([...categories, newCat])
    setNewCategory({ name: '', description: '' })
    setShowForm(false)
    alert('Categoría creada exitosamente')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando categorías...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancelar' : 'Nueva Categoría'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Crear Nueva Categoría</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                required
                className="input-field"
                placeholder="Nombre de la categoría"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                rows={3}
                className="input-field resize-none"
                placeholder="Descripción opcional"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setNewCategory({ name: '', description: '' })
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Crear Categoría
              </button>
            </div>
          </form>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🏷️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay categorías</h3>
          <p className="text-gray-600">Crea tu primera categoría para organizar tus productos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {category.productCount} productos
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{category.description || 'Sin descripción'}</p>
              
              <div className="flex justify-end space-x-2">
                <button className="btn-secondary text-sm">Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}