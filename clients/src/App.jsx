import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Generator from "./pages/Generator"
import History from "./pages/History"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/generate"  element={<Generator />} />
        <Route path="/history"   element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about"     element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}