"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

type Props = {
  anime: {
    mal_id: number
    title: string
    images: {
      jpg: {
        image_url: string
      }
    }
    trailer?: {
      youtube_id?: string
    }
  }
}

export default function HoverTrailerCard({
  anime,
}: Props) {

  const [hovered, setHovered] =
    useState(false)

  return (

    <motion.div
      whileHover={{
        scale: 1.04,
      }}
      transition={{
        duration: 0.25,
      }}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
      className="relative"
    >

      <Link
        href={`/anime/${anime.mal_id}`}
        className="group block"
      >

        <div className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30">

          {

            hovered &&
            anime.trailer?.youtube_id ? (

              <iframe
                className="w-full h-[320px] md:h-[420px]"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}?autoplay=1&mute=1&controls=0`}
                title={anime.title}
                allow="autoplay"
              />

            ) : (

              <Image
                src={
                  anime.images.jpg.image_url
                }
                alt={anime.title}
                width={500}
                height={700}
                className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />

            )

          }

        </div>

        <div className="mt-4">

          <h3 className="font-semibold line-clamp-2 group-hover:text-red-400 transition">

            {anime.title}

          </h3>

        </div>

      </Link>

    </motion.div>

  )
}