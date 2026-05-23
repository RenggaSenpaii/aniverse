import Image from "next/image"
import Link from "next/link"

type Props = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    anime?: string
  }>
}

async function getCharacter(id: string) {

  const res = await fetch(
    `https://api.jikan.moe/v4/characters/${id}/full`
  )

  const data = await res.json()

  return data.data
}

export default async function CharacterPage({
  params,
  searchParams
}: Props) {

  const { id } = await params

  const character =
    await getCharacter(id)

  const query = await searchParams

  const animeId = query.anime

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}

      <div className="fixed inset-0 z-0">

        <Image
          src={character.images.jpg.image_url}
          alt={character.name}
          fill
          className="object-cover opacity-10 blur-3xl scale-110"
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-[350px_1fr] gap-14 items-start">

          {/* Character Image */}

          <div className="sticky top-10">

            <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">

              <Image
                src={character.images.jpg.image_url}
                alt={character.name}
                width={500}
                height={700}
                className="w-full object-cover"
              />

            </div>

          </div>

          {/* Character Info */}

          <div>

            <Link
                href={animeId ? `/anime/${animeId}` : "/"}
                className="inline-flex items-center gap-2 mb-10 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-red-500 hover:bg-white/10 transition duration-300"
                >
                ← Back
            </Link>

            <p className="uppercase tracking-[0.3em] text-red-500 text-sm mb-5">

              Character Profile

            </p>

            <h1 className="text-5xl md:text-7xl font-black mb-8">

              {character.name}

            </h1>

            {/* Favorites */}

            <div className="flex items-center gap-4 mb-10">

              <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-5 py-3 rounded-2xl backdrop-blur-md">

                ❤️ {character.favorites.toLocaleString()} Favorites

              </div>

            </div>

            {/* About */}

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[30px] p-8 shadow-xl shadow-black/30">

              <h2 className="text-2xl font-bold mb-6">

                About

              </h2>

              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">

                {character.about}

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  )

}