'use client'

import { useApi } from '@/hooks/useApi'
import { useEffect, useState } from 'react'

interface CreateProductViewProps {
  onSuccess: () => void
}

interface Categoria {
  id: number
  nombre: string
}

interface TipoProducto {
  id: number
  nombre: string
}

export default function CreateProductView({ onSuccess }: CreateProductViewProps) {
  const { loading, request, error } = useApi()

  const [formData, setFormData] = useState({
    codigoBarras: '',
    sku: '',
    nombre: '',
    descripcion: '',
    precioCompra: '',
    precioVenta: '',
    precioRentaDiario: '0',
    stock: '0',
    stockMinimo: '0',
    categoriaId: '',
    tipoProductoId: '',
    activo: true
  })

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [tiposProducto, setTiposProducto] = useState<TipoProducto[]>([])

  // 🚀 Cargar categorías y tipos desde la API
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, tiposRes] = await Promise.all([
        request('/categorias'),
        request('/tipos-producto')
      ])

      if (catRes?.data) setCategorias(catRes.data)
      if (tiposRes?.data) setTiposProducto(tiposRes.data)
    }

    fetchData()
  }, [request])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]:
        type === 'number'
          ? value === ''
            ? ''
            : Number(value)
          : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      codigoBarras: formData.codigoBarras || undefined,
      sku: formData.sku || undefined,
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
      precioCompra: Number(formData.precioCompra),
      precioVenta: Number(formData.precioVenta),
      precioRentaDiario: Number(formData.precioRentaDiario) || 0,
      stock: Number(formData.stock) || 0,
      stockMinimo: Number(formData.stockMinimo) || 0,
      categoriaId: formData.categoriaId ? Number(formData.categoriaId) : undefined,
      tipoProductoId: Number(formData.tipoProductoId),
      activo: formData.activo
    }

    const res = await request('/productos', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    if (res?.data) {
      alert('✅ Producto creado correctamente')
      onSuccess()
    } else {
      alert('❌ Error al crear el producto')
      console.error(error)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuevo Producto</h2>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Código de barras y SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Código de barras</label>
            <input
              type="text"
              name="codigoBarras"
              value={formData.codigoBarras}
              onChange={handleInputChange}
              maxLength={50}
              className="input-field"
              placeholder="7501001234567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              maxLength={50}
              className="input-field"
              placeholder="PROT-001"
            />
          </div>
        </div>

        {/* Nombre y descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            minLength={2}
            maxLength={200}
            className="input-field"
            placeholder="Proteína Whey 2lb"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={3}
            className="input-field resize-none"
            placeholder="Descripción del producto"
          />
        </div>

        {/* Precios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio compra *</label>
            <input
              type="number"
              name="precioCompra"
              value={formData.precioCompra}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio venta *</label>
            <input
              type="number"
              name="precioVenta"
              value={formData.precioVenta}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Renta diaria</label>
            <input
              type="number"
              name="precioRentaDiario"
              value={formData.precioRentaDiario}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="input-field"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock mínimo</label>
            <input
              type="number"
              name="stockMinimo"
              value={formData.stockMinimo}
              onChange={handleInputChange}
              min="0"
              className="input-field"
            />
          </div>
        </div>

        {/* Categoría y tipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de producto *</label>
            <select
              name="tipoProductoId"
              value={formData.tipoProductoId}
              onChange={handleInputChange}
              required
              className="input-field"
            >
              <option value="">Selecciona un tipo</option>
              {tiposProducto.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Activo */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Producto activo</label>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onSuccess}
            className="btn-secondary"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar producto'}
          </button>
        </div>
      </form>
    </div>
  )
}
