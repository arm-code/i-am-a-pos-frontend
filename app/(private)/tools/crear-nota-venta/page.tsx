'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Printer, Save, Loader2, Search } from "lucide-react";
import { useApi } from '@/hooks/useApi';
import { Product } from '@/types/products.types';
import { useRouter } from 'next/navigation';

interface SalesItem {
  id: string;
  product_id?: number;
  quantity: number;
  description: string;
  unit_price: number;
  amount: number;
}

export default function CreateSalesNotePage() {
  const router = useRouter();
  const { request, loading: apiLoading } = useApi();
  const [isSaving, setIsSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductList, setShowProductList] = useState<string | null>(null);

  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    noteNumber: `NV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
  });

  const [items, setItems] = useState<SalesItem[]>([
    { id: Math.random().toString(36).substr(2, 9), quantity: 1, description: '', unit_price: 0, amount: 0 }
  ]);

  const [applyTax, setApplyTax] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await request('/productos');
    if (res.data) {
      setProducts(res.data.products || []);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  };

  const calculateTax = () => {
    return applyTax ? calculateSubtotal() * 0.16 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Math.random().toString(36).substr(2, 9), quantity: 1, description: '', unit_price: 0, amount: 0 }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof SalesItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unit_price') {
          updatedItem.amount = updatedItem.quantity * updatedItem.unit_price;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const selectProduct = (itemId: string, product: Product) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          product_id: product.id,
          description: product.nombre,
          unit_price: parseFloat(product.precioVenta),
          amount: item.quantity * parseFloat(product.precioVenta)
        };
      }
      return item;
    }));
    setShowProductList(null);
  };

  const handleSave = async () => {
    if (!clientInfo.name) {
      alert('El nombre del cliente es obligatorio');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        note_number: clientInfo.noteNumber,
        client_name: clientInfo.name,
        client_phone: clientInfo.phone,
        client_address: clientInfo.address,
        subtotal: calculateSubtotal(),
        tax_amount: calculateTax(),
        total: calculateTotal(),
        issued_by: 'admin', // Podría venir del auth en el futuro
        items: items.map(({ product_id, quantity, description, unit_price, amount }) => ({
          product_id,
          quantity,
          description,
          unit_price,
          amount
        }))
      };

      const res = await request('/sales-notes', {
        method: 'POST',
        json: payload
      });

      if (res.data) {
        alert('Nota de venta creada exitosamente');
        router.push('/tools/notas-venta');
      } else {
        alert('Error al crear la nota: ' + res.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error de red al crear la nota');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Nueva Nota de Venta</h1>
          <p className="text-muted-foreground">Llena los datos para generar la nota.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={isSaving} className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="print:p-8 print:max-w-none">
        {/* Header Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Input
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono</label>
                <Input
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  placeholder="Número de teléfono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección</label>
                <Input
                  value={clientInfo.address}
                  onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detalles de la Nota</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Número de Nota</label>
                <Input
                  value={clientInfo.noteNumber}
                  onChange={(e) => setClientInfo({ ...clientInfo, noteNumber: e.target.value })}
                  placeholder="Ej. NV-1001"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha</label>
                <Input
                  type="date"
                  value={clientInfo.date}
                  onChange={(e) => setClientInfo({ ...clientInfo, date: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items Table */}
        <Card className="mb-8">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Conceptos</CardTitle>
            <Button onClick={addItem} size="sm" className="bg-violet-600 hover:bg-violet-700 text-white print:hidden">
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-visible">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-2 text-left w-20">Cant.</th>
                    <th className="py-3 px-2 text-left">Descripción / Producto</th>
                    <th className="py-3 px-2 text-right w-32">Precio Unit.</th>
                    <th className="py-3 px-2 text-right w-32">Importe</th>
                    <th className="py-3 px-2 w-10 print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 align-top">
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full text-center"
                        />
                      </td>
                      <td className="p-2 relative align-top">
                        <div className="flex gap-2">
                          <Input
                            value={item.description}
                            onChange={(e) => {
                              updateItem(item.id, 'description', e.target.value);
                              setSearchTerm(e.target.value);
                              setShowProductList(item.id);
                            }}
                            onFocus={() => {
                              setSearchTerm(item.description);
                              setShowProductList(item.id);
                            }}
                            placeholder="Descripción o buscar producto..."
                            className="w-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() => setShowProductList(showProductList === item.id ? null : item.id)}
                          >
                            <Search className="h-4 w-4 text-violet-600" />
                          </Button>
                        </div>

                        {showProductList === item.id && (
                          <div className="absolute z-10 left-2 right-2 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                            {products
                              .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.codigoBarra?.includes(searchTerm))
                              .map(product => (
                                <div
                                  key={product.id}
                                  className="p-2 hover:bg-violet-50 cursor-pointer border-b last:border-0"
                                  onClick={() => selectProduct(item.id, product)}
                                >
                                  <div className="font-medium">{product.nombre}</div>
                                  <div className="text-xs text-muted-foreground flex justify-between">
                                    <span>SKU: {product.sku || 'N/A'}</span>
                                    <span className="text-violet-700 font-bold">${parseFloat(product.precioVenta).toFixed(2)}</span>
                                  </div>
                                </div>
                              ))
                            }
                            {products.length > 0 && products.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                              <div className="p-4 text-center text-sm text-muted-foreground">
                                No se encontraron productos
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-2 align-top">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => updateItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                          className="w-full text-right"
                        />
                      </td>
                      <td className="p-2 text-right font-medium align-top py-4">
                        ${(item.quantity * item.unit_price).toFixed(2)}
                      </td>
                      <td className="p-2 print:hidden align-top">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-violet-900">Subtotal:</span>
              <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center gap-2">
                <span className="font-medium text-violet-900">IVA (16%):</span>
                <label className="flex items-center gap-2 text-sm text-muted-foreground print:hidden">
                  <input
                    type="checkbox"
                    checked={applyTax}
                    onChange={(e) => setApplyTax(e.target.checked)}
                    className="rounded border-gray-300 accent-violet-600"
                  />
                  Aplicar
                </label>
              </div>
              <span className="font-bold">${calculateTax().toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-4 border-t-2 border-violet-600">
              <span className="text-xl font-bold text-violet-900">Total:</span>
              <span className="text-2xl font-bold text-violet-700">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clic fuera para cerrar lista */}
      {showProductList && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowProductList(null)}
        />
      )}
    </div>
  );
}

