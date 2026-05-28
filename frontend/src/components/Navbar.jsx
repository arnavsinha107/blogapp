import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import LogoutButton from "./LogoutButton"

function Navbar() {
  const access = localStorage.getItem("access")
  //const username = localStorage.getItem("username") || "User"
  const location = useLocation()
  //const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        

        
        <span className="text-[22px] font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            Simple Blog
        </span>
        

        {/* Centered Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-[15px]">
          <Link 
            to="/" 
            className={`transition-colors hover:text-blue-600 ${
              location.pathname === "/" ? "text-blue-600 font-semibold" : "text-slate-600"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/blogs" 
            className={`transition-colors hover:text-blue-600 ${
              location.pathname === "/blogs" ? "text-blue-600 font-semibold" : "text-slate-600"
            }`}
          >
            Blog
          </Link>
          
          

          <a href="https://github.com/arnavsinha107" className="text-slate-600 hover:text-blue-600 transition-colors">
            Contact
          </a>
        </div>

        {/* Authenticated / Action Buttons */}
        <div className="flex items-center gap-4">
          {access ? (
            <div className="flex items-center gap-4">
              
              <Link 
                to="/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
              >
                Create Post
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-slate-600 hover:text-blue-600 px-4 py-2.5 rounded-xl font-semibold text-[15px] transition-all bg-blue-50/50 hover:bg-blue-50 hover:scale-[1.01] active:scale-98"
              >
                Sign in
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[15px] transition-all shadow-sm hover:shadow hover:scale-[1.02] active:scale-98"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar