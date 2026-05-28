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
      className="border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
    >
      Sign out
    </button>
  )
}

export default LogoutButton
