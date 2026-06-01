import { useState } from "react"
import GlareHover from "./ui/GlareHover"

function BlogCard({ post, viewMode = "grid" }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Format date 
  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options).toUpperCase();
    } catch {
      return "";
    }
  };

  const formattedDate = formatDate(post.created_at);
  const authorName = post.author ? post.author.toUpperCase() : "AUTHOR";

  // Simple pure-css drop caps: splits first character from content
  const renderContentWithDropCaps = (content) => {
    if (!content) return "";
    const firstChar = content.charAt(0);
    const restOfContent = content.slice(1);
    return (
      <p className="text-slate-300 text-sm sm:text-base leading-[1.8] font-sans">
        <span className="float-left text-6xl sm:text-7xl font-serif pr-3 pt-1 font-extrabold text-indigo-400 leading-[0.8] select-none">
          {firstChar}
        </span>
        {restOfContent}
      </p>
    );
  };

  const isList = viewMode === "list";
  const isSpotlight = viewMode === "spotlight";

  return (
    <>
      {/* 1. Blog Card Element */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className={
          isSpotlight 
            ? "w-full md:h-[400px] min-h-[400px] h-auto relative shrink-0 mb-10" 
            : isList 
              ? "w-full md:h-[220px] min-h-[220px] h-auto relative shrink-0" 
              : "w-full h-[440px] relative shrink-0"
        }
      >
        <GlareHover
          width="100%"
          height="100%"
          background="#1c1b1b"
          borderRadius="16px"
          borderColor="rgba(255, 255, 255, 0.03)"
          glareColor="#818cf8"
          glareOpacity={0.06}
          glareAngle={-30}
          glareSize={200}
          className="h-full w-full hover:scale-[0.995] active:scale-[0.98] transition-all duration-500 shadow-md hover:shadow-xl cursor-pointer"
        >
          {/* Card Absolute Container to bypass GlareHover flex layouts */}
          <div className={`absolute inset-0 flex w-full h-full justify-between overflow-hidden ${
            isSpotlight 
              ? "flex-col md:flex-row items-stretch"
              : isList 
                ? "flex-col md:flex-row items-stretch" 
                : "flex-col"
          }`}>
            
            {isSpotlight ? (
              /* ================== SPOTLIGHT VIEW LAYOUT ================== */
              <>
                {/* Left Side: Large Cover Image */}
                <div className="relative w-full md:w-[58%] h-[240px] md:h-full shrink-0 overflow-hidden bg-slate-900">
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
                  
                  {/* Pinned / Spotlight badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="bg-indigo-600 border border-indigo-400/50 text-[9px] font-extrabold text-white uppercase tracking-widest px-3 py-1 rounded-full shadow-md animate-pulse">
                      FEATURED ARTICLE
                    </span>
                    <span className="bg-indigo-950/90 border border-indigo-500/40 text-[9px] font-extrabold text-indigo-300 uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {post.category || "DESIGN"}
                    </span>
                  </div>
                </div>

                {/* Right Side: Editorial Information */}
                <div className="flex-grow p-8 sm:p-10 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-500 block mb-3">
                      {formattedDate}
                    </span>
                    <h2 className="text-[24px] sm:text-[32px] font-extrabold font-serif tracking-tight leading-[1.2] text-white mb-4 group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[13px] sm:text-[14px] font-medium leading-relaxed text-slate-400 line-clamp-3 md:line-clamp-4 mb-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="border-t border-slate-800/60 pt-6 flex items-center justify-between w-full mt-4">
                    <div className="flex items-center gap-2.5">
                      {post.author_avatar ? (
                        <img src={post.author_avatar} className="w-7 h-7 rounded-full object-cover border border-slate-700" alt="" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-extrabold text-white">
                          {post.author ? post.author.slice(0,2).toUpperCase() : "AU"}
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-300 block leading-none mb-0.5">
                          {authorName}
                        </span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                          Author
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-extrabold tracking-widest flex items-center gap-1.5 text-slate-500">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {post.read_time || "5 MIN READ"}
                      </span>
                      <span className="text-[10px] font-extrabold tracking-widest flex items-center gap-1.5 text-slate-500">
                        <svg className="w-4 h-4 text-rose-500 fill-rose-500/25" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        {post.likes || 120}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : isList ? (
              /* ================== LIST VIEW LAYOUT ================== */
              <>
                {/* Left Side: Image (or placeholder) */}
                <div className="relative w-full md:w-[32%] h-[200px] md:h-full shrink-0 overflow-hidden bg-slate-900">
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-950/90 border border-indigo-500/40 text-[8px] font-extrabold text-indigo-300 uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                      {post.category || "DEV"}
                    </span>
                  </div>
                </div>

                {/* Right Side: Text Details */}
                <div className="flex-grow p-6 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-500">
                        {formattedDate}
                      </span>
                      {!post.is_public && (
                        <span className="bg-rose-950/80 border border-rose-900/60 text-[8px] font-extrabold text-rose-300 uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">
                          Private
                        </span>
                      )}
                    </div>
                    <h3 className="text-[18px] sm:text-[22px] font-bold font-serif tracking-tight leading-snug text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] font-medium leading-relaxed text-slate-400 line-clamp-2 md:line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  <div className="border-t border-slate-800/60 pt-4 flex items-center justify-between w-full mt-3">
                    <div className="flex items-center gap-2">
                      {post.author_avatar ? (
                        <img src={post.author_avatar} className="w-5 h-5 rounded-full object-cover border border-slate-700" alt="" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[8px] font-extrabold text-white">
                          {post.author ? post.author.slice(0,2).toUpperCase() : "AU"}
                        </div>
                      )}
                      <span className="text-[9px] font-extrabold tracking-widest uppercase text-slate-500">
                        BY {authorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-extrabold tracking-widest flex items-center gap-1 text-slate-500">
                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {post.read_time || "3 MIN READ"}
                      </span>
                      <span className="text-[9px] font-extrabold tracking-widest flex items-center gap-1 text-slate-500">
                        <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500/25" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        {post.likes || 12}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ================== GRID VIEW LAYOUT ================== */
              <>
                {post.image ? (
                  <div className="absolute inset-0 z-0 bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
                  </div>
                ) : null}

                {/* Card Header (Date + Category Badge) */}
                <div className="relative z-10 p-6 flex justify-between items-center w-full">
                  {!post.is_public ? (
                    <span className="bg-rose-950/80 border border-rose-900/60 text-[8px] font-extrabold text-rose-300 uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                      Private
                    </span>
                  ) : (
                    <span className={`bg-indigo-950/80 border border-indigo-500/30 text-[8px] font-extrabold text-indigo-300 uppercase tracking-widest px-2.5 py-1 rounded-full z-10 shadow-sm`}>
                      {post.category || "DEV"}
                    </span>
                  )}
                  <span className={`text-[10px] font-extrabold tracking-widest uppercase ${post.image ? "text-white/50" : "text-slate-500"}`}>
                    {formattedDate}
                  </span>
                </div>

                {/* Card Footer Content */}
                <div className="relative z-10 p-6 pt-0 w-full text-left">
                  <h3 className={`text-[21px] font-bold font-serif tracking-tight leading-snug mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2 ${post.image ? "text-white" : "text-white"}`}>
                    {post.title}
                  </h3>
                  <p className={`text-[12.5px] font-medium leading-relaxed line-clamp-3 mb-5 ${post.image ? "text-white/70" : "text-slate-400"}`}>
                    {post.content}
                  </p>
                  
                  <div className={`border-t pt-4 flex items-center justify-between w-full ${post.image ? "border-white/10" : "border-slate-800/60"}`}>
                    <div className="flex items-center gap-1.5">
                      {post.author_avatar && (
                        <img src={post.author_avatar} className="w-4.5 h-4.5 rounded-full object-cover border border-slate-700/60" alt="" />
                      )}
                      <span className={`text-[9px] font-extrabold tracking-widest uppercase ${post.image ? "text-white/60" : "text-slate-500"}`}>
                        BY {authorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-extrabold tracking-widest flex items-center gap-1 ${post.image ? "text-white/60" : "text-slate-500"}`}>
                        <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {post.read_time || "3 MIN READ"}
                      </span>
                      <span className={`text-[9px] font-extrabold tracking-widest flex items-center gap-1 ${post.image ? "text-white/60" : "text-slate-500"}`}>
                        <svg className="w-3 h-3 text-rose-500 fill-rose-500/25" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        {post.likes || 12}
                      </span>
                    </div>
                  </div>
                </div>

              </>
            )}

          </div>
        </GlareHover>
      </div>

      {/* 2. Fullscreen Immersive Article Reader Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#131313]/95 backdrop-blur-lg overflow-y-auto transition-all duration-500 flex justify-center py-6 px-4">
          <div className="max-w-3xl w-full bg-[#131313] min-h-screen relative flex flex-col justify-between py-10 px-6 sm:px-12">
            
            {/* Close Button overlay */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-[#1c1b1b] border border-slate-800 w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer z-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body Container */}
            <div>
              

              {/* Centered Large Serif Headline */}
              <h2 className="text-[32px] sm:text-[54px] font-extrabold font-serif text-white tracking-tight leading-[1.1] text-center mb-6 max-w-2xl mx-auto">
                {post.title}
              </h2>

              {/* Sub-description subtitle */}
              {post.subtitle && (
                <p className="text-indigo-200 text-center font-medium italic text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                  {post.subtitle}
                </p>
              )}

              {/* Author profile tag */}
              <div className="flex items-center justify-center gap-3 mb-10">
                {post.author_avatar ? (
                  <img 
                    src={post.author_avatar} 
                    alt="Author Avatar" 
                    className="w-10 h-10 rounded-full object-cover border border-indigo-500/30 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    {post.author ? post.author.slice(0, 2).toUpperCase() : "AU"}
                  </div>
                )}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-widest leading-none mb-1">
                      {authorName}
                    </span>
                    {!post.is_public && (
                      <span className="bg-rose-900/60 border border-rose-800 text-[8px] font-extrabold text-rose-300 uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                        Private
                      </span>
                    )}
                  </div>
                  <span className="block text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Big Cover Image */}
              <div className="w-full h-[240px] sm:h-[400px] overflow-hidden rounded-2xl mb-12 border border-slate-800/40">
                <img 
                  src={post.image || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"} 
                  alt="Article Cover" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Content Paragraph with Drop-Cap */}
              <div className="max-w-2xl mx-auto mb-10">
                {renderContentWithDropCaps(post.content)}
              </div>

              {/* Immersive quote block */}
              {post.quotation && (
                <div className="max-w-2xl mx-auto border-l-2 border-indigo-500 pl-6 py-2 my-10 bg-indigo-950/10 rounded-r-lg">
                  <p className="text-[17px] sm:text-[19px] italic font-serif text-indigo-200 leading-relaxed font-normal">
                    "{post.quotation}"
                  </p>
                </div>
              )}

              {/* Second content block */}
              {post.subcontent && (
                <div className="max-w-2xl mx-auto mb-10 text-slate-300 text-sm sm:text-base leading-[1.8] font-sans">
                  <p>
                    {post.subcontent}
                  </p>
                </div>
              )}
              

              {/* Dialogue / comments section (Stitch Style) */}
              <div className="max-w-2xl mx-auto border-t border-slate-800/60 pt-10 mt-12">
                <h4 className="text-lg font-bold font-serif text-white tracking-tight mb-6">
                  Comments <span className="text-indigo-300 font-normal">({post.comments_count || 0})</span>
                </h4>
                
                {/* Mock dialogue message */}
                <div className="flex gap-4 mb-8 bg-[#1c1b1b]/30 p-5 rounded-2xl border border-slate-800/30">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    AS
                  </div>
                  <div>
                    <div className="flex gap-2 items-center mb-1">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Arnav Sinha</span>
                      <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">2 Days Ago</span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                      Wow this is a very wonderful blog
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Copyright */}
            <div className="border-t border-slate-800/60 pt-8 mt-12 text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              © 2026 Simple Blog. 
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default BlogCard;