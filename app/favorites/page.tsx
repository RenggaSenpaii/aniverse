"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"
import Image from "next/image"


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
        <Link
          href="/"
          className="inline-flex items-center gap-3 mb-10 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 px-5 py-3 rounded-2xl transition duration-300 shadow-lg shadow-black/20"
        >

          ← Back to Home

        </Link>

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

                <Image
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-300"
                  width={500}
                  height={700}
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