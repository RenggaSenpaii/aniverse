"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Anime = {
  mal_id: number
  title: string
  image: string
}

export default function ContinueWatching() {

  const [animeList, setAnimeList] =
    useState<Anime[]>([])

  useEffect(() => {

    const stored =
      localStorage.getItem(
        "continueWatching"
      )

    if (stored) {

      setAnimeList(JSON.parse(stored))
    }

  }, [])

  if (animeList.length === 0) {
    return null
  }

  return (

    <section className="mb-24">

      <h3 className="text-3xl font-bold mb-10">

        Continue Watching

      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {animeList.map((anime) => (

          <Link
            href={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="group"
          >

            <div className="overflow-hidden rounded-2xl mb-4 bg-zinc-900">

              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-105 transition duration-300"
              />

            </div>

            <h4 className="font-semibold line-clamp-2 group-hover:text-red-400 transition">

              {anime.title}

            </h4>

          </Link>

        ))}

      </div>

    </section>
  )
}