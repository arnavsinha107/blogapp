import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import LoginButton from "../components/LoginButton"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    password: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setMessage("")
    
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        localStorage.setItem("username", data.username || form.username)
        setMessage("Welcome back! Redirecting...")
        
        setTimeout(() => {
          window.location.href = "/blogs"
        }, 800)
      } else {
        setError(true)
        setMessage("Incorrect username or password. Please try again.")
      }
    } catch (err) {
      setError(true)
      setMessage("Could not connect to server. Ensure backend is running.")
      console.error(err)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError(false)
    setMessage("")
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential
        }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        localStorage.setItem("username", data.username)
        setMessage("Google login successful! Redirecting...")
        setTimeout(() => {
          window.location.href = "/blogs"
        }, 800)
      } else {
        setError(true)
        setMessage(data.error || "Google login failed. Please try again.")
      }
    } catch (err) {
      setError(true)
      setMessage("Could not connect to server. Ensure backend is running.")
      console.error(err)
    }
  }

  const handleGoogleError = () => {
    setError(true)
    setMessage("Google login initialization failed.")
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between">
      <Navbar />
      
      <main className="max-w-md mx-auto px-6 my-auto py-12 w-full">
        <div className="bg-[#1c1b1b] border border-slate-800/40 rounded-2xl p-8 sm:p-10 shadow-xl">
          
          <div className="text-center mb-8">
            <h1 className="text-[34px] font-extrabold font-serif text-white tracking-tight leading-none mb-3">
              Welcome back
            </h1>
            
            {/* Horizontal Line Subtitle */}
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-800/40"></div>
              <span className="flex-shrink mx-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">
                Sign In Credentials
              </span>
              <div className="flex-grow border-t border-slate-800/40"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[10px] text-slate-500 hover:text-indigo-400 font-bold transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <LoginButton />
            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800/40"></div>
              <span className="flex-shrink mx-3 text-[9px] font-extrabold text-slate-600 uppercase tracking-widest">
                or
              </span>
              <div className="flex-grow border-t border-slate-800/40"></div>
            </div>

            {/* Google Sign-In Container */}
            <div className="flex justify-center w-full overflow-hidden rounded-lg">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="dark"
                shape="rectangular"
                text="signin_with"
                width="320"
              />
            </div>

            {/* Notification Messages */}
            {message && (
              <div 
                className={`text-center text-xs font-semibold p-3.5 rounded-lg border ${
                  error 
                    ? "bg-rose-950/40 border-rose-900/40 text-rose-400" 
                    : "bg-emerald-950/40 border-emerald-900/40 text-emerald-400"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Link to Register */}
          <div className="text-center mt-8 pt-6 border-t border-slate-800/60 text-xs font-medium">
            <span className="text-slate-500">Don't have an account? </span>
            <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Sign up
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
