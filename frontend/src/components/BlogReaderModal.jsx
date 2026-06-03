import { X } from "lucide-react"
import CommentsSection from "./CommentsSection"

function BlogReaderModal({ post, isOpen, onClose, onCommentAdded }) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-[100] bg-[#131313]/95 backdrop-blur-lg overflow-y-auto transition-all duration-500 flex justify-center py-6 px-4">
      <div className="max-w-3xl w-full bg-[#131313] min-h-screen relative flex flex-col justify-between py-10 px-6 sm:px-12">
        
        {/* Close Button overlay */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-[#1c1b1b] border border-slate-800 w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer z-50"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
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

          {/* Nested dynamic Comments Section */}
          <CommentsSection post={post} onCommentAdded={onCommentAdded} />
        </div>

        {/* Modal Footer Copyright */}
        <div className="border-t border-slate-800/60 pt-8 mt-12 text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest">
          © 2026 Simple Blog. 
        </div>

      </div>
    </div>
  );
}

export default BlogReaderModal;
