import {useState} from "react"
import LogoutButton from "../components/logout"


function Login() {
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
    }
    else{
        setMessage("Login failed"),
        console.log(data)
    }
}


return(
    
    <div className="min-h-screen bg-white text-black">
        <nav className='flex items-center justify-between border-b '>
        <h1 className='p-6 text-4xl font-bold'>Simple Blog</h1>
        <div className='p-6 flex gap-6'>
          <a href='/'>home</a>
          <a href='/login'>login</a>
          <a href='/register'>register</a>
          <a href='/blogs'>blogs</a>
        </div>


        </nav>
        <h1 className="text-4xl mb-6 p-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
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

            <button type="submit" className="bg-black text-white p-2">
                Login
            </button>
        </form>
        <h1 className="p-6"><LogoutButton/></h1>
        {message && <p className="mt-4">{message}</p>}
        
    </div>
 )
}

export default Login
