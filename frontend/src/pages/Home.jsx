import { useState, useEffect } from 'react'
import Navbar from '../components/NavBar'
function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])


  return (
    <div className=' min-h-screen bg-white text-black'>
      <Navbar/>

      <div className='p-6'>
        <h2 className='text-2xl font-bold' >{message}</h2>

      </div>
    </div>
  )
}

export default App