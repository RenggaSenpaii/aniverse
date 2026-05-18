export default function Loading() {

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        <div className="animate-pulse">

          <div className="h-14 w-48 bg-zinc-900 rounded-2xl mb-10" />

          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Poster */}

            <div className="w-full h-[700px] bg-zinc-900 rounded-3xl" />

            {/* Detail */}

            <div>

              <div className="h-14 w-3/4 bg-zinc-900 rounded-xl mb-8" />

              <div className="flex gap-4 mb-8">

                <div className="h-10 w-24 bg-zinc-900 rounded-xl" />

                <div className="h-10 w-24 bg-zinc-900 rounded-xl" />

                <div className="h-10 w-24 bg-zinc-900 rounded-xl" />

              </div>

              <div className="flex flex-wrap gap-3 mb-8">

                {Array.from({ length: 4 }).map((_, i) => (

                  <div
                    key={i}
                    className="h-10 w-24 bg-zinc-900 rounded-full"
                  />

                ))}

              </div>

              <div className="h-14 w-40 bg-zinc-900 rounded-2xl mb-10" />

              <div className="space-y-4">

                <div className="h-5 bg-zinc-900 rounded" />
                <div className="h-5 bg-zinc-900 rounded" />
                <div className="h-5 w-5/6 bg-zinc-900 rounded" />
                <div className="h-5 w-4/6 bg-zinc-900 rounded" />

              </div>

            </div>

          </div>

          {/* Trailer */}

          <div className="mt-20">

            <div className="h-10 w-48 bg-zinc-900 rounded-xl mb-6" />

            <div className="w-full aspect-video bg-zinc-900 rounded-3xl" />

          </div>

        </div>

      </div>

    </main>
  )
}