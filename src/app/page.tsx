import { getAllMovies } from "@/services/MovieService";

// interface MovieType {
//   id: number;
//   title: string;
//   backdrop_path: string;
//   poster_path: string;
//   overview: string;
// }

export default async function Home() {
  const movies = await getAllMovies();
  console.log(movies);
  return <div className="bg-black text-white min-h-screen"></div>;
}
