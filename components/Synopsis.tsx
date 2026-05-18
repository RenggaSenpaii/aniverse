"use client"

import { useState } from "react"

export default function Synopsis({
  text,
}: {
  text: string
}) {

  const [expanded, setExpanded] =
    useState(false)

  return (

    <div className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line">

      <p
        className={`transition-all duration-300 ${
          expanded
            ? ""
            : "line-clamp-6"
        }`}
      >

        {text}

      </p>

      <button
        onClick={() =>
          setExpanded(!expanded)
        }
        className="mt-4 text-red-500 hover:text-red-400 font-semibold transition"
      >

        {expanded
          ? "Show Less"
          : "Read More"}

      </button>

    </div>

  )
}