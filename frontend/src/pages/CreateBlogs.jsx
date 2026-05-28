import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function CreateBlogs() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    content: "",
  })
  const [message, setMessage] = useState("")
  const [image, setImage] = useState()
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setMessage("")

    const access = localStorage.getItem("access")
    if (!access) {
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
    formData.append("content", form.content)
    formData.append("image", image)

    try {
      const response = await fetch("http://127.0.0.1:8000/posts/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 mt-16">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-md">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Create New Post
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Share your insights and news with the Simple Blog community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Title  */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-[15px] placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all resize-y"
              />
            </div>

            {/* Content  */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Article Body
              </label>
              <textarea
                name="content"
                placeholder="Write your beautiful story..."
                value={form.content}
                onChange={handleChange}
                required
                className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-[15px] placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all min-h-[180px] resize-y"
              />
            </div>

            {/* File Upload  */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Featured Cover Image
              </label>
              <div className="w-full flex items-center justify-center bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-[15px] placeholder-slate-400 font-medium focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 focus-within:bg-white transition-all cursor-pointer">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full outline-none text-slate-500 font-medium file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-[13px] file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Submit  */}
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow text-[15px] cursor-pointer mt-2"
            >
              Publish Article
            </button>

            {/* message  */}
            {message && (
              <div 
                className={`text-center text-sm font-semibold p-3.5 rounded-xl border ${
                  error 
                    ? "bg-rose-50 border-rose-100 text-rose-600" 
                    : "bg-emerald-50 border-emerald-100 text-emerald-600"
                }`}
              >
                {message}
              </div>
            )}
          </form>

        </div>
      </main>
    </div>
  )
}

export default CreateBlogs