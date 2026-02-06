'use client';

import { Heart, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FavoriteButton({ movie }: { movie: any }) {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const minhalista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhalista || "[]");
        const hasFilme = filmesSalvos.some((filmeSalvo: any) => filmeSalvo.id === movie.id);
        setFavorite(hasFilme);
    }, [movie]);

    function salvarFilme() {
        const minhalista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhalista || "[]");

        const hasFilme = filmesSalvos.some((filmeSalvo: any) => filmeSalvo.id === movie.id);

        if (hasFilme) {
            const filtroFilmes = filmesSalvos.filter((filmeSalvo: any) => filmeSalvo.id !== movie.id);
            localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
            setFavorite(false);
            // alert("Filme removido com sucesso");
        } else {
            filmesSalvos.push(movie);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
            setFavorite(true);
            // alert("Filme salvo com sucesso");
        }
    }

    return (
        <button
            onClick={salvarFilme}
            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ${favorite
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md'
                }`}
        >
            {favorite ? <Check className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
            {favorite ? 'Salvo em Meus Filmes' : 'Salvar em Meus Filmes'}
        </button>
    );
}
