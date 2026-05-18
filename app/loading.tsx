export default function Loading() {

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="animate-pulse">

          {/* Hero */}

          <div className="w-full h-[700px] rounded-3xl bg-zinc-900 mb-20" />

          {/* Header */}

          <div className="flex items-center justify-between mb-10">

            <div className="h-10 w-60 bg-zinc-900 rounded-xl" />

            <div className="h-12 w-32 bg-zinc-900 rounded-xl" />

          </div>

          {/* Cards */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {Array.from({ length: 10 }).map((_, i) => (

              <div key={i}>

                <div className="w-full h-[320px] md:h-[420px] bg-zinc-900 rounded-2xl mb-4" />

                <div className="h-5 bg-zinc-900 rounded mb-3" />

                <div className="h-4 w-20 bg-zinc-900 rounded" />

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  )
}