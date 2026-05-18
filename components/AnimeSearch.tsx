"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

type Anime = {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
    }
  }
}

export default function AnimeSearch() {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Anime[]>([])

  async function searchAnime(value: string) {

    setQuery(value)

    if (!value) {
      setResults([])
      return
    }

    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${value}`
    )

    const data = await res.json()

    setResults(data.data.slice(0, 5))
  }

  return (

    <div className="max-w-xl relative">

      <Search
        className="absolute left-5 top-5 text-zinc-500"
        size={20}
      />

      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) =>
          searchAnime(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-white transition"
      />

      {results.length > 0 && (

        <div className="absolute top-16 w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden z-50">

          {results.map((anime) => (

            <Link
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="flex items-center gap-4 p-4 hover:bg-zinc-900 transition"
            >

              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-14 h-20 object-cover rounded-lg"
              />

              <p className="font-medium">

                {anime.title}

              </p>

            </Link>

          ))}

        </div>

      )}

    </div>
  )
}