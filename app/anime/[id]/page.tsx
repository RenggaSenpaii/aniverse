import Link from "next/link"
import FavoriteButton from "../../../components/FavoriteButton"
import Synopsis from "../../../components/Synopsis"
import SaveContinueWatching from "../../../components/SaveContinueWatching"
import Image from "next/image"

type AnimeDetail = {
  mal_id: number

  title: string
  title_english: string
  title_japanese: string

  synopsis: string

  score: number
  scored_by: number

  rank: number
  popularity: number
  members: number
  favorites: number

  episodes: number
  status: string

  duration: string
  rating: string
  source: string
  season: string
  year: number

  type: string

  studios: {
    mal_id: number
    name: string
  }[]

  licensors: {
    mal_id: number
    name: string
  }[]

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

  voice_actors: {
    person: {
      name: string
    }

    language: string
  }[]
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

              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="rounded-3xl w-full"
                width={500}
                height={700}
                priority
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
              <div className="mt-10 grid md:grid-cols-2 gap-6">

  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">

    <h3 className="text-xl font-bold mb-5">

      Alternative Titles

    </h3>

    <div className="space-y-3 text-zinc-300">

      <p>

        <span className="text-white font-semibold">

          English:

        </span>{" "}

        {anime.title_english || "N/A"}

      </p>

      <p>

        <span className="text-white font-semibold">

          Japanese:

        </span>{" "}

        {anime.title_japanese || "N/A"}

      </p>

    </div>

  </div>

  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">

    <h3 className="text-xl font-bold mb-5">

      Statistics

    </h3>

    <div className="space-y-3 text-zinc-300">

      <p>

        <span className="text-white font-semibold">

          Rank:

        </span>{" "}

        #{anime.rank || "N/A"}

      </p>

      <p>

        <span className="text-white font-semibold">

          Popularity:

        </span>{" "}

        #{anime.popularity || "N/A"}

      </p>

      <p>

        <span className="text-white font-semibold">

          Members:

        </span>{" "}

        {anime.members?.toLocaleString()}

      </p>

      <p>

        <span className="text-white font-semibold">

          Favorites:

        </span>{" "}

        {anime.favorites?.toLocaleString()}

      </p>

    </div>

  </div>

</div>

<div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">

  <h3 className="text-xl font-bold mb-6">

    Anime Information

  </h3>

  <div className="grid md:grid-cols-2 gap-5 text-zinc-300">

    <p>

      <span className="text-white font-semibold">

        Type:

      </span>{" "}

      {anime.type || "N/A"}

    </p>

    <p>

      <span className="text-white font-semibold">

        Episodes:

      </span>{" "}

      {anime.episodes || "N/A"}

    </p>

    <p>

      <span className="text-white font-semibold">

        Status:

      </span>{" "}

      {anime.status || "N/A"}

    </p>

    <p>

      <span className="text-white font-semibold">

        Duration:

      </span>{" "}

      {anime.duration || "N/A"}

    </p>

    <p>

      <span className="text-white font-semibold">

        Rating:

      </span>{" "}

      {anime.rating || "N/A"}

    </p>

    <p>

      <span className="text-white font-semibold">

        Source:

      </span>{" "}

      {anime.source || "N/A"}

    </p>

    <p>

      <span className="text-white font-semibold">

        Season:

      </span>{" "}

      {anime.season || "N/A"} {anime.year || ""}

    </p>

    <p>

      <span className="text-white font-semibold">

        Studio:

      </span>{" "}

      {anime.studios?.[0]?.name || "N/A"}

    </p>

  </div>

</div>

<div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">

  <h3 className="text-xl font-bold mb-5">

    Available At

  </h3>

  <div className="flex flex-wrap gap-4">

    {

      anime.licensors?.length > 0 ? (

        anime.licensors.map((item) => (

          <div
            key={item.mal_id}
            className="px-5 py-3 rounded-2xl bg-black/30 border border-white/10"
          >

            {item.name}

          </div>

        ))

      ) : (

        <p className="text-zinc-400">

          No streaming/licensor information available.

        </p>

      )

    }

  </div>

</div>

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

          {/* Characters & Voice Actors */}

<section className="mt-24">

  <h2 className="text-3xl font-black mb-10">

    Characters & Voice Actors

  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">

    {characters.map((item, index) => (

      <Link
        href={`/character/${item.character.mal_id}?anime=${anime.mal_id}`}
        key={`${item.character.mal_id}-${index}`}
        className="block bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-black/20 hover:border-red-500 hover:-translate-y-2 transition duration-300"
      >

        <Image
          src={
            item.character.images.jpg.image_url
          }
          alt={item.character.name}
          className="w-full h-52 object-cover"
          width={300}
          height={300}
        />

        <div className="p-4">

          <h3 className="font-bold text-sm line-clamp-2 mb-3">

            {item.character.name}

          </h3>

          {

            item.voice_actors?.[0] && (

              <div>

                <p className="text-xs text-zinc-500 mb-1">

                  Voice Actor

                </p>

                <p className="text-sm text-red-400 line-clamp-2">

                  {
                    item.voice_actors[0]
                      .person.name
                  }

                </p>

                <p className="text-xs text-zinc-500 mt-1">

                  {
                    item.voice_actors[0]
                      .language
                  }

                </p>

              </div>

            )

          }

        </div>

      </Link>

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

                    <Image
                      src={
                        anime.entry.images.jpg.image_url
                      }
                      alt={anime.entry.title}
                      className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-300"
                      width={500}
                      height={700}
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