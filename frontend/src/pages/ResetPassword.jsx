import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const uid = searchParams.get("uid")
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!uid || !token) {
      setError(true)
      setMessage("Invalid URL parameters. The reset link is missing its authentication tokens.")
      return
    }

    if (password !== confirmPassword) {
      setError(true)
      setMessage("Passwords do not match. Please verify your entries.")
      return
    }

    setLoading(true)
    setError(false)
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/password-reset/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          token,
          new_password: password,
        }),
      })
      const data = await response.json()

      if (response.ok) {
        setMessage("Your password has been successfully reset! Redirecting to login page...")
        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else {
        setError(true)
        setMessage(data.error || "The reset link is invalid or has expired.")
      }
    } catch (err) {
      setError(true)
      setMessage("Could not connect to server. Ensure backend is running.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-6 my-auto py-12 w-full">
        <div className="bg-[#1c1b1b] border border-slate-800/40 rounded-2xl p-8 sm:p-10 shadow-xl">
          
          <div className="text-center mb-8">
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.3em]">
              Security Portal
            </span>
            <h1 className="text-[34px] font-extrabold font-serif text-white tracking-tight leading-none mt-2 mb-3">
              Set new password
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed mt-2">
              Create a strong password that is at least 8 characters long and contains letters, numbers, and symbols.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* New Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-650 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-650 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-lg tracking-wide uppercase text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving Password..." : "Update Password"}
            </button>

            {/* Notification messages */}
            {message && (
              <div 
                className={`text-center text-xs font-semibold p-4 rounded-lg border leading-relaxed ${
                  error 
                    ? "bg-rose-950/40 border-rose-900/40 text-rose-400" 
                    : "bg-emerald-950/40 border-emerald-900/40 text-emerald-400"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Link back to Login */}
          <div className="text-center mt-8 pt-6 border-t border-slate-800/60 text-xs font-medium">
            <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Return to Sign In
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ResetPassword
