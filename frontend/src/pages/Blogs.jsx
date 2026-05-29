import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import BlogCard from "../components/BlogCard"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../utils/api"
import Footer from "../components/Footer"

function Blogs() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  const fetchPosts = async (url) => {
    setLoading(true)
    setMessage("")
    
    try {
      const response = await apiFetch(url)
      const data = await response.json()
      if (response.ok) {
        setPosts(data.results)
        setNextPage(data.next)
        setPrevPage(data.previous)
      } else {
        setMessage("Could not load posts")
      }
    } catch (error) {
      setMessage("Could not connect to server")
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const access = localStorage.getItem("access")
    const refresh = localStorage.getItem("refresh")
    if (!access && !refresh) {
      navigate("/login", { replace: true })
    } else {
      fetchPosts(`${API_BASE_URL}/posts/`)
    }
  }, [navigate])

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 mt-16 pb-12">
          
          {/* Centered Discovery Header */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-[48px] sm:text-[68px] font-extrabold font-serif text-white tracking-tight leading-none mb-8">
              Discover Blogs!
            </h1>

            {/* Pill Search Bar (Nocturne style) */}
            <div className="flex items-center bg-[#1c1b1b] border border-slate-800/80 rounded-full p-1.5 shadow-md max-w-xl mx-auto focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              <div className="pl-4 pr-2 text-slate-500">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="w-5 h-5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search Blogs" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-white text-[15px] placeholder-slate-500 font-medium py-2 focus:ring-0"
              />
              <button 
                type="button"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold px-6 py-3 rounded-full transition-all shrink-0 uppercase tracking-widest cursor-pointer"
              >
                Find Now
              </button>
            </div>
          </section>

          {/* Section Divider Line (FEATURED PUBLICATIONS) */}
          <section className="mt-8">
            <div className="relative flex py-5 items-center mb-10">
              <div className="flex-grow border-t border-slate-800/60"></div>
              <span className="flex-shrink mx-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">
                Featured Publications
              </span>
              <div className="flex-grow border-t border-slate-800/60"></div>
            </div>

            {message && (
              <p className="mb-8 p-4 bg-rose-950/40 border border-rose-900/40 text-rose-400 rounded-xl text-center font-medium">
                {message}
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-[#1c1b1b] border border-slate-800/30 rounded-2xl h-[440px] animate-pulse shadow-sm" />
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#1c1b1b] rounded-2xl border border-slate-800/40 shadow-md">
                <p className="text-slate-500 font-medium">No blog posts found matching your search.</p>
              </div>
            )}

            {/* Circular Pagination (Stitch style) */}
            <div className="flex gap-3 mt-16 justify-center text-xs font-bold">
              <button
                onClick={() => fetchPosts(prevPage)}
                disabled={!prevPage}
                className="w-10 h-10 flex items-center justify-center bg-[#1c1b1b] border border-slate-800 hover:bg-[#201f1f] text-slate-400 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-[#1c1b1b] cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              
              
              <button
                onClick={() => fetchPosts(nextPage)}
                disabled={!nextPage}
                className="w-10 h-10 flex items-center justify-center bg-[#1c1b1b] border border-slate-800 hover:bg-[#201f1f] text-slate-400 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-[#1c1b1b] cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Styled Footer */}
      <Footer />
    </div>
  )
}

export default Blogs