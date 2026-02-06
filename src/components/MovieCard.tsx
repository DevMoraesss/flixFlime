'use client';

import Link from 'next/link';

interface MovieCardProps {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

export default function MovieCard({ id, title, poster_path, vote_average }: MovieCardProps) {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    return (
        <div className="group relative rounded-xl overflow-hidden bg-card/50 border border-white/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50">
            <Link href={`/movie/${id}`}>
                <div className="aspect-[2/3] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                        <span className="text-yellow-500 font-bold text-sm">★ {vote_average.toFixed(1)}</span>
                    </div>
                </div>

                <div className="p-4 absolute bottom-0 left-0 right-0 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-semibold text-lg truncate text-white group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ver detalhes</p>
                </div>
            </Link>
        </div>
    );
}
