"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

type Favorite = {
  id: number
  anime_id: number
  title: string
  image: string
}

type ContinueWatching = {
  mal_id: number
  title: string
  image: string
}

export default function ProfilePage() {

  const [user, setUser] =
    useState<any>(null)

  const [favorites, setFavorites] =
    useState<Favorite[]>([])

  const [continueWatching, setContinueWatching] =
    useState<ContinueWatching[]>([])

  useEffect(() => {

    async function loadData() {

      const {
        data: userData
      } = await supabase.auth.getUser()

      if (!userData.user) return

      setUser(userData.user)

      const {
        data: favoritesData
      } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userData.user.id)

      setFavorites(favoritesData || [])

      const stored =
        localStorage.getItem(
          "continueWatching"
        )

      if (stored) {

        setContinueWatching(
          JSON.parse(stored)
        )
      }
    }

    loadData()

  }, [])

  if (!user) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-4xl font-black mb-6">

            Login Required

          </h1>

          <p className="text-zinc-400 mb-8">

            Please login first to view your profile.

          </p>

          <Link
            href="/login"
            className="bg-red-500 hover:bg-red-600 px-6 py-4 rounded-2xl font-semibold transition"
          >

            Login

          </Link>

        </div>

      </main>

    )
  }

  return (

    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-10">

      <div className="max-w-7xl mx-auto">
        <Link
            href="/"
            className="inline-flex items-center gap-3 mb-10 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 px-5 py-3 rounded-2xl transition duration-300 shadow-lg shadow-black/20"
        >

            ← Back to Home

        </Link>

        {/* Header */}

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 mb-16 shadow-2xl shadow-black/30">

          <h1 className="text-4xl md:text-5xl font-black mb-4">

            Your Profile

          </h1>

          <p className="text-zinc-400 text-lg break-all mb-10">

            {user.email}

          </p>

          <div className="flex flex-wrap gap-5">

            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-5 rounded-3xl min-w-[180px] shadow-xl shadow-black/20">

              <p className="text-zinc-500 mb-2">

                Favorites

              </p>

              <h3 className="text-3xl font-black text-red-500">

                {favorites.length}

              </h3>

            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-5 rounded-3xl min-w-[180px] shadow-xl shadow-black/20">

              <p className="text-zinc-500 mb-2">

                Continue Watching

              </p>

              <h3 className="text-3xl font-black text-yellow-400">

                {continueWatching.length}

              </h3>

            </div>

          </div>

        </div>

        {/* Continue Watching */}

        {

          continueWatching.length > 0 && (

            <section className="mb-20">

              <h2 className="text-3xl font-black mb-10">

                Continue Watching

              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

                {continueWatching.map((anime) => (

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

                    <h3 className="font-semibold line-clamp-2 group-hover:text-red-400 transition">

                      {anime.title}

                    </h3>

                  </Link>

                ))}

              </div>

            </section>

          )

        }

        {/* Favorites */}

        <section>

          <h2 className="text-3xl font-black mb-10">

            Your Favorites ❤️

          </h2>

          {

            favorites.length === 0 ? (

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-500">

                No favorites yet.

              </div>

            ) : (

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

                {favorites.map((anime) => (

                  <Link
                    href={`/anime/${anime.anime_id}`}
                    key={anime.id}
                    className="group"
                  >

                    <div className="overflow-hidden rounded-2xl mb-4 bg-zinc-900">

                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-105 transition duration-300"
                      />

                    </div>

                    <h3 className="font-semibold line-clamp-2 group-hover:text-red-400 transition">

                      {anime.title}

                    </h3>

                  </Link>

                ))}

              </div>

            )

          }

        </section>

      </div>

    </main>
  )
}