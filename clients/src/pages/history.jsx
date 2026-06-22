import { useState, useEffect } from "react"
import axios from "axios"

const DOMAIN_LABELS = {
  image:     "🖼️ Image",
  site:      "🌐 Site Web",
  app:       "📱 Application",
  jeu:       "🎮 Jeu",
  interface: "💬 Interface",
  texte:     "📝 Texte",
}

export default function History() {
  const [generations, setGenerations] = useState([])
  const [loading, setLoading]         = useState(true)
  const [filter, setFilter]           = useState("")
  const [selected, setSelected]       = useState(null)

  useEffect(() => {
    fetchHistory()
  }, [filter])

  async function fetchHistory() {
    setLoading(true)
    try {
      const url = filter
        ? `http://localhost:3001/api/history?domain=${filter}`
        : `http://localhost:3001/api/history`
      const res = await axios.get(url)
      setGenerations(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString("fr-FR")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">Historique</h1>
        <p className="text-gray-400 mb-6">Toutes tes générations sauvegardées.</p>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Tous
          </button>
          {Object.entries(DOMAIN_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === id ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-center text-gray-400 py-20">⏳ Chargement...</div>
        ) : generations.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-5xl mb-4">📭</p>
            <p>Aucune génération trouvée.</p>
            <a href="/generate" className="text-indigo-400 hover:underline mt-2 inline-block">
              Faire une génération →
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {generations.map(g => (
              <div
                key={g.id}
                onClick={() => setSelected(selected?.id === g.id ? null : g)}
                className="bg-gray-900 border border-gray-700 hover:border-indigo-500 rounded-xl p-4 cursor-pointer transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded-full mr-2">
                      {DOMAIN_LABELS[g.domain] || g.domain}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      g.mode === "online"
                        ? "bg-green-900 text-green-300"
                        : "bg-yellow-900 text-yellow-300"
                    }`}>
                      {g.mode === "online" ? "🟢 Online" : "🟡 Simulation"}
                    </span>
                    <p className="text-gray-200 mt-2 font-medium truncate">{g.prompt}</p>
                  </div>
                  <p className="text-gray-500 text-xs ml-4 whitespace-nowrap">
                    {formatDate(g.created_at)}
                  </p>
                </div>

                {/* Détail expandable */}
                {selected?.id === g.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-2">Résultat :</p>
                    {g.domain === "image" ? (
                      <img src={g.result} alt="générée" className="w-full rounded-xl" />
                    ) : (
                      <pre className="text-gray-300 text-sm whitespace-pre-wrap bg-gray-800 p-3 rounded-lg max-h-60 overflow-y-auto">
                        {g.result}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}