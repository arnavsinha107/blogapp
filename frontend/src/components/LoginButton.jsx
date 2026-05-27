import { useNavigate } from "react-router-dom"

function LoginButton() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    const access = localStorage.getItem("access")

    if (!access) {
      return
    }

    e.preventDefault()
    alert("Already logged in")
    navigate("/blogs", { replace: true })
  }

  return (
    <button type="submit" onClick={handleLogin} className="bg-black text-white p-4">
      Login
    </button>
  )
}

export default LoginButton
