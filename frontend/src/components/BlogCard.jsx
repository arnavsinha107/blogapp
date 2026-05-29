import { useState } from "react"

function BlogCard({ post }) {
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

  return (
    <>
      {/* 1. Blog Card Element */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl h-[440px] bg-[#1c1b1b] border border-slate-800/30 shadow-md hover:shadow-xl hover:scale-[0.99] active:scale-[0.97] transition-all duration-500 cursor-pointer"
      >
        
        {post.image ? (
          /* CARD VARIATION A: IMAGE COVER CARD */
          <div className="absolute inset-0 z-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Soft dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
          </div>
        ) : null}

        {/* Card Header (Date on Top Right) */}
        <div className="relative z-10 p-6 self-end">
          <span className={`text-[10px] font-extrabold tracking-widest uppercase ${post.image ? "text-white/50" : "text-slate-500"}`}>
            {formattedDate}
          </span>
        </div>

        {/* Card Footer Content */}
        <div className="relative z-10 p-6 pt-0 w-full">
          <h3 className={`text-[21px] font-bold font-serif tracking-tight leading-snug mb-3 group-hover:text-indigo-300 transition-colors line-clamp-3 ${post.image ? "text-white" : "text-white"}`}>
            {post.title}
          </h3>
          <p className={`text-[12.5px] font-medium leading-relaxed line-clamp-3 mb-5 ${post.image ? "text-white/70" : "text-slate-400"}`}>
            {post.content}
          </p>
          
          <div className={`border-t pt-4 ${post.image ? "border-white/10" : "border-slate-800/60"}`}>
            <span className={`text-[9px] font-extrabold tracking-widest uppercase ${post.image ? "text-white/60" : "text-slate-500"}`}>
              BY {authorName}
            </span>
          </div>
        </div>

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
              <p className="text-slate-400 text-center font-medium text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                Subtitles
              </p>

              {/* Author profile tag */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Author Avatar" 
                  className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                />
                <div className="text-left">
                  <span className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-widest leading-none mb-1">
                    {authorName}
                  </span>
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

              {/* Second content block */}
              <div className="max-w-2xl mx-auto mb-10 text-slate-400 text-sm sm:text-base leading-[1.7]">
                <p>
                 Subcontent below content
                </p>
              </div>

              {/* Immersive quote block */}
              <div className="max-w-2xl mx-auto border-l-2 border-indigo-500 pl-6 py-2 my-10">
                <p className="text-[17px] sm:text-[19px] italic font-serif text-white/90 leading-relaxed font-normal">
                  "Quotation"
                </p>
              </div>

            
              

              {/* Dialogue / comments section (Stitch Style) */}
              <div className="max-w-2xl mx-auto border-t border-slate-800/60 pt-10 mt-12">
                <h4 className="text-lg font-bold font-serif text-white tracking-tight mb-6">
                  Comments <span className="text-indigo-300 font-normal">(1)</span>
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