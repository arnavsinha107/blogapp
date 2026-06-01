import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GhostCursor from '../components/ui/GhostCursor'
import GlareHover from '../components/ui/GlareHover'

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
    <div className="relative min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between overflow-hidden">
      {/* Background Interactive GhostCursor Effect */}
      <div className="absolute inset-0 w-full h-full min-h-screen z-0 opacity-40 pointer-events-none">
        <GhostCursor
          color="#af5edaff"
          brightness={0.1}
          edgeIntensity={0.2}
          trailLength={60}
          inertia={0.6}
          grainIntensity={0.03}
          bloomStrength={0.15}
          bloomRadius={1.2}
          bloomThreshold={0.02}
          fadeDelayMs={800}
          fadeDurationMs={1200}
          zIndex={0}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-screen w-full flex-grow">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center flex-grow py-12 relative w-full">
          
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
            <Link to="/blogs" className="flex-grow flex-1 h-[52px]">
              <GlareHover
                width="100%"
                height="100%"
                background="#4f46e5"
                borderRadius="12px"
                borderColor="transparent"
                glareColor="#ffffff"
                glareOpacity={0.25}
                glareAngle={-30}
                glareSize={200}
                className="h-full w-full active:scale-95 transition-all shadow-md hover:shadow-indigo-500/10 hover:scale-[1.01]"
              >
                <span className="text-white font-bold text-[13px] uppercase tracking-wider">
                  Explore Blogs
                </span>
              </GlareHover>
            </Link>

            <Link to="/login" className="flex-grow flex-1 h-[52px]">
              <GlareHover
                width="100%"
                height="100%"
                background="#1c1b1b"
                borderRadius="12px"
                borderColor="#1e293b"
                glareColor="#818cf8"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={200}
                className="h-full w-full active:scale-95 transition-all hover:scale-[1.01]"
              >
                <span className="text-slate-300 font-bold text-[13px] uppercase tracking-wider">
                  Login
                </span>
              </GlareHover>
            </Link>

            <Link to="/register" className="flex-grow flex-1 h-[52px]">
              <GlareHover
                width="100%"
                height="100%"
                background="#1c1b1b"
                borderRadius="12px"
                borderColor="#1e293b"
                glareColor="#818cf8"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={200}
                className="h-full w-full active:scale-95 transition-all hover:scale-[1.01]"
              >
                <span className="text-slate-300 font-bold text-[13px] uppercase tracking-wider">
                  Sign Up
                </span>
              </GlareHover>
            </Link>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App