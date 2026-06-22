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

export default function Dashboard() {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const res = await axios.get("http://localhost:3001/api/history")
      const data = res.data

      // Calculs stats
      const total = data.length
      const online = data.filter(g => g.mode === "online").length
      const offline = data.filter(g => g.mode === "offline").length

      // Par domaine
      const byDomain = {}
      data.forEach(g => {
        byDomain[g.domain] = (byDomain[g.domain] || 0) + 1
      })

      // Dernière génération
      const last = data[0] || null

      setStats({ total, online, offline, byDomain, last })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-gray-400">⏳ Chargement...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Statistiques de tes générations.</p>

        {/* Cartes stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total générations" value={stats.total} icon="✨" color="indigo" />
          <StatCard label="Mode Online" value={stats.online} icon="🟢" color="green" />
          <StatCard label="Mode Simulation" value={stats.offline} icon="🟡" color="yellow" />
        </div>

        {/* Par domaine */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">📊 Générations par domaine</h2>
          {Object.keys(stats.byDomain).length === 0 ? (
            <p className="text-gray-500">Aucune donnée disponible.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {Object.entries(stats.byDomain)
                .sort((a, b) => b[1] - a[1])
                .map(([domain, count]) => (
                  <div key={domain}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">
                        {DOMAIN_LABELS[domain] || domain}
                      </span>
                      <span className="text-indigo-400 font-bold">{count}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Dernière génération */}
        {stats.last && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-3">🕐 Dernière génération</h2>
            <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded-full">
              {DOMAIN_LABELS[stats.last.domain] || stats.last.domain}
            </span>
            <p className="text-gray-300 mt-3">{stats.last.prompt}</p>
            <p className="text-gray-500 text-xs mt-2">
              {new Date(stats.last.created_at).toLocaleString("fr-FR")}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 text-center">
          <a
            href="/generate"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            ✨ Nouvelle génération
          </a>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    indigo: "border-indigo-700 bg-indigo-900/20",
    green:  "border-green-700 bg-green-900/20",
    yellow: "border-yellow-700 bg-yellow-900/20",
  }
  return (
    <div className={`border rounded-xl p-5 ${colors[color]}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  )
}