import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta los datos a Excel respetando el orden y nombres de headers
 */

export interface HeaderItem {
  label: string;
  key: string;
  tipo_fecha?: boolean;
}


export const exportToExcel = (
  resultados: Record<string, any>[],
  nombreReporte: string = 'reporte',
  headers: HeaderItem[]
) => {
  // Ordenar datos según headers
  const dataOrdenada = ordenarResultadosPorHeaders(resultados, headers);

  // Crear hoja de Excel con encabezados en el orden correcto
  const worksheet = XLSX.utils.json_to_sheet(dataOrdenada, {
    header: headers.map((h) => h.label),
  });

  // Crear libro
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

  // Guardar
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  saveAs(
    new Blob([excelBuffer], { type: 'application/octet-stream' }),
    `${nombreReporte}.xlsx`
  );
};

/**
 * Ordena los resultados según el orden de los headers
 */
export const ordenarResultadosPorHeaders = (
  resultados: Record<string, any>[],
  headers: HeaderItem[]
) => {
  return resultados.map((item) => {
    const fila: Record<string, any> = {};
    headers.forEach((header) => {
      fila[header.label] = item[header.key] ?? '';
    });
    return fila;
  });
};