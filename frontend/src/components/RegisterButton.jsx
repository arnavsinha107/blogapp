import { useNavigate } from "react-router-dom"

function RegisterButton() {
  const navigate = useNavigate()

  const handleRegister = (e) => {
    const access = localStorage.getItem("access")

    if (!access) {
      return
    }

    e.preventDefault()
    alert("Already logged in")
    navigate("/blogs", { replace: true })
  }

  return (
    <button type="submit" onClick={handleRegister} className="bg-black text-white p-4">
      Register
    </button>
  )
}

export default RegisterButton
