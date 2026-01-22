'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Herramientas</h1>
      <p className="text-violet-900">
        Herramientas y utilidades para la gestión del negocio.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow border-violet-100">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm text-violet-900 font-medium">Nota de Venta</CardTitle>
            <FileText className="h-4 w-4 text-violet-600 ml-auto" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-violet-600 mb-4">
              Crea notas de venta digitales con cálculo automático.
            </p>
            <Link href="/tools/crear-nota-venta">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                Crear Nota
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-violet-100">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm text-violet-900 font-medium">Historial de Notas</CardTitle>
            <FileText className="h-4 w-4 text-violet-600 ml-auto" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-violet-600 mb-4">
              Consulta y gestiona las notas de venta generadas.
            </p>
            <Link href="/tools/notas-venta">
              <Button variant="outline" className="w-full border-violet-200 text-violet-700 hover:bg-violet-50">
                Ver Historial
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
