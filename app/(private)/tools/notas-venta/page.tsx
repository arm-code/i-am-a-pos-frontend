'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, FileText, Plus, Loader2 } from "lucide-react";
import Link from 'next/link';
import { Loader } from '@/components/Loaders/Loader.component';

import SalesNoteDetailView from '@/components/sales/SalesNoteDetailView.component';
import { X } from 'lucide-react';

interface SaleNote {
    id: number;
    note_number: string;
    client_name: string;
    total: number;
    created_at: string;
}

export default function SalesNotesListPage() {
    const { request, loading, error } = useApi();
    const [notes, setNotes] = useState<SaleNote[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [selectedNote, setSelectedNote] = useState<any | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const fetchNotes = async () => {
        const res = await request('/sales-notes');
        if (res.data) {
            setNotes(res.data || []);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleViewDetails = async (id: number) => {
        setIsLoadingDetails(true);
        try {
            const res = await request(`/sales-notes/${id}`);
            if (res.data) {
                setSelectedNote(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const filteredNotes = notes.filter(note =>
        note.note_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && notes.length === 0) {
        return <Loader size="lg" text="Cargando notas de venta..." />;
    }

    return (
        <div className="space-y-6 p-4 md:p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-violet-900">Notas de Venta</h1>
                    <p className="text-violet-600 mt-1">Listado histórico de todas las notas generadas.</p>
                </div>
                <Link href="/tools/crear-nota-venta">
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Nota
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-violet-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 w-4 h-4" />
                    <Input
                        placeholder="Buscar por número de nota o cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-violet-200"
                    />
                </div>
            </div>

            <div className="bg-white border border-violet-100 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-violet-50 text-violet-900 border-b border-violet-100 font-semibold">
                                <th className="py-4 px-4 text-left">Folio</th>
                                <th className="py-4 px-4 text-left">Cliente</th>
                                <th className="py-4 px-4 text-left">Fecha</th>
                                <th className="py-4 px-4 text-right">Total</th>
                                <th className="py-4 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-violet-100">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((note) => (
                                    <tr key={note.id} className="hover:bg-violet-50/50 transition-colors text-violet-900">
                                        <td className="py-4 px-4 font-medium">{note.note_number}</td>
                                        <td className="py-4 px-4">{note.client_name}</td>
                                        <td className="py-4 px-4 text-violet-600">
                                            {new Date(note.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 text-right font-bold text-violet-700">
                                            ${Number(note.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-violet-600 hover:text-violet-900 hover:bg-violet-100"
                                                onClick={() => handleViewDetails(note.id)}
                                                disabled={isLoadingDetails}
                                            >
                                                {isLoadingDetails ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4 mr-1" />}
                                                Detalles
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-violet-400">
                                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p>No se encontraron notas de venta</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedNote && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="sticky top-0 right-0 p-4 flex justify-end z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedNote(null)}
                                className="bg-white/80 backdrop-blur hover:bg-red-50 hover:text-red-600 rounded-full shadow-md"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="p-4 md:p-8 pt-0">
                            <SalesNoteDetailView note={selectedNote} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

