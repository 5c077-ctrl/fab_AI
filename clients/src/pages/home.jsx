export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-indigo-900/40 border border-indigo-700 text-indigo-300 text-sm px-4 py-2 rounded-full mb-6">
          ✨ Propulsé par Google Gemini + Pollinations.ai
        </div>
        <h1 className="text-6xl font-bold mb-6">
          Génère tout avec <span className="text-indigo-400">GenioAI</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          Images, sites web, applications, jeux, interfaces — décris ce que tu veux,
          l'IA le génère instantanément.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/generate"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            ✨ Commencer →
          </a>
          <a
            href="/about"
            className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            En savoir plus
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-8">
          Que peut générer GenioAI ?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "🖼️", label: "Images",       desc: "Génère des visuels par description" },
            { icon: "🌐", label: "Sites Web",     desc: "Code HTML/CSS complet" },
            { icon: "📱", label: "Applications",  desc: "Structure d'apps mobiles" },
            { icon: "🎮", label: "Jeux",          desc: "Mini-jeux HTML5" },
            { icon: "💬", label: "Interfaces",    desc: "Clone d'UI (WhatsApp, etc.)" },
            { icon: "📝", label: "Textes",        desc: "Articles, scripts, contenus" },
          ].map(f => (
            <div
              key={f.label}
              className="bg-gray-900 border border-gray-700 hover:border-indigo-500 rounded-xl p-5 transition"
            >
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-semibold text-white mb-1">{f.label}</div>
              <div className="text-gray-400 text-sm">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}