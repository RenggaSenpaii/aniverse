"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function handleLogin() {

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      })

    setLoading(false)

    if (error) {

      alert(error.message)

      return
    }

    alert("Login success 😈🔥")

    router.push("/")
  }

  async function handleRegister() {

    setLoading(true)

    const { error } =
      await supabase.auth.signUp({
        email,
        password
      })

    setLoading(false)

    if (error) {

      alert(error.message)

      return
    }

    alert("Account created 😈🔥")
  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-4xl font-black mb-8 text-center">

          AniVerse

        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-red-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-red-500 transition"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 transition rounded-2xl py-4 font-bold disabled:opacity-50"
          >

            {loading
              ? "Loading..."
              : "Login"}

          </button>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full border border-zinc-700 hover:bg-zinc-800 transition rounded-2xl py-4 font-bold disabled:opacity-50"
          >

            Register

          </button>

        </div>

      </div>

    </main>
  )
}