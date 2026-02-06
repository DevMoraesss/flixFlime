'use client';

import Link from 'next/link';
import { Play, Info } from 'lucide-react';

interface HeroProps {
    movie: any;
}

export default function Hero({ movie }: HeroProps) {
    if (!movie) return null;

    const backdropUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

    return (
        <div className="relative w-full h-[85vh] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="max-w-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
                    <span className="px-3 py-1 border border-primary/50 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-lg">
                        Destaque da Semana
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                        {movie.title}
                    </h1>
                    <p className="text-lg text-gray-300 line-clamp-3 leading-relaxed">
                        {movie.overview}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href={`/movie/${movie.id}`}
                            className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                        >
                            <Play fill="currentColor" className="w-5 h-5" />
                            Assistir Agora
                        </Link>
                        <Link
                            href={`/movie/${movie.id}`}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all border border-white/10 hover:border-white/30"
                        >
                            <Info className="w-5 h-5" />
                            Mais Detalhes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
