import Link from "next/link"
import AnimeSearch from "../components/AnimeSearch"
import Navbar from "../components/Navbar"
import ContinueWatching from "../components/ContinueWatching"
import MotionWrapper from "../components/MotionWrapper"

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
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 36, name: "Slice of Life" },
  { id: 40, name: "Psychological" },
  { id: 37, name: "Supernatural" }
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

async function getSeasonNow() {

  const res = await fetch(
    "https://api.jikan.moe/v4/seasons/now"
  )

  const data = await res.json()

  return data.data.slice(0, 10)
}

async function getUpcomingAnime() {

  const res = await fetch(
    "https://api.jikan.moe/v4/seasons/upcoming"
  )

  const data = await res.json()

  return data.data.slice(0, 10)
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

  const seasonNow: Anime[] =
    await getSeasonNow()

  const upcomingAnime: Anime[] =
    await getUpcomingAnime()

  const featuredAnime =
    animeList[0]

  return (

    <main className="min-h-screen bg-black text-white scroll-smooth">

      <Navbar />

      <section
        id="home"
        className="max-w-7xl mx-auto px-4 md:px-6 py-10"
      >

        {featuredAnime && (

          <div className="relative min-h-[700px] rounded-[40px] mb-20 overflow-hidden border border-white/10 shadow-2xl shadow-black/50">

            <img
              src={featuredAnime.images.jpg.large_image_url}
              alt={featuredAnime.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30 backdrop-blur-[2px]" />

            <div className="relative z-10 flex items-center min-h-[700px] animate-fade-in px-6 md:px-14 py-20">

              <div className="max-w-3xl">

                <p className="text-red-500 font-semibold tracking-[0.3em] uppercase mb-5">

                  Featured Anime

                </p>

                <h2 className="text-4xl md:text-7xl font-black leading-tight mb-8 break-words">

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

        {/* Trending */}

        <MotionWrapper>

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

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">

            {animeList.map((anime) => (

              <Link
                href={`/anime/${anime.mal_id}`}
                key={anime.mal_id}
                className="group transition duration-300 hover:scale-[1.03]"
              >

                <div className="overflow-hidden rounded-3xl mb-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30 group-hover:shadow-red-500/20 transition duration-500 group-hover:shadow-red-500/20 transition duration-300">

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

        </MotionWrapper>

        {/* Continue Watching */}

        <MotionWrapper>

          <ContinueWatching />

        </MotionWrapper>

        {/* Currently Airing */}

        <MotionWrapper>

          <section className="mb-24">

            <h3 className="text-3xl font-bold mb-10">

              Currently Airing

            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

              {seasonNow.map((anime) => (

                <Link
                  href={`/anime/${anime.mal_id}`}
                  key={anime.mal_id}
                  className="group transition duration-300 hover:scale-[1.03]"
                >

                  <div className="overflow-hidden rounded-3xl mb-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30 group-hover:shadow-red-500/20 transition duration-500">

                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-105 transition duration-300"
                    />

                  </div>

                  <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-red-400 transition">

                    {anime.title}

                  </h4>

                </Link>

              ))}

            </div>

          </section>

        </MotionWrapper>
                {/* Upcoming Anime */}

        <MotionWrapper>

          <section className="mb-24">

            <h3 className="text-3xl font-bold mb-10">

              Upcoming Anime

            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

              {upcomingAnime.map((anime) => (

                <Link
                  href={`/anime/${anime.mal_id}`}
                  key={anime.mal_id}
                  className="group transition duration-300 hover:scale-[1.03]"
                >

                  <div className="overflow-hidden rounded-3xl mb-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30 group-hover:shadow-red-500/20 transition duration-500">

                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-105 transition duration-300"
                    />

                  </div>

                  <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-red-400 transition">

                    {anime.title}

                  </h4>

                </Link>

              ))}

            </div>

          </section>

        </MotionWrapper>

      </section>

    </main>
  )
}