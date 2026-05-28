import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import RegisterButton from "../components/RegisterButton"
import Navbar from "../components/Navbar"

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setMessage("")

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <Navbar />

      <main className="max-w-md mx-auto px-6 mt-16 sm:mt-24">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-md">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Create an account
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Sign up
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Pick a unique username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-[15px] placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-[15px] placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Choose a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-[15px] placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Submit Button */}
            <RegisterButton />

            {/* Success/Error message notifications */}
            {message && (
              <div 
                className={`text-center text-sm font-semibold p-3.5 rounded-xl border ${
                  error 
                    ? "bg-rose-50 border-rose-100 text-rose-600" 
                    : "bg-emerald-50 border-emerald-100 text-emerald-600"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Direct Link to Login */}
          <div className="text-center mt-6 pt-6 border-t border-slate-100 text-sm">
            <span className="text-slate-400 font-medium">Already have an account? </span>
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Register
