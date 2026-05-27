import { useNavigate } from "react-router-dom";
function LogoutButton(){
    const navigate=useNavigate()

    const handleLogout=(e)=>{
        e.preventDefault()
        const access=localStorage.getItem("access")
        if(!access){
            alert("Not logged in")
            return
        }
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        alert("Logged out")
        navigate("/login", { replace: true })
    }
    return(
        <button type="button" onClick={handleLogout} className="bg-black text-white p-4">
            Logout
        </button>
    )

    

}
export default LogoutButton
