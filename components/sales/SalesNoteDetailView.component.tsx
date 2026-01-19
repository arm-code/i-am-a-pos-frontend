'use client';

import React, { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Calendar, User, Phone, MapPin, FileText, Download, Image as ImageIcon, Loader2 } from "lucide-react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface SaleNoteItem {
    id: number;
    product_id?: number;
    quantity: number;
    description: string;
    unit_price: number;
    amount: number;
}

interface SaleNoteDetail {
    id: number;
    note_number: string;
    client_name: string;
    client_phone: string;
    client_address: string;
    subtotal: number;
    tax_amount: number;
    total: number;
    issued_by: string;
    created_at: string;
    items: SaleNoteItem[];
}

interface Props {
    note: SaleNoteDetail;
    onClose?: () => void;
}

export default function SalesNoteDetailView({ note }: Props) {
    const printRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = React.useState(false);

    const handlePrint = () => {
        window.print();
    };

    const exportToImage = async () => {
        if (!printRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(printRef.current, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `Nota-${note.note_number}.png`;
            link.click();
        } catch (error) {
            console.error("Error exporting to image:", error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToPDF = async () => {
        if (!printRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(printRef.current, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Nota-${note.note_number}.pdf`);
        } catch (error) {
            console.error("Error exporting to PDF:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="flex flex-wrap justify-end gap-2 print:hidden">
                <Button
                    onClick={exportToImage}
                    disabled={isExporting}
                    variant="outline"
                    className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50"
                >
                    {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                    Imagen
                </Button>
                <Button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    variant="outline"
                    className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50"
                >
                    {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    PDF
                </Button>
                <Button onClick={handlePrint} className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                </Button>
            </div>

            <div ref={printRef} className="bg-white border border-violet-100 rounded-xl overflow-hidden shadow-sm">
                {/* Header - Invoice Look */}
                <div className="p-6 md:p-10 border-b border-violet-50 bg-violet-50/30">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-violet-900 mb-2">Nota de Venta</h1>
                            <div className="flex items-center gap-2 text-violet-600 font-bold text-xl">
                                <FileText className="h-6 w-6" />
                                {note.note_number}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center justify-end gap-2 text-violet-900 font-medium">
                                <Calendar className="h-4 w-4" />
                                {new Date(note.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <p className="text-violet-500 mt-1">Expedido por: {note.issued_by}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-10 space-y-10">
                    {/* Customer Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-violet-400">Datos del Cliente</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <User className="h-5 w-5 text-violet-300 mt-0.5" />
                                    <span className="text-violet-900 font-semibold text-lg">{note.client_name}</span>
                                </div>
                                {note.client_phone && (
                                    <div className="flex items-center gap-3 text-violet-600">
                                        <Phone className="h-4 w-4 text-violet-300" />
                                        <span>{note.client_phone}</span>
                                    </div>
                                )}
                                {note.client_address && (
                                    <div className="flex items-start gap-3 text-violet-600">
                                        <MapPin className="h-4 w-4 text-violet-300 mt-1" />
                                        <span className="flex-1">{note.client_address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-full h-full flex items-center justify-end opacity-5">
                                <FileText size={100} className="text-violet-900" />
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="w-full">
                        <table className="w-full">
                            <thead className="border-b border-violet-200">
                                <tr className="text-violet-400 text-xs font-bold uppercase tracking-tighter">
                                    <th className="py-4 text-left font-semibold">Cant.</th>
                                    <th className="py-4 text-left font-semibold">Concepto</th>
                                    <th className="py-4 text-right font-semibold">Precio</th>
                                    <th className="py-4 text-right font-semibold">Importe</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-violet-50">
                                {note.items.map((item) => (
                                    <tr key={item.id} className="text-violet-900">
                                        <td className="py-4 font-medium">{item.quantity}</td>
                                        <td className="py-4">{item.description}</td>
                                        <td className="py-4 text-right">${Number(item.unit_price).toFixed(2)}</td>
                                        <td className="py-4 text-right font-bold text-violet-700">${Number(item.amount).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end pt-10 border-t border-violet-100">
                        <div className="w-full md:w-1/2 lg:w-1/3 space-y-3">
                            <div className="flex justify-between text-violet-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">${Number(note.subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-violet-600">
                                <span>IVA (16%)</span>
                                <span className="font-semibold">${Number(note.tax_amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black pt-4 border-t-2 border-violet-900 text-violet-900">
                                <span>TOTAL</span>
                                <span>${Number(note.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 text-center text-violet-300 text-xs print:block hidden">
                        Gracias por su preferencia
                    </div>
                </div>
            </div>
        </div>
    );
}
