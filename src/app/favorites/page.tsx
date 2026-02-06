'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function Favorites() {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        const minhalista = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(minhalista || "[]"));
    }, []);

    function excluirFilme(id: number) {
        const filtroFilmes = movies.filter((item: any) => item.id !== id);
        setMovies(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    }

    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 border-l-4 border-primary pl-4">Meus Filmes</h1>

            {movies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <span className="text-xl text-gray-400">Você não possui nenhum filme salvo :(</span>
                    <Link href="/" className="mt-4 text-primary hover:underline">Ir para a Home</Link>
                </div>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((item: any) => (
                    <li key={item.id} className="bg-card rounded-xl overflow-hidden shadow-lg border border-white/5 relative group">
                        <div className="relative aspect-video">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <Link href={`/movie/${item.id}`} className="px-4 py-2 bg-white text-black rounded font-bold hover:bg-gray-200">Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)} className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <span className="font-semibold text-white truncate flex-1">{item.title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
