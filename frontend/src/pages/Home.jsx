import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function App() {
  const [message, setMessage] = useState("")

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  useEffect(() => {
    fetch(`${API_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log("Backend offline, using fallback greeting", err))
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center flex-grow py-12">
        
        {/* Backend Status*/}
        <div className="inline-flex items-center gap-2 bg-[#1c1b1b] border border-emerald-900/40 rounded-full px-4.5 py-1.5 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
            {message ? message.toUpperCase() : "CONNECTION PENDING"}
          </span>
        </div>

        {/* Display Typography */}
        <h1 className="text-[44px] sm:text-[76px] font-extrabold font-serif tracking-tight text-white leading-[1.1] mb-6 max-w-3xl">
          Welcome to a very<br />
          <span className="italic font-normal text-[#c0c1ff] pr-3">Unintuitive</span><br/>
           Blog app
        </h1>

        {/* Subtitle Description */}
        <p className="text-[14px] sm:text-[16px] text-slate-400 font-medium max-w-xl mx-auto leading-relaxed mb-10">
          Sign up to read the latest community Blogs. 
        </p>

        {/* 3-Column Actions Row */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
          <Link 
            to="/blogs" 
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-indigo-500/10 hover:scale-[1.01] text-[13px] uppercase tracking-wider text-center cursor-pointer"
          >
            Explore Blogs
          </Link>
          <Link 
            to="/login" 
            className="flex-1 bg-[#1c1b1b] border border-slate-800 hover:bg-[#1c1b1b] hover:border-slate-700 active:scale-95 text-slate-300 font-bold py-3.5 px-6 rounded-xl transition-all text-[13px] uppercase tracking-wider text-center cursor-pointer"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="flex-1 bg-[#1c1b1b] border border-slate-800 hover:bg-[#1c1b1b] hover:border-slate-700 active:scale-95 text-slate-300 font-bold py-3.5 px-6 rounded-xl transition-all text-[13px] uppercase tracking-wider text-center cursor-pointer"
          >
            Sign Up
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default App