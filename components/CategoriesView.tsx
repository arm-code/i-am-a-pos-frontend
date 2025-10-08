'use client'

import { useApi } from '@/hooks/useApi'
import { useState, useEffect } from 'react'

interface Category {
  id: number
  nombre: string
  descripcion?: string
  productosCount: number
}

export default function CategoriesView() {
  const { request, loading } = useApi()
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' })

  const fetchCategories = async () => {
    const res = await request('/categorias')
    if (res?.data) setCategories(res.data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
    }

    const url = editingCategory ? `/categorias/${editingCategory.id}` : '/categorias'
    const method = editingCategory ? 'PUT' : 'POST'

    const res = await request(url, {
      method,
      body: JSON.stringify(payload),
    })

    if (res?.data) {
      await fetchCategories()
      setShowForm(false)
      setEditingCategory(null)
      setFormData({ nombre: '', descripcion: '' })
      alert('✅ Categoría guardada correctamente')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return
    const res = await request(`/categorias/${id}`, { method: 'DELETE' })
    if (res.status === 200) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando categorías...</p>
      </div>
    )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : 'Nueva Categoría'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingCategory ? 'Editar Categoría' : 'Crear Categoría'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="input-field resize-none"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setShowForm(false)
                  setEditingCategory(null)
                  setFormData({ nombre: '', descripcion: '' })
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                {editingCategory ? 'Guardar cambios' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900">{cat.nombre}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {cat.productosCount || 0} productos
              </span>
            </div>
            <p className="text-gray-600 mb-4">{cat.descripcion || 'Sin descripción'}</p>
            <div className="flex justify-end space-x-2">
              <button
                className="btn-secondary text-sm"
                onClick={() => {
                  setEditingCategory(cat)
                  setFormData({ nombre: cat.nombre, descripcion: cat.descripcion || '' })
                  setShowForm(true)
                }}
              >
                Editar
              </button>
              <button className="btn-danger text-sm" onClick={() => handleDelete(cat.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
