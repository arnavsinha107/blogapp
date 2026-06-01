import Home from "./pages/Home"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Blogs from "./pages/Blogs"
import CreateBlogs from "./pages/CreateBlogs"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

const App = () => {
  return (
    <BrowserRouter>
      {/* Global Pulsating Ambient Background */}
      <div className="ambient-pulse-bg" />
      <div className="ambient-overlay" />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<CreateBlogs/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App