import {BrowserRouter, Routes, Route} from "react-router-dom"
import React, { useEffect, useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    loginStatus();
  }, []);

  const loginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUser(sessionStorage.getItem('userId'));
    }
  };
  
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user.id);
    const token = data.token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', data.user.id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('token');
  
    fetch('http://localhost:3000/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Logged out successfully
      })
      .catch((error) => console.log('API error:', error));
  };
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
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
