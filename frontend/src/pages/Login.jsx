import {useState} from "react"
import { useNavigate } from "react-router-dom"
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import Navbar from "../components/Navbar"


function Login() {
  const navigate= useNavigate()
  const[form,setForm]=useState({
    username:"",
    //email:"",
    password:"",
 })
 const [message, setMessage]=useState("")

 const handleChange=(e)=>{
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
 }

 const handleSubmit=async (e)=>{
    e.preventDefault()
    const response=await fetch("http://127.0.0.1:8000/login/",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",

        },
        body: JSON.stringify(form),
    })
    const data=await response.json()
    if(response.ok){
        localStorage.setItem("access",data.access)
        localStorage.setItem("refresh",data.refresh)
        setMessage(data.message)
        setForm({
            username:"",
            //email:"",
            password:"",

        })
        navigate("/blogs")
    }
    else{
        setMessage("Login failed"),
        console.log(data)
    }
}


return(
    
    <div className="min-h-screen bg-white text-black">
        <Navbar />
        <main className="p-6">
        <h1 className="mb-6 mx-auto flex w-full max-w-sm text-4xl ">Login</h1>
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-6">
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="border p-4"

            />


            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border p-4"
            />

            <LoginButton />
            {message && <p className="mt-4">{message}</p>}
        </form>
        </main>
        
        
        
    </div>
 )
}

export default Login
