import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const LINKS = [
  { path: "/",          label: "🏠 Accueil" },
  { path: "/generate",  label: "✨ Générateur" },
  { path: "/history",   label: "📋 Historique" },
  { path: "/dashboard", label: "📊 Dashboard" },
  { path: "/about",     label: "ℹ️ À Propos" },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-400 tracking-tight">
          Genio<span className="text-white">AI</span>
        </Link>

        {/* Links Desktop */}
        <div className="hidden md:flex gap-2">
          {LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Burger Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3 flex flex-col gap-2">
          {LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}