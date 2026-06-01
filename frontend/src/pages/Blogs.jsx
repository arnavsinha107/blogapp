import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import BlogCard from "../components/BlogCard"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../utils/api"
import Footer from "../components/Footer"
import GhostCursor from "../components/ui/GhostCursor"
import { MOCK_POSTS } from "../utils/mockData"

function Blogs() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Enhanced visual and navigation states
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [pageSize, setPageSize] = useState(6) // Default to 6 posts per page for more initial blogs!
  const [currentPage, setCurrentPage] = useState(1)

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  // Recursively fetch all backend posts to support complete local pagination
  const fetchAllPosts = async (initialUrl) => {
    setLoading(true)
    setMessage("")
    try {
      let accumulated = []
      let currentUrl = initialUrl
      while (currentUrl) {
        const response = await apiFetch(currentUrl)
        const data = await response.json()
        if (response.ok) {
          accumulated = [...accumulated, ...(data.results || [])]
          currentUrl = data.next
        } else {
          setMessage("Could not load posts")
          break
        }
      }
      setPosts(accumulated)
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
      fetchAllPosts(`${API_BASE_URL}/posts/`)
    }
  }, [navigate])

  // Categories list
  const categories = ["All", "Tech", "Design", "Lifestyle", "Productivity", "Thoughts"]

  // Normalize backend posts to include nice fallback badges
  const normalizedBackendPosts = posts.map(post => ({
    ...post,
    category: post.category || "Dev",
    read_time: post.read_time || "3 MIN READ",
    likes: post.likes || 15,
    views: post.views || 92
  }))

  const allPosts = [...normalizedBackendPosts, ...MOCK_POSTS]

  // Filter posts by Search Query & Category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === "All" || 
      (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
      
    return matchesSearch && matchesCategory;
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "likes") {
      return (b.likes || 0) - (a.likes || 0);
    } else if (sortOption === "read_time") {
      const parseTime = (str) => parseInt(str) || 3;
      return parseTime(a.read_time) - parseTime(b.read_time);
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  })

  // Reset pagination to first page when search, category, sorting, or pageSize changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortOption, pageSize])

  // Pagination calculation (exactly pageSize blogs per view)
  const totalPosts = sortedPosts.length
  const totalPages = Math.max(Math.ceil(totalPosts / pageSize), 1)

  // Page 1: 1 Spotlight + remaining elements up to pageSize. Other pages: pageSize elements.
  const displaySpotlight = currentPage === 1 && totalPosts > 0 ? sortedPosts[0] : null
  
  let paginatedFeedPosts = []
  if (currentPage === 1) {
    paginatedFeedPosts = sortedPosts.slice(1, pageSize)
  } else {
    const startIndex = pageSize + (currentPage - 2) * pageSize
    paginatedFeedPosts = sortedPosts.slice(startIndex, startIndex + pageSize)
  }

  return (
    <div className="relative min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between overflow-hidden">
      
      {/* Background Interactive GhostCursor Trail */}
      <div className="absolute inset-0 w-full h-full min-h-screen z-0 opacity-[0.25] pointer-events-none">
        <GhostCursor
          color="#818cf8"
          brightness={0.06}
          edgeIntensity={0.12}
          trailLength={55}
          inertia={0.55}
          grainIntensity={0.02}
          bloomStrength={0.12}
          bloomRadius={1.1}
          bloomThreshold={0.03}
          fadeDelayMs={800}
          fadeDurationMs={1200}
          zIndex={0}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-screen w-full flex-grow">
        <div>
          <Navbar />

          <main className="max-w-7xl mx-auto px-6 mt-16 pb-12 w-full">
            
            {/* Centered Discovery Header */}
            <section className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-[48px] sm:text-[68px] font-extrabold font-serif text-white tracking-tight leading-none mb-8">
                Discover Blogs!
              </h1>

              {/* Pill Search Bar (Nocturne style) */}
              <div className="flex items-center bg-[#1c1b1b]/90 border border-slate-800/80 rounded-full p-1.5 shadow-md max-w-xl mx-auto focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
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

            {/* Category Pill Filters Bar */}
            <section className="max-w-3xl mx-auto mb-16 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10 scale-[1.03]"
                      : "bg-[#1c1b1b]/80 border border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-[#201f1f]/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </section>

            {/* Section Divider Line */}
            <section className="mt-8">
              <div className="relative flex py-5 items-center mb-8">
                <div className="flex-grow border-t border-slate-800/60"></div>
                <span className="flex-shrink mx-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">
                  Publications Feed
                </span>
                <div className="flex-grow border-t border-slate-800/60"></div>
              </div>

              {message && (
                <p className="mb-8 p-4 bg-rose-950/40 border border-rose-900/40 text-rose-400 rounded-xl text-center font-medium">
                  {message}
                </p>
              )}

              {/* Feed Sorter & Layout Toggles */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#171717]/60 border border-slate-850/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm w-full">
                <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">
                  Showing <span className="text-white">{sortedPosts.length}</span> publications
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end text-xs flex-wrap">
                  {/* Page Size Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Show:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="bg-[#1c1b1b] border border-slate-800 rounded-full px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-widest text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500/50 cursor-pointer"
                    >
                      <option value={3}>3 Blogs</option>
                      <option value={6}>6 Blogs</option>
                      <option value={9}>9 Blogs</option>
                      <option value={12}>12 Blogs</option>
                    </select>
                  </div>

                  {/* Sort Control */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Sort By:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="bg-[#1c1b1b] border border-slate-800 rounded-full px-4 py-2 text-[10px] uppercase font-extrabold tracking-widest text-slate-300 outline-none focus:ring-1 focus:ring-indigo-500/50 cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="likes">Most Popular</option>
                      <option value="read_time">Shortest Read</option>
                    </select>
                  </div>

                  {/* Grid/List Toggles */}
                  <div className="flex items-center bg-[#1c1b1b] border border-slate-800 rounded-full p-1 gap-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-full transition-all cursor-pointer ${
                        viewMode === "grid" 
                          ? "bg-indigo-600 text-white" 
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                      title="Grid View"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-full transition-all cursor-pointer ${
                        viewMode === "list" 
                          ? "bg-indigo-600 text-white" 
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                      title="List View"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.007 5.25H3.75v.008h.008V12Zm-.008 5.25h.008v.008H3.75v-.008Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                /* Loading Skeleton Grid */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-[#1c1b1b] border border-slate-800/30 rounded-2xl h-[440px] animate-pulse shadow-sm" />
                  ))}
                </div>
              ) : totalPosts > 0 ? (
                <div className="flex flex-col w-full">
                  
                  {/* 1. Hero Spotlight Featured Card (Rendered only on Page 1) */}
                  {displaySpotlight && (
                    <BlogCard post={displaySpotlight} viewMode="spotlight" />
                  )}
                  
                  {/* 2. Remaining Feed (List or Grid View) */}
                  {paginatedFeedPosts.length > 0 && (
                    <div className={viewMode === "list" ? "flex flex-col gap-6 w-full" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                      {paginatedFeedPosts.map((post) => (
                        <BlogCard key={post.id} post={post} viewMode={viewMode} />
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                /* Empty state */
                <div className="text-center py-16 bg-[#1c1b1b] rounded-2xl border border-slate-800/40 shadow-md">
                  <p className="text-slate-500 font-medium">No blog posts found matching your filters.</p>
                </div>
              )}

              {/* Numeric & Directional Pagination */}
              {totalPages > 1 && (
                <div className="flex gap-2.5 mt-16 justify-center text-xs font-bold items-center">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center bg-[#1c1b1b] border border-slate-800 hover:bg-[#201f1f] text-slate-400 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-[#1c1b1b] cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  
                  {/* Page Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/10 scale-[1.05]"
                          : "bg-[#1c1b1b] border-slate-800 hover:bg-[#201f1f] text-slate-400"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center bg-[#1c1b1b] border border-slate-800 hover:bg-[#201f1f] text-slate-400 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-[#1c1b1b] cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </section>
          </main>
        </div>

        {/* Styled Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Blogs