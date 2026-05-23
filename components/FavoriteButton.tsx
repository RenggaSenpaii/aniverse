"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import {toast} from "sonner"

export default function FavoriteButton({
  animeId,
  title,
  image,
}: {
  animeId: number
  title: string
  image: string
}) {

  const [user, setUser] = useState<any>(null)
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {

    async function load() {

      const {
        data: userData
      } = await supabase.auth.getUser()

      setUser(userData.user)

      if (!userData.user) return

      const {
        data
      } = await supabase
        .from("favorites")
        .select("id")
        .eq("anime_id", animeId)
        .eq("user_id", userData.user.id)
        .single()

      if (data) {
        setFavorited(true)
      }
    }

    load()

  }, [animeId])

  async function toggleFavorite() {

    if (!user) {
      toast.error("Login first !")
      return
    }

    if (favorited) {

      await supabase
        .from("favorites")
        .delete()
        .eq("anime_id", animeId)
        .eq("user_id", user.id)

      setFavorited(false)

    } else {

      await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          anime_id: animeId,
          title,
          image
        })

      setFavorited(true)
    }
  }

  return (

    <button
      onClick={toggleFavorite}
      className={`px-5 py-3 rounded-2xl font-bold transition ${favorited
        ? "bg-red-500 hover:bg-red-600"
        : "bg-zinc-800 hover:bg-zinc-700"
      }`}
    >

      {favorited ? "❤️ Favorited" : "🤍 Favorite"}

    </button>
  )
}