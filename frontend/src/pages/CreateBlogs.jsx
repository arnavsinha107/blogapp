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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const access = localStorage.getItem("access")

    if (!access) {
      setMessage("You must be logged in to create a post.")
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Post created successfully!")
        navigate("/blogs")
      } else {
        setMessage("Failed to create post.")
        console.log(data)

      }
    } catch (err) {
      setMessage("An error occurred. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="p-6">
        <h1 className="mb-6 mx-auto flex w-full max-w-sm text-4xl">Create Post</h1>

        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-4"
            required
          />

          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            className="border p-4 min-h-[150px]"
            required
          />

          <button type="submit" className="bg-black text-white p-4">
            Submit Post
          </button>

          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </main>
    </div>
  )
}

export default CreateBlogs