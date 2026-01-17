'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Printer } from "lucide-react";

interface SalesItem {
  id: string;
  quantity: number;
  description: string;
  unitPrice: number;
}

export default function CreateSalesNotePage() {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    noteNumber: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [items, setItems] = useState<SalesItem[]>([
    { id: '1', quantity: 1, description: '', unitPrice: 0 }
  ]);

  const [taxRate, setTaxRate] = useState(0.16); // 16% IVA by default
  const [applyTax, setApplyTax] = useState(false);

  const calculateAmount = (item: SalesItem) => {
    return item.quantity * item.unitPrice;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateAmount(item), 0);
  };

  const calculateTax = () => {
    return applyTax ? calculateSubtotal() * taxRate : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Math.random().toString(36).substr(2, 9), quantity: 1, description: '', unitPrice: 0 }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof SalesItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
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
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Imprimir
        </Button>
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
                  onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono</label>
                <Input 
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                  placeholder="Número de teléfono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección</label>
                <Input 
                  value={clientInfo.address}
                  onChange={(e) => setClientInfo({...clientInfo, address: e.target.value})}
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
                  onChange={(e) => setClientInfo({...clientInfo, noteNumber: e.target.value})}
                  placeholder="Ej. NV-001"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha</label>
                <Input 
                  type="date"
                  value={clientInfo.date}
                  onChange={(e) => setClientInfo({...clientInfo, date: e.target.value})}
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-2 text-left w-20">Cant.</th>
                    <th className="py-3 px-2 text-left">Descripción</th>
                    <th className="py-3 px-2 text-right w-32">Precio Unit.</th>
                    <th className="py-3 px-2 text-right w-32">Importe</th>
                    <th className="py-3 px-2 w-10 print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2">
                        <Input 
                          type="number" 
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full text-center"
                        />
                      </td>
                      <td className="p-2">
                        <Input 
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Descripción del producto o servicio"
                          className="w-full"
                        />
                      </td>
                      <td className="p-2">
                        <Input 
                          type="number" 
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full text-right"
                        />
                      </td>
                      <td className="p-2 text-right font-medium">
                        ${calculateAmount(item).toFixed(2)}
                      </td>
                      <td className="p-2 print:hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
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
              <span className="font-medium">Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center gap-2">
                <span className="font-medium">IVA:</span>
                <label className="flex items-center gap-2 text-sm text-muted-foreground print:hidden">
                    <input 
                        type="checkbox" 
                        checked={applyTax}
                        onChange={(e) => setApplyTax(e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    Aplicar (16%)
                </label>
              </div>
              <span>${calculateTax().toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-3 border-b-2 border-primary">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold text-primary">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
