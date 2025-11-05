'use client'

import { useApi } from '@/hooks/useApi'
import { useState } from 'react'

interface CreateProductForm {
  codigoBarra?: string
  sku?: string
  nombre: string
  descripcion?: string
  precioCompra: number
  precioVenta: number
  precioRentaDiario?: number
  stock?: number
  stockMinimo?: number
  categoriaId?: number
  tipoProductoId: number
  activo?: boolean
}

const CrearProductoPage = () => {
  const { error, loading, request } = useApi()
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<CreateProductForm>({
    nombre: '',
    precioCompra: 0,
    precioVenta: 0,
    tipoProductoId: 1, 
    stock: 0,
    stockMinimo: 0,
    precioRentaDiario: 0,
    activo: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    
    try {
      const res = await request('/productos', {
        method: 'POST',
        json: formData
      })

      if (res.data) {
        setSuccess(true)
        // Reset form
        setFormData({
          nombre: '',
          precioCompra: 0,
          precioVenta: 0,
          tipoProductoId: 1,
          stock: 0,
          stockMinimo: 0,
          precioRentaDiario: 0,
          activo: true
        })
      }
    } catch (err) {
      console.error('Error creating product:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Crear nuevo producto</h1>
      
           

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Información básica</h2>
          
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del producto *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Mesa grande plegable"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={3}
              value={formData.descripcion || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Mesa grande marca lifetime, tipo portafolios"
            />
          </div>
        </div>

        {/* Códigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: MG-8S"
            />
          </div>

          <div>
            <label htmlFor="codigoBarra" className="block text-sm font-medium text-gray-700 mb-1">
              Código de barras
            </label>
            <input
              type="text"
              id="codigoBarra"
              name="codigoBarra"
              value={formData.codigoBarra || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 11231234342"
            />
          </div>
        </div>

        {/* Precios */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Precios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="precioCompra" className="block text-sm font-medium text-gray-700 mb-1">
                Precio de compra *
              </label>
              <input
                type="number"
                id="precioCompra"
                name="precioCompra"
                required
                min="0"
                step="0.01"
                value={formData.precioCompra}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-700 mb-1">
                Precio de venta *
              </label>
              <input
                type="number"
                id="precioVenta"
                name="precioVenta"
                required
                min="0"
                step="0.01"
                value={formData.precioVenta}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="precioRentaDiario" className="block text-sm font-medium text-gray-700 mb-1">
                Precio renta diario
              </label>
              <input
                type="number"
                id="precioRentaDiario"
                name="precioRentaDiario"
                min="0"
                step="0.01"
                value={formData.precioRentaDiario || 0}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock inicial
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              value={formData.stock || 0}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="stockMinimo" className="block text-sm font-medium text-gray-700 mb-1">
              Stock mínimo
            </label>
            <input
              type="number"
              id="stockMinimo"
              name="stockMinimo"
              min="0"
              value={formData.stockMinimo || 0}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="categoriaId"
              name="categoriaId"
              value={formData.categoriaId || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar categoría</option>
              {/* Aquí puedes mapear las categorías cuando las tengas */}
              <option value="1">Categoría 1</option>
              <option value="2">Categoría 2</option>
            </select>
          </div>

          <div>
            <label htmlFor="tipoProductoId" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de producto *
            </label>
            <select
              id="tipoProductoId"
              name="tipoProductoId"
              required
              value={formData.tipoProductoId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">Tipo 1</option>
              <option value="2">Tipo 2</option>
              <option value="3">Tipo 3</option>
            </select>
          </div>
        </div>

        {/* Estado */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="activo"
            name="activo"
            checked={formData.activo}
            onChange={(e) => setFormData(prev => ({ ...prev, activo: e.target.checked }))}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="activo" className="ml-2 block text-sm text-gray-700">
            Producto activo
          </label>
        </div>

        {/* Botones */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear producto'}
          </button>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Producto creado exitosamente
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )} 
    </div>
  )
}

export default CrearProductoPage