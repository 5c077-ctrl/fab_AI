export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-indigo-400 mb-4">GenioAI</h1>
      <p className="text-gray-400 text-lg mb-8">Génère des images, sites, apps et plus encore.</p>
      <a href="/generate" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition">
        Commencer →
      </a>
    </div>
  )
}