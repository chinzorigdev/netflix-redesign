"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MovieType {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_WITH_KEY}${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
          console.log("Fetching from:", apiUrl);

          const res = await fetch(apiUrl);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
          }

          const data = await res.json();
          setMovie(data);
          setError(null);
        } catch (error) {
          console.error("Error fetching movie data:", error);
          setError("Failed to load movie data");
        }
      };
      fetchMovie();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!movie) {
    return <div className="p-4">Ачааллаж байна...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div className="h-7"></div>

      <div
        className="relative w-full h-[500px] bg-cover bg-center mt-16"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_PATH}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-top from-black to-transparent  p-8 flex flex-col justify-end">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4 max-w-xl">{movie.overview}</p>
          <div className="mt-4">
            <Link href={`/movie/${movie.id}`}>
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-red-600 text-white px-8 py-2 rounded-lg text-lg  font-semibold hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out"
              >
                Үзэх
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showTrailer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-black">Трейлер</h2>
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube-nocookie.com/embed/P9mwtI82k6E"
              title="YouTube video player"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Хаах
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default page;
