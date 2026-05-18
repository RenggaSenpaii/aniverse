"use client"

import { Search, Loader2, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
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

  const [query, setQuery] =
    useState("")

  const [results, setResults] =
    useState<Anime[]>([])

  const [loading, setLoading] =
    useState(false)

  const searchRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {

    const handler = setTimeout(() => {

      async function fetchAnime() {

        if (!query.trim()) {

          setResults([])
          return
        }

        setLoading(true)

        try {

          const res = await fetch(
            `https://api.jikan.moe/v4/anime?q=${query}`
          )

          const data = await res.json()

          setResults(
            data.data.slice(0, 5)
          )

        } catch {

          setResults([])

        } finally {

          setLoading(false)
        }
      }

      fetchAnime()

    }, 400)

    return () =>
      clearTimeout(handler)

  }, [query])

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {

        setResults([])
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }

  }, [])

  return (

    <div
      ref={searchRef}
      className="max-w-xl relative"
    >

      <Search
        className="absolute left-5 top-5 text-zinc-500"
        size={20}
      />

      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-14 pr-14 outline-none focus:border-red-500 transition"
      />

      {/* Loading */}

      {loading && (

        <Loader2
          className="absolute right-5 top-5 animate-spin text-zinc-500"
          size={20}
        />

      )}

      {/* Clear */}

      {!loading && query && (

        <button
          onClick={() => {

            setQuery("")
            setResults([])
          }}
          className="absolute right-5 top-5 text-zinc-500 hover:text-white transition"
        >

          <X size={20} />

        </button>

      )}

      {/* Results */}

      {results.length > 0 && (

        <div className="absolute top-16 w-full bg-black/70 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden z-50 shadow-2xl shadow-black/40">

          {results.map((anime) => (

            <Link
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              onClick={() => {

                setResults([])
                setQuery("")
              }}
              className="flex items-center gap-4 p-4 hover:bg-zinc-900 transition"
            >

              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-14 h-20 object-cover rounded-lg"
              />

              <p className="font-medium line-clamp-2">

                {anime.title}

              </p>

            </Link>

          ))}

        </div>

      )}

      {/* No Result */}

      {

        !loading &&
        query &&
        results.length === 0 && (

          <div className="absolute top-16 w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-zinc-500 z-50">

            No anime found.

          </div>

        )

      }

    </div>
  )
}