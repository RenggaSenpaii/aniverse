import FavoriteButton from "../../../components/FavoriteButton"

type AnimeDetail = {
  title: string
  title_english: string
  synopsis: string
  background: string
  score: number
  episodes: number
  status: string

  trailer?: {
    youtube_id?: string
  }

  images: {
    jpg: {
      large_image_url: string
    }
  }

  genres: {
    mal_id: number
    name: string
  }[]
}

async function getAnime(id: string) {

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  )

  const data = await res.json()

  return data.data
}

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const anime: AnimeDetail =
    await getAnime(id)

  const cleanSynopsis =
    anime.synopsis
      ?.replace("[Written by MAL Rewrite]", "")
      .trim()

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-14 items-start">

          <div>

            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="rounded-3xl w-full"
            />

          </div>

          <div>

            <h1 className="text-5xl font-black mb-6">

              {anime.title_english || anime.title}

            </h1>

            <div className="flex items-center gap-4 mb-8 text-zinc-300 flex-wrap">

              <span>
                ⭐ {anime.score || "N/A"}
              </span>

              <span>
                Episodes: {anime.episodes || "?"}
              </span>

              <span>
                {anime.status}
              </span>

            </div>

            <div className="flex flex-wrap gap-3 mb-8">

              {anime.genres.map((genre) => (

                <div
                  key={genre.mal_id}
                  className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-sm"
                >

                  {genre.name}

                </div>

              ))}

            </div>

            <div className="mb-8">

              <FavoriteButton
                animeId={Number(id)}
                title={anime.title}
                image={anime.images.jpg.large_image_url}
              />

            </div>

            <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line">

              {cleanSynopsis || "No synopsis available."}

            </p>

          </div>

        </div>

        {

          anime.trailer?.youtube_id ? (

            <div className="mt-20">

              <h2 className="text-3xl font-black mb-6">
                Trailer
              </h2>

              <iframe
                className="w-full aspect-video rounded-3xl"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title="Anime Trailer"
                allowFullScreen
              />

            </div>

          ) : (

            <div className="mt-20 text-zinc-500">

              Trailer not available.

            </div>

          )

        }

      </div>

    </main>
  )
}