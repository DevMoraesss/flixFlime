import api from "@/lib/api";
import Hero from "@/components/Hero";
import MovieCard from "@/components/MovieCard";

async function getNowPlaying() {
  try {
    const response = await api.get("movie/now_playing", {
      params: { language: "pt-BR", page: 1 },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies", error);
    return [];
  }
}

export default async function Home() {
  const movies = await getNowPlaying();
  const featuredMovie = movies[0];
  const listMovies = movies.slice(1, 21); // Display rest below

  return (
    <main className="min-h-screen">
      {featuredMovie && <Hero movie={featuredMovie} />}

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <h2 className="text-3xl font-bold text-white">Em Cartaz</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {listMovies.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </section>

      {/* Decorative gradient at the bottom */}
      <div className="h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </main>
  );
}
