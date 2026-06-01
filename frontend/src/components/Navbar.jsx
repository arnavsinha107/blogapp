import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import LogoutButton from "./LogoutButton"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import GlareHover from "./ui/GlareHover"

function Navbar() {
  const access = localStorage.getItem("access")
  const username = localStorage.getItem("username") || "User"
  const location = useLocation()

  return (
    <nav className="sticky top-4 z-50 max-w-6xl mx-auto px-4 w-full">
      <div className="bg-[#131313]/75 border border-slate-800/60 backdrop-blur-xl rounded-full px-6 py-2.5 shadow-xl flex items-center justify-between transition-all">
        
        {/* Left side: Logo + Navigation links aligned next to it */}
        <div className="flex items-center gap-6">
          {/* Brand Name with Aceternity Text Hover Effect */}
          <Link to="/" className="w-[170px] h-[34px] flex items-center shrink-0">
            <TextHoverEffect text="Simple Blog" />
          </Link>
 
          {/* Thin vertical divider */}
          <span className="hidden md:inline h-4 w-[1px] bg-slate-800/80" />
 
          {/* Left-Aligned Consolidated Links */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-[10px] uppercase tracking-[0.2em]">
            <Link 
              to="/" 
              className={`transition-colors hover:text-indigo-400 ${
                location.pathname === "/" ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/blogs" 
              className={`transition-colors hover:text-indigo-400 ${
                location.pathname === "/blogs" ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              Blog
            </Link>
            <a 
              href="https://github.com/arnavsinha107/" 
              className="text-slate-400 hover:text-indigo-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
 
        {/* Right side: Authenticated / Action Buttons */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          {access ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-extrabold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                {username}
              </span>
              <div className="relative h-[32px] w-[115px] shrink-0">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="9999px"
                  borderColor="rgba(99, 102, 241, 0.35)"
                  glareColor="#818cf8"
                  glareOpacity={0.25}
                  glareAngle={-30}
                  glareSize={200}
                  className="h-full w-full active:scale-95 transition-all duration-300"
                >
                  <Link 
                    to="/create" 
                    className="absolute inset-0 flex items-center justify-center text-indigo-300 text-[10px] uppercase tracking-widest font-extrabold z-10"
                  >
                    Create Post
                  </Link>
                </GlareHover>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-slate-400 hover:text-indigo-400 px-3 py-1.5 transition-colors uppercase tracking-widest text-[10px] font-extrabold"
              >
                Sign in
              </Link>
              <div className="relative h-[32px] w-[145px] shrink-0">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="9999px"
                  borderColor="rgba(99, 102, 241, 0.45)"
                  glareColor="#818cf8"
                  glareOpacity={0.25}
                  glareAngle={-30}
                  glareSize={200}
                  className="h-full w-full active:scale-95 transition-all duration-300"
                >
                  <Link 
                    to="/register" 
                    className="absolute inset-0 flex items-center justify-center text-indigo-300 text-[10px] font-extrabold uppercase tracking-widest z-10"
                  >
                    Join Community
                  </Link>
                </GlareHover>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar