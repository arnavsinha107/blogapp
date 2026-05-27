import { Link } from "react-router-dom"
function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b p-6">
      <h1 className="p-6 text-4xl font-bold">Simple Blog</h1>

      <div className="p-6 flex gap-6">
        <Link to="/">home</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        <Link to="/blogs">blogs</Link>
      </div>
    </nav>
  )
}

export default Navbar