import { useState, useEffect } from "react"
import GlareHover from "./ui/GlareHover"
import { apiFetch } from "../utils/api"

function CommentsSection({ post, onCommentAdded }) {
  const access = localStorage.getItem("access")
  const loggedInUsername = localStorage.getItem("username") || ""

  const [commentsList, setCommentsList] = useState(post.comments || [])
  const [nameInput, setNameInput] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState("")

  // Pre-fill username if logged in
  useEffect(() => {
    if (access && loggedInUsername) {
      setNameInput(loggedInUsername)
    }
  }, [access, loggedInUsername])

  // Sync state if post prop changes (when dynamic article modals switch)
  useEffect(() => {
    setCommentsList(post.comments || [])
    setFormMessage("")
    setCommentContent("")
    if (access && loggedInUsername) {
      setNameInput(loggedInUsername)
    } else {
      setNameInput("")
    }
  }, [post, access, loggedInUsername])

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    setSubmitting(true);
    setFormMessage("");
    
    const finalAuthorName = access ? loggedInUsername : (nameInput.trim() || "Anonymous Guest");
    
    // Check if it's a mock post (negative ID)
    if (post.id < 0) {
      const newComment = {
        id: Date.now(),
        post: post.id,
        author_name: finalAuthorName,
        content: commentContent.trim(),
        created_at: new Date().toISOString(),
        is_visible: true
      };
      
      // Mutate prop object reference for session persistence
      post.comments = [...(post.comments || []), newComment];
      post.comments_count = (post.comments_count || 0) + 1;
      setCommentsList(post.comments);
      setCommentContent("");
      setFormMessage("Comment posted locally!");
      setSubmitting(false);
      
      if (onCommentAdded) {
        onCommentAdded(post.comments_count);
      }
      return;
    }
    
    // Real DB post: send API request using apiFetch utility for automated token refreshing
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const response = await apiFetch(`${API_BASE_URL}/posts/${post.id}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author_name: finalAuthorName,
          content: commentContent.trim()
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        // Mutate reference for session persistence
        post.comments = [...(post.comments || []), data];
        post.comments_count = (post.comments_count || 0) + 1;
        setCommentsList(post.comments);
        setCommentContent("");
        if (!access) {
          setNameInput("");
        }
        setFormMessage("Comment posted successfully!");
        
        if (onCommentAdded) {
          onCommentAdded(post.comments_count);
        }
      } else {
        setFormMessage(data.error || "Failed to post comment");
      }
    } catch (error) {
      console.error("Comment submit error:", error);
      setFormMessage("Could not connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto border-t border-slate-800/60 pt-10 mt-12">
      <h4 className="text-lg font-bold font-serif text-white tracking-tight mb-6 text-left">
        Comments <span className="text-indigo-300 font-normal">({commentsList.length})</span>
      </h4>
      
      {/* Comments List */}
      <div className="space-y-4 mb-10">
        {commentsList.length > 0 ? (
          commentsList.map((c) => {
            const initials = c.author_name ? c.author_name.slice(0, 2).toUpperCase() : "AN";
            const dateText = c.created_at ? new Date(c.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : "JUST NOW";

            return (
              <div key={c.id} className="flex gap-4 bg-[#1c1b1b]/35 p-5 rounded-2xl border border-slate-800/30 text-left">
                <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-900/50 flex items-center justify-center text-[10px] font-extrabold text-indigo-300 shrink-0">
                  {initials}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">{c.author_name}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{dateText}</span>
                  </div>
                  <p className="text-slate-300 text-[12.5px] leading-relaxed font-medium">
                    {c.content}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center bg-[#1c1b1b]/10 rounded-2xl border border-slate-800/20">
            <p className="text-slate-550 text-xs font-bold uppercase tracking-widest">No comments yet. Share your thoughts below!</p>
          </div>
        )}
      </div>

      {/* Comment Submission Form */}
      <form onSubmit={handleCommentSubmit} className="bg-[#1c1b1b]/20 p-6 rounded-2xl border border-slate-800/30 text-left mt-8">
        <h5 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Share Your Thoughts</h5>
        
        {formMessage && (
          <p className={`text-[11px] font-bold uppercase tracking-widest p-3 rounded-lg mb-4 text-center ${
            formMessage.toLowerCase().includes("success") || formMessage.toLowerCase().includes("posted")
              ? "bg-emerald-950/40 border border-emerald-900/40 text-emerald-400"
              : "bg-rose-950/40 border border-rose-900/40 text-rose-400"
          }`}>
            {formMessage}
          </p>
        )}

        {access ? (
          <div className="text-[10px] font-extrabold text-slate-555 uppercase tracking-widest mb-3">
            Commenting as <span className="text-indigo-400">{loggedInUsername}</span>
          </div>
        ) : (
          <div className="mb-3">
            <span className="block text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Your Name</span>
            <input 
              type="text" 
              placeholder="e.g., Arnav Sinha" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="bg-[#131313] border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-650 focus:ring-1 focus:ring-indigo-500/50 outline-none w-full"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <span className="block text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Comment</span>
          <textarea
            rows="3"
            placeholder="Write a respectful comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="bg-[#131313] border border-slate-800/80 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-650 focus:ring-1 focus:ring-indigo-500/50 outline-none w-full resize-none"
            required
          />
        </div>

        <div className="relative h-[38px] w-[145px] shrink-0">
          <GlareHover
            width="100%"
            height="100%"
            background="#4f46e5"
            borderRadius="9999px"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.2}
            glareAngle={-30}
            glareSize={200}
            className="h-full w-full active:scale-95 transition-all duration-300 shadow-sm"
          >
            <button 
              type="submit"
              disabled={submitting}
              className="absolute inset-0 w-full h-full bg-transparent text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center border-0 outline-none z-10"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </GlareHover>
        </div>
      </form>
    </div>
  );
}

export default CommentsSection;
