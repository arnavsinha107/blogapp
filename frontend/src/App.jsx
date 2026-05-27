import Home from "./pages/Home"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Blogs from "./pages/Blogs"
import CreateBlogs from "./pages/CreateBlogs"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<CreateBlogs/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App