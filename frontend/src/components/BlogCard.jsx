function BlogCard({ post }) {
  // Format creation date beautifully
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return "";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl h-[440px]  shadow-sm hover: shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 ">
        <img
          src={post.image }
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Dark Legibility Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/55 to-black/20" />
      </div>

      {/* Spacer for Top Content alignment */}
      <div className="relative z-10 p-6 self-end">
        {post.created_at && (
          <span className="text-[12px] font-semibold text-white/50 uppercase tracking-widest">
            {formatDate(post.created_at)}
          </span>
        )}
      </div>

      {/* Bottom Text Content */}
      <div className="relative z-10 p-6 pt-0">
        <h3 className="text-[18px] font-bold text-white leading-snug tracking-tight mb-2.5 group-hover:text-blue-300 transition-colors line-clamp-3">
          {post.title}
        </h3>
        <p className="text-[14px] text-white/70 font-medium leading-relaxed line-clamp-3 mb-4">
          {post.content}
        </p>
        
        {post.author && (
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[12px] font-bold text-white/60 uppercase tracking-wider">
              By {post.author}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}

export default BlogCard;