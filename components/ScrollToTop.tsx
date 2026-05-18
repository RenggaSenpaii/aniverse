"use client"

import { useEffect, useState } from "react"

export default function ScrollToTop() {

  const [visible, setVisible] =
    useState(false)

  useEffect(() => {

    function handleScroll() {

      if (window.scrollY > 400) {

        setVisible(true)

      } else {

        setVisible(false)
      }
    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      )
    }

  }, [])

  function scrollTop() {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (

    <>

      {visible && (

        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 shadow-2xl shadow-red-500/30 text-white w-14 h-14 rounded-full text-2xl font-bold transition duration-300 hover:scale-110"
        >

          ↑

        </button>

      )}

    </>

  )
}