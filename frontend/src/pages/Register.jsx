import {useState} from "react"
import RegisterButton from "../components/RegisterButton"
import Navbar from "../components/NavBar"

function Register(){
 const[form,setForm]=useState({
    username:"",
    email:"",
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
    const response=await fetch("http://127.0.0.1:8000/register/",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",

        },
        body: JSON.stringify(form),
    })
    const data=await response.json()
    if(response.ok){
        setMessage(data.message)
        setForm({
            username:"",
            email:"",
            password:"",

        })
    }
    else{
        setMessage("Registration failed"),
        console.log(data)
    }

 }
 return(
    <div className="min-h-screen bg-white text-black ">
        <Navbar/>

        <main className='p-6'>
        <h1 className="mx-auto flex max-w-sm w-full text-4xl mb-6 ">Register</h1>
        
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
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
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

            <RegisterButton />
            {message && <p className="">{message}</p>}
        </form>
        </main>
        
    </div>
 )
}
export default Register
