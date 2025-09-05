
const  API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api'

export interface ApiResponse<T = any> {
    success:  boolean;
    data?:    T;
    message?: string;
    error?:   string;
}

const defaultOptions: RequestInit = {
    headers: {
        'Content-Type': 'application/json'
    }
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = API_BASE_URL){
        this.baseURL = baseURL;
    }


    // METODO PARA HACER REQUEST
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>>{
        try{
            const url = `${ this.baseURL }${ endpoint }`
            const config = {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...options.headers
                }
            }

            console.log(`API Call: ${config.method || 'GET' } ${ url }`)
            const response = await fetch(url, config)

            if(!response.ok){
                throw new Error(`HTTP ${ response.status }: ${ response.statusText }`)
            }

            const data = await response.json()

            return {
                success: true,
                data
            }
        }catch(error){
            console.log(`API error: `, error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido.'
            }
        }
    }

    // METODOS HTTP ESPECIFICOS
    async get<T>(
        endpoint: string
    ): Promise<ApiResponse> {
        return this.request<T>(endpoint, { method: 'GET'})
    }

    async post<T>(
        endpoint: string,
        data?: any
    ): Promise<ApiResponse<T>> {
        return this.request<T>(
            endpoint, 
            { 
                method: 'POST',
                body: data ? JSON.stringify( data ) : undefined
            })
    }

    async put<T>(
        endpoint: string,
        data?: any
    ): Promise<ApiResponse<T>> {
        return this.request<T>(
            endpoint, 
            { 
                method: 'PUT',
                body: data ? JSON.stringify( data ) : undefined
            })
    }

    async patch<T>(
        endpoint: string,
        data?: any
    ): Promise<ApiResponse<T>> {
        return this.request<T>(
            endpoint, 
            { 
                method: 'PATCH',
                body: data ? JSON.stringify( data ) : undefined
            })
    }

    async delete<T>(
        endpoint: string
    ): Promise<ApiResponse<T>>{
        return this.request<T>(endpoint, { method: 'DELETE'})
    }
}

// Instancia singleton del cliente
export const apiClient = new ApiClient()

// Servicios específicos por módulo
export const productosApi = {
  // Obtener todos los productos
  getAll: () => apiClient.get('/productos'),
  
  // Obtener producto por ID
  getById: (id: number) => apiClient.get(`/productos/${id}`),
  
  // Crear nuevo producto
  create: (data: any) => apiClient.post('/productos', data),
  
  // Actualizar producto
  update: (id: number, data: any) => apiClient.put(`/productos/${id}`, data),
  
  // Eliminar producto
  delete: (id: number) => apiClient.delete(`/productos/${id}`),
}

export const categoriasApi = {
  // Obtener todas las categorías
  getAll: () => apiClient.get('/categorias'),
  
  // Obtener categoría por ID
  getById: (id: number) => apiClient.get(`/categorias/${id}`),
  
  // Crear nueva categoría
  create: (data: any) => apiClient.post('/categorias', data),
  
  // Actualizar categoría
  update: (id: number, data: any) => apiClient.put(`/categorias/${id}`, data),
  
  // Eliminar categoría
  delete: (id: number) => apiClient.delete(`/categorias/${id}`),
}

// Tipos TypeScript para tus modelos (opcional pero recomendado)


export interface ProductsResponse {
    products:   Product[];
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
}

export interface Product {
    id:                number;
    codigoBarra:       string;
    sku:               string;
    nombre:            string;
    descripcion:       string;
    precioCompra:      string;
    precioVenta:       string;
    precioRentaDiario: number;
    stock:             number;
    stockMinimo:       number;
    categoria:         string;
    tipoProducto:      string;
    activo:            boolean;
    createdAt:         Date;
    updatedAt:         Date;
}


export interface Category {
  id?: number
  nombre: string
  descripcion?: string
  createdAt?: Date
  updatedAt?: Date
}