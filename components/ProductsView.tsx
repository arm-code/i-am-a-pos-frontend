'use client'

import { useApi } from '@/hooks/useApi'
import { Product } from '@/types/products.types';
import { useEffect, useState } from 'react'



export default function ProductsView() {

  const { error, loading, request } = useApi();  
  const [ products, setProducts ] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')  

  const fetchProducts = async () => {
    const res = await request('/productos')
    console.log(res.data)
    if(res.data){
      setProducts(res.data.products);      
    }    
  }  

   useEffect(() => {
    fetchProducts()    
  }, [])


  // Función para manejar la eliminación de productos
  const handleDeleteProduct = async (id: number, nombre: string) => {
    
  }
  
  const handleEditProduct = async (id: number, productData: Partial<Product>) => {
    
  }
  
  // Mostrar error si existe
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
        <button 
          onClick={fetchProducts}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
          Reintentar
        </button>
      </div>
    )
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando productos...</div>
      </div>
    )
  } 
  

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )



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
            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No se encontraron productos' : 'No hay productos'}
          </h3>
          <p className="text-gray-600">
            {searchTerm ? 'Intenta con otro término de búsqueda' : 'Comienza agregando tu primer producto'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{product.nombre}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">{product.descripcion}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ${parseFloat(product.precioVenta).toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id!, product.nombre)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-3 text-sm rounded-lg transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}