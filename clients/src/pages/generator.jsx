import { useState } from "react"
import axios from "axios"

const DOMAINS = [
  { id: "image",     label: "🖼️ Image",       desc: "Génère une image" },
  { id: "site",      label: "🌐 Site Web",     desc: "Génère un site HTML" },
  { id: "app",       label: "📱 Application",  desc: "Génère une app" },
  { id: "jeu",       label: "🎮 Jeu",          desc: "Génère un mini-jeu" },
  { id: "interface", label: "💬 Interface",    desc: "Clone une UI" },
  { id: "texte",     label: "📝 Texte",        desc: "Génère du contenu" },
]

export default function Generator() {
  const [domain, setDomain]   = useState("")
  const [prompt, setPrompt]   = useState("")
  const [result, setResult]   = useState(null)
  const [mode, setMode]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function handleGenerate() {
    if (!domain || !prompt.trim()) {
      setError("Choisis un domaine et entre une description !")
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)

    try {
      const res = await axios.post("http://localhost:3001/api/generate", {
        domain,
        prompt
      })
      setResult(res.data.result)
      setMode(res.data.mode)
    } catch (err) {
      setError("Erreur serveur. Vérifie que le backend tourne.")
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
    alert("Copié !")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-indigo-400 text-sm hover:underline">← Accueil</a>
        <h1 className="text-4xl font-bold text-indigo-400 mt-4 mb-2">Générateur IA</h1>
        <p className="text-gray-400 mb-8">Décris ce que tu veux, l'IA le génère.</p>

        {/* Choix du domaine */}
        <h2 className="text-lg font-semibold mb-3 text-gray-200">1. Choisis un domaine</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {DOMAINS.map(d => (
            <button
              key={d.id}
              onClick={() => setDomain(d.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                domain === d.id
                  ? "border-indigo-500 bg-indigo-900/40"
                  : "border-gray-700 bg-gray-900 hover:border-indigo-600"
              }`}
            >
              <div className="text-xl mb-1">{d.label}</div>
              <div className="text-xs text-gray-400">{d.desc}</div>
            </button>
          ))}
        </div>

        {/* Prompt */}
        <h2 className="text-lg font-semibold mb-3 text-gray-200">2. Décris ta demande</h2>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ex: Un site de vente de chaussures avec fond noir et boutons dorés..."
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none mb-4"
        />

        {/* Erreur */}
        {error && (
          <div className="bg-red-900/40 border border-red-500 text-red-300 rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        {/* Bouton */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-lg transition mb-8"
        >
          {loading ? "⏳ Génération en cours..." : "✨ Générer"}
        </button>

        {/* Résultat */}
        {result && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-200">Résultat</h2>
              <div className="flex gap-2 items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  mode === "online"
                    ? "bg-green-900 text-green-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}>
                  {mode === "online" ? "🟢 Online" : "🟡 Simulation"}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg"
                >
                  📋 Copier
                </button>
              </div>
            </div>

            {/* Affichage image ou texte */}
            {domain === "image" ? (
              <img
                src={result}
                alt="Image générée"
                className="w-full rounded-xl"
              />
            ) : (
              <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                {result}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}