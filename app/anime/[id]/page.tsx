import Link from "next/link"
import FavoriteButton from "../../../components/FavoriteButton"
import Synopsis from "../../../components/Synopsis"
import SaveContinueWatching from "../../../components/SaveContinueWatching"

type AnimeDetail = {
  mal_id: number
  title: string
  title_english: string
  synopsis: string
  score: number
  episodes: number
  status: string

  trailer?: {
    youtube_id?: string
  }

  images: {
    jpg: {
      large_image_url: string
      image_url: string
    }
  }

  genres: {
    mal_id: number
    name: string
  }[]
}

type Character = {
  character: {
    mal_id: number
    name: string
    images: {
      jpg: {
        image_url: string
      }
    }
  }
}

type Recommendation = {
  entry: {
    mal_id: number
    title: string
    images: {
      jpg: {
        image_url: string
      }
    }
  }
}

type Review = {
  user: {
    username: string
  }
  review: string
  score: number
}

async function getAnime(id: string) {

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}`
  )

  const data = await res.json()

  return data.data
}

async function getCharacters(id: string) {

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/characters`
  )

  const data = await res.json()

  return data.data?.slice(0, 8) || []
}

async function getRecommendations(id: string) {

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/recommendations`
  )

  const data = await res.json()

  return data.data?.slice(0, 10) || []
}

async function getReviews(id: string) {

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/reviews`
  )

  const data = await res.json()

  return data.data?.slice(0, 5) || []
}

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const anime: AnimeDetail =
    await getAnime(id)

  const characters: Character[] =
    await getCharacters(id)

  const recommendations: Recommendation[] =
    await getRecommendations(id)

  const reviews: Review[] =
    await getReviews(id)

  const cleanSynopsis =
    anime.synopsis
      ?.replace("[Written by MAL Rewrite]", "")
      .trim()

  return (

    <>

      <SaveContinueWatching
        anime={{
          mal_id: anime.mal_id,
          title: anime.title,
          image:
            anime.images.jpg.large_image_url,
        }}
      />

      <main className="min-h-screen bg-black text-white">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-5 py-3 rounded-2xl transition"
          >

            ← Back to Home

          </Link>

          <div className="grid md:grid-cols-2 gap-14 items-start">

            <div>

              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="rounded-3xl w-full"
              />

            </div>

            <div>

              <h1 className="text-3xl md:text-5xl font-black mb-6">

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

              <Synopsis
                text={
                  cleanSynopsis ||
                  "No synopsis available."
                }
              />

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

          {/* Characters */}

          <section className="mt-24">

            <h2 className="text-3xl font-black mb-10">

              Characters

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">

              {characters.map((item, index) => (

                <div
                  key={`${item.character.mal_id}-${index}`}
                  className="text-center"
                >

                  <img
                    src={
                      item.character.images.jpg.image_url
                    }
                    alt={item.character.name}
                    className="w-full h-40 object-cover rounded-2xl mb-3"
                  />

                  <p className="text-sm font-medium line-clamp-2">

                    {item.character.name}

                  </p>

                </div>

              ))}

            </div>

          </section>

          {/* Recommendations */}

          <section className="mt-24">

            <h2 className="text-3xl font-black mb-10">

              You May Also Like

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

              {recommendations.map((anime, index) => (

                <Link
                  href={`/anime/${anime.entry.mal_id}`}
                  key={`${anime.entry.mal_id}-${index}`}
                  className="group"
                >

                  <div className="overflow-hidden rounded-2xl mb-4 bg-zinc-900">

                    <img
                      src={
                        anime.entry.images.jpg.image_url
                      }
                      alt={anime.entry.title}
                      className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-300"
                    />

                  </div>

                  <h3 className="font-semibold line-clamp-2 group-hover:text-red-400 transition">

                    {anime.entry.title}

                  </h3>

                </Link>

              ))}

            </div>

          </section>

          {/* Reviews */}

          <section className="mt-24">

            <h2 className="text-3xl font-black mb-10">

              User Reviews

            </h2>

            <div className="space-y-8">

              {reviews.map((review, index) => (

                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
                >

                  <div className="flex items-center justify-between mb-5">

                    <h3 className="font-bold text-lg text-red-400">

                      @{review.user.username}

                    </h3>

                    <div className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold">

                      ⭐ {review.score || "N/A"}

                    </div>

                  </div>

                  <p className="text-zinc-400 leading-relaxed line-clamp-6">

                    {review.review}

                  </p>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

    </>
  )
}