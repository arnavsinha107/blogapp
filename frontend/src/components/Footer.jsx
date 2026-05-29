import React from "react"

export default function Footer({ className = "" }) {
  return (
    <footer className={`border-t border-slate-800/60 bg-[#0e0e0e]/50 backdrop-blur-md py-8 px-6 mt-auto text-center shrink-0 w-full select-none ${className}`}>
      <h3 className="text-lg font-bold font-serif text-white tracking-tight mb-4 animate-pulse-slow">
        Simple Blog
      </h3>
      <div className="flex justify-center gap-8 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
        <a href="#privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
        <a href="https://github.com/arnavsinha107/blogapp/" className="hover:text-indigo-400 transition-colors">Github</a>
      </div>
      <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em]">
        @ Simple Blog 2026 
      </p>
    </footer>
  )
}
