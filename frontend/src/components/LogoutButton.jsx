import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("username")
    alert("Logged out successfully")
    navigate("/login", { replace: true })
  }

  return (
    <button 
      type="button" 
      onClick={handleLogout} 
      className="border border-slate-800/80 hover:border-slate-700/80 hover:bg-white/5 active:scale-95 text-slate-400 hover:text-slate-300 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer"
    >
      Sign out
    </button>
  )
}

export default LogoutButton
