import {BrowserRouter, Routes, Route} from "react-router-dom"
import 'flowbite'
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Search from "./pages/Search"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Questions from "./pages/Questions"
import Tags from "./pages/Tags"
import Notifications from "./pages/Notifications"
import ReportedContent from "./pages/ReportedContent"
import Reset from "./pages/Reset"
import AskQuestion from "./pages/AskQuestion"



function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/About" element={<About />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/ReportedContent" element={<ReportedContent />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/AskQuestion" element={<AskQuestion />} />
      </Route>
    </Routes>
    </BrowserRouter>


  )
}

export default App;
