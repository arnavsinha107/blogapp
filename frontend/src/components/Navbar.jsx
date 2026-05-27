import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

function Navbar() {
  const access = localStorage.getItem("access")

  return (
    <nav className="flex items-center justify-between border-b p-3">
      <h1 className="p-3 text-4xl font-bold">Simple Blog</h1>

      <div className="p-6 flex gap-6 items-center">
        <Link to="/">home</Link>
        {access ? (
          <>
            <Link to="/blogs">blogs</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar