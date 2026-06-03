import { useState } from "react"
import { MessageSquare } from "lucide-react"
import GlareHover from "./ui/GlareHover"
import BlogReaderModal from "./BlogReaderModal"

function BlogCard({ post, viewMode = "grid" }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Local state to allow the count on the card feed to update interactively on comment submit
  const [commentsCount, setCommentsCount] = useState(
    post.comments_count || (post.comments ? post.comments.length : 0)
  )

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

  const handleCommentAdded = (newCount) => {
    setCommentsCount(newCount);
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
                    src={post.image || ""}
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
                      {post.category || ""}
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
                        <MessageSquare className="w-4 h-4 text-indigo-400 fill-indigo-400/10" strokeWidth={2.5} />
                        {commentsCount} {commentsCount === 1 ? 'COMMENT' : 'COMMENTS'}
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
                      {post.category || "GENERAL"}
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
                      <span className="text-[9px] font-extrabold tracking-widest flex items-center gap-1.5 text-slate-500">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/10" strokeWidth={2.5} />
                        {commentsCount} {commentsCount === 1 ? 'COMMENT' : 'COMMENTS'}
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
                      {post.category || "GENERAL"}
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
                      <span className={`text-[9px] font-extrabold tracking-widest flex items-center gap-1.5 ${post.image ? "text-white/60" : "text-slate-500"}`}>
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/10" strokeWidth={2.5} />
                        {commentsCount} {commentsCount === 1 ? 'COMMENT' : 'COMMENTS'}
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
      <BlogReaderModal 
        post={post}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCommentAdded={handleCommentAdded}
      />
    </>
  )
}

export default BlogCard;