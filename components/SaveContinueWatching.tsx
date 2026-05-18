"use client"

import { useEffect } from "react"

export default function SaveContinueWatching({
  anime,
}: {
  anime: {
    mal_id: number
    title: string
    image: string
  }
}) {

  useEffect(() => {

    const stored =
      localStorage.getItem(
        "continueWatching"
      )

    let animeList = stored
      ? JSON.parse(stored)
      : []

    animeList = animeList.filter(
      (item: any) =>
        item.mal_id !== anime.mal_id
    )

    animeList.unshift(anime)

    animeList = animeList.slice(0, 10)

    localStorage.setItem(
      "continueWatching",
      JSON.stringify(animeList)
    )

  }, [anime])

  return null
}