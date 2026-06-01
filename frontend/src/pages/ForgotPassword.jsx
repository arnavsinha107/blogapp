import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/password-reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      
      if (response.ok) {
        setMessage("Password reset request submitted. Please check your email inbox (and spam folder) for a secure reset link. (For local development, the reset email is printed directly in the backend terminal console!)")
      } else {
        setError(true)
        setMessage(data.error || "Failed to submit request. Please try again.")
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
              Reset password
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed mt-2">
              Enter your registered email address and we'll send you instructions to securely reset your credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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
              {loading ? "Requesting Link..." : "Send Reset Link"}
            </button>

            {/* Notification messages */}
            {message && (
              <div 
                className={`text-center text-xs font-semibold p-4 rounded-lg border leading-relaxed ${
                  error 
                    ? "bg-rose-950/40 border-rose-900/40 text-rose-400" 
                    : "bg-indigo-950/40 border-indigo-900/40 text-indigo-300"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Link back to Login */}
          <div className="text-center mt-8 pt-6 border-t border-slate-800/60 text-xs font-medium">
            <span className="text-slate-500">Remember your credentials? </span>
            <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ForgotPassword
