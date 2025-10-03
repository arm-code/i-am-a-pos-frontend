
'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Esquema de validación con Yup
const productSchema = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  descripcion: yup.string().required('La descripción es requerida'),
  precioCompra: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('El precio de compra es requerido'),
  precioVenta: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('El precio de venta es requerido'),
  precioRentaDiario: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('El precio de renta diario es requerido'),
  stock: yup
    .number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .required('El stock es requerido'),
  stockMinimo: yup
    .number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo'),
  activo: yup.boolean().default(true),
});

type ProductFormData = yup.InferType<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
}

export default function EditProduct({ onSubmit, initialData }: ProductFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      activo: true,
      stockMinimo: 0,
      ...initialData,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre *
        </label>
        <input
          {...register('nombre')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción *
        </label>
        <textarea
          {...register('descripcion')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.descripcion && (
          <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
        )}
      </div>

      {/* Precios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="precioCompra" className="block text-sm font-medium text-gray-700">
            Precio Compra *
          </label>
          <input
            {...register('precioCompra')}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.precioCompra && (
            <p className="mt-1 text-sm text-red-600">{errors.precioCompra.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-700">
            Precio Venta *
          </label>
          <input
            {...register('precioVenta')}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.precioVenta && (
            <p className="mt-1 text-sm text-red-600">{errors.precioVenta.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="precioRentaDiario" className="block text-sm font-medium text-gray-700">
            Precio Renta Diario *
          </label>
          <input
            {...register('precioRentaDiario')}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.precioRentaDiario && (
            <p className="mt-1 text-sm text-red-600">{errors.precioRentaDiario.message}</p>
          )}
        </div>
      </div>

      {/* Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock *
          </label>
          <input
            {...register('stock')}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="stockMinimo" className="block text-sm font-medium text-gray-700">
            Stock Mínimo
          </label>
          <input
            {...register('stockMinimo')}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.stockMinimo && (
            <p className="mt-1 text-sm text-red-600">{errors.stockMinimo.message}</p>
          )}
        </div>
      </div>

      {/* Activo */}
      <div className="flex items-center">
        <input
          {...register('activo')}
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
          Producto activo
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
      </button>
    </form>
  );
}