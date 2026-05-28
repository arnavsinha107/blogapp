import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log("Backend offline, using fallback greeting", err))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 text-center mt-20 sm:mt-28">
        
        {/* database connection */}
        {message && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4.5 py-1.5 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-wider">
              {message}
            </span>
          </div>
        )}

       
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-none mb-6">
          Welcome to a very <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Unintuitive 
          </span>
          <br></br>Blog app
        </h1>

        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed mb-10">
          Sign up to read the latest community Blogs.
        </p>

        {/* go to Blogs */}
        <div className="flex justify-center gap-4">
          <Link 
            to="/blogs" 
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.01] text-[15px] cursor-pointer"
          >
            Explore Blogs
          </Link>
          <Link 
            to="/login" 
            className="bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow text-[15px] cursor-pointer
"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow text-[15px] cursor-pointer
"
          >
            Sign Up
          </Link>
          
        </div>

      </main>
    </div>
  )
}

export default App