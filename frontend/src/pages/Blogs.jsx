import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import BlogCard from "../components/BlogCard"
import { useNavigate } from "react-router-dom"
//import { Link } from "react-router-dom"

function Blogs() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)

  const fetchPosts = async (url) => {
    setLoading(true)
    setMessage("")
    const access = localStorage.getItem("access")
    
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: access ? `Bearer ${access}` : "",
        },
      })

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
    if (!access) {
      navigate("/register", { replace: true })
    } else {
      fetchPosts("http://127.0.0.1:8000/posts/")
    }
  }, [navigate])

  //  search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 mt-12">
        
        {/* Centered Blog Feed Title and Search */}
        <section className="text-center max-w-3xl mx-auto mb-16">
         
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-none mb-6">
            Discover Blogs!
          </h1>
          

          {/* Rounded Search Bar */}
          <div className="flex items-center bg-white border border-slate-200/80 rounded-full p-1.5 shadow-sm max-w-xl mx-auto focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <div className="pl-4 pr-2 text-slate-400">
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
              className="w-full bg-transparent border-0 outline-none text-slate-800 text-[15px] placeholder-slate-400 font-medium py-2 focus:ring-0"
            />
            <button 
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold px-6 py-2.5 rounded-full transition-all shrink-0 hover:shadow-md hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              Find Now
            </button>
          </div>
        </section>

        {/* Section Title and Main Post Grid */}
        <section className="mt-8">
          <div className="flex items-center gap-4 mb-8">
            
            <div className="h-[1px] bg-slate-200 w-full rounded" />
          </div>

          {message && (
            <p className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-center font-medium">
              {message}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-slate-100 rounded-2xl h-[440px] animate-pulse shadow-sm" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 font-medium">No blog posts found matching your search.</p>
            </div>
          )}

          {/* Simple Pagination Buttons */}
          <div className="flex gap-4 mt-12 justify-center">
            <button
              onClick={() => fetchPosts(prevPage)}
              disabled={!prevPage}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => fetchPosts(nextPage)}
              disabled={!nextPage}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Blogs