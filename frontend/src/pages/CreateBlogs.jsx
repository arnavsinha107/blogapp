import { useState } from "react"
import { Image } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { apiFetch } from "../utils/api"
import Footer from "../components/Footer"

function CreateBlogs() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "Dev",
    content: "",
    subcontent: "",
    quotation: "",
    is_public: true,
  })
  const [message, setMessage] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setMessage("")

    const access = localStorage.getItem("access")
    const refresh = localStorage.getItem("refresh")
    if (!access && !refresh) {
      setError(true)
      setMessage("You must be logged in to create a post.")
      return
    }

    if (!image) {
      setError(true)
      setMessage("An image upload is mandatory.")
      return
    }

    const formData = new FormData()
    formData.append("title", form.title)
    formData.append("subtitle", form.subtitle)
    formData.append("category", form.category)
    formData.append("content", form.content)
    formData.append("subcontent", form.subcontent)
    formData.append("quotation", form.quotation)
    formData.append("is_public", form.is_public)
    formData.append("image", image)

    try {
      const response = await apiFetch(`${API_BASE_URL}/posts/create/`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Post created successfully!")
        setTimeout(() => {
          navigate("/blogs")
        }, 1000)
      } else {
        setError(true)
        setMessage("Failed to create post. Check input values.")
        console.log(data)
      }
    } catch (err) {
      setError(true)
      setMessage("An error occurred. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e5e2e1] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 mt-12 sm:mt-16 w-full flex-grow">
        <div className="bg-[#1c1b1b] border border-slate-800/40 rounded-2xl p-6 sm:p-10 shadow-xl">
          
          <div className="mb-10">
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.3em]">
              Create Blog
            </span>
            <h1 className="text-[38px] font-extrabold font-serif text-white tracking-tight leading-none mt-2 mb-3">
              Create a new post
            </h1>
            <p className="text-xs text-slate-500 max-w-md font-medium leading-relaxed">
                Add all the relevant information required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Title - Borderless Serif Editorial Style */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Entry Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Give your story a title..."
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Subtitle - New Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Subtitle / Hook
              </label>
              <input
                type="text"
                name="subtitle"
                placeholder="Write a compelling subtitle or summary..."
                value={form.subtitle}
                onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="Dev">Dev</option>
                <option value="Tech">Tech</option>
                <option value="Design">Design</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Productivity">Productivity</option>
                <option value="Thoughts">Thoughts</option>
              </select>
            </div>

            {/* Featured Image - Dashed Drag & Drop Style Upload Box */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Featured Cover Image
              </label>
              
              <div className="relative group w-full bg-[#0A0A0A] border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all cursor-pointer overflow-hidden min-h-[160px] flex items-center justify-center p-6 text-center">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!image}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
                
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-24 w-auto object-cover rounded-lg border border-slate-800"
                    />
                    <div className="text-xs text-indigo-400 font-bold tracking-wide">
                      {image.name} <span className="text-slate-500 font-normal">({(image.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-400 group-hover:text-indigo-400 transition-colors">
                      <Image className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                      Upload cover artwork
                    </div>
                    <p className="text-[10px] text-slate-600 font-medium">
                      Drag and drop or click to choose a high-resolution image
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Article Body (First Paragraph)
              </label>
              <textarea
                name="content"
                placeholder="Write your main intro paragraph..."
                value={form.content}
                onChange={handleChange}
                required
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-4 text-white text-[15px] leading-relaxed placeholder-slate-750 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[140px] resize-y"
              />
            </div>

            {/* Quotation - New Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Immersive Quotation / Callout
              </label>
              <input
                type="text"
                name="quotation"
                placeholder="Add a beautiful italic callout or key statement..."
                value={form.quotation}
                onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-3.5 text-white text-[14px] placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Subcontent - New Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-extrabold text-[#c7c4d7] uppercase tracking-[0.2em] leading-none">
                Article Subcontent / Second Block
              </label>
              <textarea
                name="subcontent"
                placeholder="Add sub-text or secondary details to display below the quotation callout..."
                value={form.subcontent}
                onChange={handleChange}
                className="w-full bg-[#0A0A0A] border border-slate-800/80 rounded-lg px-4 py-4 text-white text-[15px] leading-relaxed placeholder-slate-750 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[140px] resize-y"
              />
            </div>

            {/* Visibility Toggle / Public Checkbox */}
            <div className="flex items-center gap-3 bg-[#0A0A0A] p-4.5 rounded-lg border border-slate-800/80">
              <input
                type="checkbox"
                id="is_public"
                name="is_public"
                checked={form.is_public}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
              <div className="text-left">
                <label htmlFor="is_public" className="text-xs font-bold text-white uppercase tracking-wider cursor-pointer">
                  Public Visibility
                </label>
               
              </div>
            </div>

            {/* Actions / Publish Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-6 border-t border-slate-800/60">
              <span/>
                
              
              
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-lg tracking-wide uppercase text-xs focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
              >
                Publish Article
              </button>
            </div>

            {/* Notification messages */}
            {message && (
              <div 
                className={`text-center text-xs font-semibold p-3.5 rounded-lg border ${
                  error 
                    ? "bg-rose-950/40 border-rose-900/40 text-rose-400" 
                    : "bg-emerald-950/40 border-emerald-900/40 text-emerald-400"
                }`}
              >
                {message}
              </div>
            )}
          </form>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CreateBlogs