import { Product, productosApi } from "@/lib/api";
import { useEffect, useState } from "react";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        const response = await productosApi.getAll()

        if (response.success) {
            // La API devuelve { products: Product[], ... } así que accedemos a response.data.products
            setProducts(response.data?.products || [])
        } else {
            setError(response.error || 'Error al cargar los productos.')
        }

        setLoading(false)
    }

    // Crear producto
    const createProduct = async (productData: Omit<Product, 'id'>) => {
        setLoading(true)
        
        const response = await productosApi.create(productData)
        
        if (response.success) {
            await fetchProducts() // Recargar lista
            return { success: true }
        } else {
            setError(response.error || 'Error al crear producto')
            return { success: false, error: response.error }
        }
    }
    
    // Actualizar producto
    const updateProduct = async (id: number, productData: Partial<Product>) => {
        setLoading(true)
        
        const response = await productosApi.update(id, productData)
        
        if (response.success) {
            await fetchProducts() // Recargar lista
            return { success: true }
        } else {
            setError(response.error || 'Error al actualizar producto')
            return { success: false, error: response.error }
        }
    }

    // Eliminar producto
    const deleteProduct = async (id: number) => {
        setLoading(true)
        
        const response = await productosApi.delete(id)
        
        if (response.success) {
            await fetchProducts() // Recargar lista
            return { success: true }
        } else {
            setError(response.error || 'Error al eliminar producto')
            return { success: false, error: response.error }
        }
    }

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProducts()
    }, [])

    return {
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}