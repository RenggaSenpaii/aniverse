"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {

  const [user, setUser] =
    useState<any>(null)

  const [menuOpen, setMenuOpen] =
    useState(false)

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

    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl shadow-lg shadow-black/30">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-wide hover:text-red-500 transition"
        >

          AniVerse

        </Link>

        {/* Desktop Menu */}

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

          <Link
            href="/profile"
            className="hover:text-red-500 transition"
          >

            Profile

          </Link>

          {user ? (

            <div className="flex items-center gap-4">

              <span className="text-white text-xs">

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

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >

          ☰

        </button>

      </div>

      {/* Mobile Menu */}

      {

        menuOpen && (

          <div className="md:hidden border-t border-zinc-800 px-4 py-5 bg-black flex flex-col gap-5 text-zinc-300">

            <a href="#home">
              Home
            </a>

            <a href="#trending">
              Trending
            </a>

            <a href="#top-anime">
              Top Anime
            </a>

            <a href="#genres">
              Genres
            </a>

            <Link href="/favorites">
              Favorites
            </Link>

            {user ? (

              <>

                <span className="text-sm break-all">

                  {user.email}

                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-xl"
                >

                  Logout

                </button>

              </>

            ) : (

              <Link
                href="/login"
                className="bg-red-500 px-4 py-2 rounded-xl text-center"
              >

                Login

              </Link>

            )}

          </div>

        )

      }

    </nav>
  )
}