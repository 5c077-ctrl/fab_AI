export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">À Propos</h1>
        <p className="text-gray-400 mb-10">GenioAI — Plateforme IA Générative Multi-domaines</p>

        {/* Description */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">🚀 Le projet</h2>
          <p className="text-gray-300 leading-relaxed">
            GenioAI est une plateforme web fullstack capable de générer automatiquement
            des images, sites web, applications, interfaces et contenus textuels
            à partir d'une simple description. Elle utilise l'IA de Google Gemini
            pour la génération de texte et code, et Pollinations.ai pour les images.
          </p>
        </div>

        {/* Stack */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">🛠️ Stack technique</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Frontend",    value: "React.js + Tailwind CSS" },
              { label: "Backend",     value: "Node.js + Express.js" },
              { label: "Base de données", value: "PostgreSQL" },
              { label: "IA Texte",    value: "Google Gemini API" },
              { label: "IA Images",   value: "Pollinations.ai" },
              { label: "Versioning",  value: "GitHub" },
            ].map(item => (
              <div key={item.label} className="bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-indigo-400 mb-1">{item.label}</p>
                <p className="text-white text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">✨ Fonctionnalités</h2>
          <ul className="flex flex-col gap-2">
            {[
              "Génération d'images par description",
              "Génération de sites web HTML complets",
              "Génération d'applications et interfaces",
              "Génération de mini-jeux",
              "Mode Online (IA réelle) + Mode Simulation (offline)",
              "Historique persistant avec PostgreSQL",
              "Dashboard avec statistiques",
              "Interface responsive mobile/desktop",
            ].map(f => (
              <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-indigo-400">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">🐙 GitHub</h2>
          <p className="text-gray-300 text-sm mb-4">
            Le code source complet est disponible sur GitHub.
          </p>
          <a
            href="https://github.com/TON_USERNAME/genioai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium transition"
          >
            Voir le repo GitHub →
          </a>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="/generate"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            ✨ Essayer GenioAI
          </a>
        </div>
      </div>
    </div>
  )
}