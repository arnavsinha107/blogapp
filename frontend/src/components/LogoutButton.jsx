import { useNavigate } from "react-router-dom";
import GlareHover from "./ui/GlareHover";

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
    <div className="relative h-[32px] w-[95px] shrink-0">
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderRadius="9999px"
        borderColor="rgba(148, 163, 184, 0.25)"
        glareColor="#818cf8"
        glareOpacity={0.2}
        glareAngle={-30}
        glareSize={200}
        className="h-full w-full active:scale-95 transition-all duration-300"
      >
        <button 
          type="button" 
          onClick={handleLogout} 
          className="absolute inset-0 w-full h-full bg-transparent text-slate-400 hover:text-slate-300 text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center border-0 outline-none z-10"
        >
          Sign out
        </button>
      </GlareHover>
    </div>
  )
}

export default LogoutButton
