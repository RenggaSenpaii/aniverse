import Link from "next/link"
import AnimeSearch from "../components/AnimeSearch"
import Navbar from "../components/Navbar"

type Anime = {
  mal_id: number
  title: string
  synopsis: string
  images: {
    jpg: {
      image_url: string
      large_image_url: string
    }
  }
  score: number
}

type HomeProps = {
  searchParams: Promise<{
    page?: string
    genre?: string
  }>
}

const genres = [
  {
    id: 1,
    name: "Action"
  },
  {
    id: 2,
    name: "Adventure"
  },
  {
    id: 4,
    name: "Comedy"
  },
  {
    id: 8,
    name: "Drama"
  },
  {
    id: 10,
    name: "Fantasy"
  },
  {
    id: 22,
    name: "Romance"
  },
  {
    id: 24,
    name: "Sci-Fi"
  },
  {
    id: 36,
    name: "Slice of Life"
  },
  {
    id: 40,
    name: "Psychological"
  },
  {
    id: 37,
    name: "Supernatural"
  }
]

async function getAnime(
  page: number,
  genre?: string
) {

  let url =
    `https://api.jikan.moe/v4/top/anime?page=${page}`

  if (genre) {

    url =
      `https://api.jikan.moe/v4/anime?genres=${genre}&page=${page}`

  }

  const res = await fetch(url)

  const data = await res.json()

  return data.data
}

export default async function Home({
  searchParams,
}: HomeProps) {

  const params = await searchParams

  const currentPage =
    Number(params.page) || 1

  const selectedGenre =
    params.genre || ""

  const animeList: Anime[] =
    await getAnime(
      currentPage,
      selectedGenre
    )

  const featuredAnime =
    animeList[0]

  return (

    <main className="min-h-screen bg-black text-white scroll-smooth">

      <Navbar />

      <section
        id="home"
        className="max-w-7xl mx-auto px-6 py-10"
      >

        {featuredAnime && (

          <div className="relative min-h-[700px] rounded-3xl mb-20">

            <img
              src={featuredAnime.images.jpg.large_image_url}
              alt={featuredAnime.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40 rounded-3xl" />

            <div className="relative z-10 flex items-center min-h-[700px] px-6 md:px-14 py-20">

              <div className="max-w-3xl">

                <p className="text-red-500 font-semibold tracking-[0.3em] uppercase mb-5">

                  Featured Anime

                </p>

                <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 break-words">

                  {featuredAnime.title}

                </h2>

                <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-10 line-clamp-5">

                  {featuredAnime.synopsis}

                </p>

                <div className="flex items-center gap-5 mb-10">

                  <div className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold text-lg">

                    ⭐ {featuredAnime.score || "N/A"}

                  </div>

                </div>

                <AnimeSearch />

              </div>

            </div>

          </div>

        )}

        <div
          id="trending"
          className="flex items-center justify-between mb-10"
        >

          <h3 className="text-3xl font-bold">

            {selectedGenre
              ? `${genres.find(
                  (g) =>
                    g.id.toString() === selectedGenre
                )?.name} Anime`
              : "Trending Anime"}

          </h3>

          <a
            href="#top-anime"
            className="border border-zinc-700 px-5 py-2 rounded-xl hover:bg-zinc-900 transition"
          >

            View More

          </a>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">

          {animeList.map((anime) => (

            <Link
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="group"
            >

              <div className="overflow-hidden rounded-2xl mb-4 bg-zinc-900">

                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-105 transition duration-300"
                />

              </div>

              <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-red-400 transition">

                {anime.title}

              </h4>

              <p className="text-zinc-400 text-sm">

                ⭐ {anime.score || "N/A"}

              </p>

            </Link>

          ))}

        </div>

        <section
          id="top-anime"
          className="mb-24"
        >

          <h3 className="text-3xl font-bold mb-10">
            Top Anime
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {animeList.slice(0, 6).map((anime) => (

              <Link
                href={`/anime/${anime.mal_id}`}
                key={anime.mal_id}
                className="flex items-center gap-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-red-500 transition"
              >

                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-28 h-40 object-cover rounded-2xl"
                />

                <div>

                  <h4 className="text-2xl font-bold mb-3">

                    {anime.title}

                  </h4>

                  <p className="text-zinc-400 mb-4">

                    ⭐ {anime.score || "N/A"}

                  </p>

                  <p className="text-zinc-500 line-clamp-3">

                    {anime.synopsis}

                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>

        <section
          id="genres"
          className="mb-24"
        >

          <h3 className="text-3xl font-bold mb-10">
            Popular Genres
          </h3>

          <div className="flex flex-wrap gap-4">

            {genres.map((genre) => (

              <Link
                href={`/?genre=${genre.id}&page=1`}
                key={genre.id}
                className={`px-6 py-4 rounded-2xl border transition ${
                  selectedGenre ===
                  genre.id.toString()
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-zinc-900 border-zinc-800 hover:border-red-500 hover:bg-zinc-800"
                }`}
              >

                {genre.name}

              </Link>

            ))}

            <Link
              href="/"
              className="px-6 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition"
            >

              Reset

            </Link>

          </div>

        </section>

        <div className="flex items-center justify-center gap-5 mt-20">

          {currentPage > 1 && (

            <Link
              href={`/?page=${currentPage - 1}${
                selectedGenre
                  ? `&genre=${selectedGenre}`
                  : ""
              }`}
              className="px-6 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-900 transition"
            >

              Previous

            </Link>

          )}

          <div className="px-6 py-3 rounded-2xl bg-zinc-900">

            Page {currentPage}

          </div>

          <Link
            href={`/?page=${currentPage + 1}${
              selectedGenre
                ? `&genre=${selectedGenre}`
                : ""
            }`}
            className="px-6 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-900 transition"
          >

            Next

          </Link>

        </div>

      </section>

    </main>
  )
}