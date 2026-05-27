import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import BlogCard from "../components/BlogCard"
import { Link } from "react-router-dom"

function Blogs() {
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState("")

  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)

  const fetchPosts = async (url) => {
    const access = localStorage.getItem("access")
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        setPosts(data.results)
        setNextPage(data.next)
        setPrevPage(data.previous)
      } else {
        setMessage("Could not load posts")
        console.log(data)
      }
    } catch (error) {
      setMessage("Could not load posts")
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts("http://127.0.0.1:8000/posts/")
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className=" border p-6 flex gap-6">
        <Link to="/create">
          <button type="button" className="bg-black text-white p-4">
            Create
          </button>
        </Link>
      </div>

      <main className="p-6">
        <h1 className="text-4xl font-bold mb-6">Blogs</h1>

        {message && <p className="mb-4">{message}</p>}

        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => fetchPosts(prevPage)}
            disabled={!prevPage}
            className="border p-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => fetchPosts(nextPage)}
            disabled={!nextPage}
            className="border p-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default Blogs