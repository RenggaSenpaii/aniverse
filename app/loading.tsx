export default function Loading() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glow */}

      <div className="fixed inset-0 bg-red-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 relative z-10">

        {/* Logo */}

        <div className="flex items-center justify-center mb-14">

          <h1 className="text-4xl md:text-6xl font-black tracking-widest animate-pulse">

            AniVerse

          </h1>

        </div>

        <div className="animate-pulse">

          {/* Hero */}

          <div className="relative overflow-hidden w-full h-[700px] rounded-[40px] bg-zinc-900 mb-20">

            <div className="absolute inset-0 shimmer" />

          </div>

          {/* Header */}

          <div className="flex items-center justify-between mb-10">

            <div className="h-10 w-60 bg-zinc-900 rounded-xl" />

            <div className="h-12 w-32 bg-zinc-900 rounded-xl" />

          </div>

          {/* Cards */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {Array.from({ length: 10 }).map((_, i) => (

              <div key={i}>

                <div className="relative overflow-hidden w-full h-[320px] md:h-[420px] bg-zinc-900 rounded-3xl mb-4">

                  <div className="absolute inset-0 shimmer" />

                </div>

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