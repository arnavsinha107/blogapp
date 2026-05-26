import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])


  return (
    <div className=' min-h-screen bg-white text-black'>
      <nav className='flex items-center justify-between border-b '>
        <h1 className='p-6 text-4xl font-bold'>Simple Blog</h1>
        <div className='p-6 flex gap-6'>
          <a href='/'>home</a>
          <a href='/login'>login</a>
          <a href='/register'>register</a>
          <a href='/blogs'>blogs</a>
        </div>


      </nav>

      <div className='p-6'>
        <h2 className='text-2xl font-bold' >{message}</h2>

      </div>
    </div>
  )
}

export default App