import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import RegisterButton from "../components/RegisterButton"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setMessage("")

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (response.ok) {
        setMessage("Account created successfully! Redirecting to sign in...")
        setForm({
          username: "",
          email: "",
          password: "",
        })
        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else {
        setError(true)
        const errorMsg = data.username ? `Username: ${data.username[0]}` : (data.email ? `Email: ${data.email[0]}` : "Registration failed. Try a different username/email.")
        setMessage(errorMsg)
      }
    } catch (err) {
      setError(true)
      setMessage("Could not connect to server. Ensure backend is running.")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-6 my-auto py-12 w-full">
        <div className="bg-[#1c1b1b] border border-slate-800/40 rounded-2xl p-8 sm:p-10 shadow-xl">

          <div className="text-center mb-8">
            <h1 className="text-[34px] font-extrabold font-serif text-white tracking-tight leading-none mb-3">
              Join Simple Blog
            </h1>
            
            {/* Horizontal Line Subtitle */}
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-800/40"></div>
              <span className="flex-shrink mx-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">
                Create Your Account
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
                placeholder="Pick a unique username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Choose a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <RegisterButton />
            </div>

            {/* Success/Error message notifications */}
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

          {/* Direct Link to Login */}
          <div className="text-center mt-8 pt-6 border-t border-slate-800/60 text-xs font-medium">
            <span className="text-slate-500">Already have an account? </span>
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

export default Register
