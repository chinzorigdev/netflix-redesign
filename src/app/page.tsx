import { getAllMovies } from "@/services/MovieService";
import Header from "../components/Header";
import Link from "next/link";
import Footer from "../components/Footer";

interface MovieType {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

export default async function Home() {
  const movies = await getAllMovies();
  const featuredMovies = movies.results[0];
  const IMAGE_BASE_URL = process.env.IMAGE_PATH;

  console.log(movies);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div className="h-7"></div>
      {featuredMovies && (
        <div
          className="relative w-full h-[500px] bg-cover bg-center mt-16"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}${featuredMovies.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-top from-black to-transparent  p-8 flex flex-col justify-end">
            <h1 className="text-5xl font-bold mb-4">{featuredMovies.title}</h1>
            <p className="text-lg mb-4 max-w-xl">{featuredMovies.overview}</p>
            <div className="mt-4">
              <Link href={`/movie/${featuredMovies.id}`}>
                <button className="bg-red-600 text-white px-8 py-2 rounded-lg text-lg  font-semibold hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out">
                  Тоглуул
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Үзэлт ихтэй кино</h2>
        <div className="flex overflow-x-auto space-x-8 w-full">
          {movies.results.map((movie: MovieType) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-300 w-44">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg w-full h-80 object-cover"
                />
                <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
