"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"


export default function FavoritesPage() {

  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {

    async function loadFavorites() {

      const {
        data: userData
      } = await supabase.auth.getUser()

      if (!userData.user) return

      const {
        data
      } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userData.user.id)

      setFavorites(data || [])
    }

    loadFavorites()

  }, [])

  return (

    <main className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-14">
          Your Favorites ❤️
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

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
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-300"
                />

              </div>

              <h2 className="font-semibold group-hover:text-red-400 transition">

                {anime.title}

              </h2>

            </Link>

          ))}

        </div>

      </div>

    </main>
  )
}