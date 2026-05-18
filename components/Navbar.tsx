"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {

  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {

    async function getUser() {

      const {
        data
      } = await supabase.auth.getUser()

      setUser(data.user)
    }

    getUser()

  }, [])

  async function handleLogout() {

    await supabase.auth.signOut()

    location.reload()
  }

  return (

    <nav className="border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-xl z-50">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="text-3xl font-bold tracking-wide hover:text-red-500 transition"
        >

          AniVerse

        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">

          <a
            href="#home"
            className="hover:text-white transition"
          >
            Home
          </a>

          <a
            href="#trending"
            className="hover:text-white transition"
          >
            Trending
          </a>

          <a
            href="#top-anime"
            className="hover:text-white transition"
          >
            Top Anime
          </a>

          <a
            href="#genres"
            className="hover:text-white transition"
          >
            Genres
          </a>

          <Link
            href="/favorites"
            className="hover:text-red-500 transition"
          >
            Favorites
          </Link>

          {user ? (

            <div className="flex items-center gap-4">

              <span className="text-white">

                {user.email}

              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-xl text-white hover:bg-red-600 transition"
              >

                Logout

              </button>

            </div>

          ) : (

            <Link
              href="/login"
              className="bg-red-500 px-5 py-2 rounded-xl text-white hover:bg-red-600 transition"
            >

              Login

            </Link>

          )}

        </div>

      </div>

    </nav>
  )
}