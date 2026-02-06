import api from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";
import { Star, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";

async function getMovie(id: string) {
    try {
        const response = await api.get(`movie/${id}`, {
            params: { language: "pt-BR" },
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

async function getTrailer(id: string) {
    try {
        const response = await api.get(`movie/${id}/videos`, {
            params: { language: "pt-BR" },
        });
        return response.data.results[0]; // Gets first video
    } catch (error) {
        return null; // Fallback or empty if no trailer
    }
}

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const movie = await getMovie(id);
    if (!movie) return { title: 'Filme não encontrado' };
    return { title: `FlixFilme - ${movie.title}` };
}

export default async function MovieDetails({ params }: Props) {
    const { id } = await params;
    const movie = await getMovie(id);
    const trailer = await getTrailer(id);

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl text-white">
                Filme não encontrado.
            </div>
        )
    }

    const backdropUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    return (
        <div className="min-h-screen pb-20">
            {/* Backdrop Header */}
            <div className="relative h-[60vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backdropUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-64 md:w-80 rounded-xl shadow-2xl shadow-primary/20 border-4 border-white/5"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6 pt-4 md:pt-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">{movie.title}</h1>

                        <div className="flex flex-wrap gap-4 text-gray-300 text-sm md:text-base">
                            <span className="flex items-center gap-1">
                                <Star className="text-yellow-500 w-5 h-5" fill="currentColor" />
                                {movie.vote_average.toFixed(1)} / 10
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-5 h-5" />
                                {new Date(movie.release_date).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-5 h-5" />
                                {movie.runtime} min
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre: any) => (
                                <span key={genre.id} className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/10 text-gray-200">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-white">Sinopse</h3>
                            <p className="text-gray-300 leading-relaxed max-w-3xl">
                                {movie.overview}
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <FavoriteButton movie={movie} />
                            {trailer && (
                                <a
                                    href={`https://youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-2"
                                >
                                    Ver Trailer
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
