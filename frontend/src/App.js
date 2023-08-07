import {BrowserRouter, Routes, Route} from "react-router-dom"
import React, { useEffect } from 'react';
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
import ModeratorDashboard from "./pages/ModeratorDashboard"
import Reset from "./pages/Reset"
import AskQuestion from "./pages/AskQuestion"
import AuthProvider from "./context/AuthContext"
import QuestionsProvider from "./context/QuestionsContext";
import AnswerQuestion from "./pages/Answers";
import ViewQuestion from "./pages/ViewQuestion";
import ViewTag from "./pages/ViewTag";
import FavoriteQuestions from "./pages/FavoriteQuestions";
import ReportContent from "./pages/ReportContent";

function App() {
  useEffect(() => {
  }, []);
  
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <QuestionsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/About" element={<About />} />
            <Route path="/Questions" element={<Questions />} />
            <Route path="/Tags" element={<Tags />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/ReportContent/:id" element={<ReportContent />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Reset" element={<Reset />} />
            <Route path="/askQuestion" element={<AskQuestion />} />
            <Route path="/Answers/:question_id" element={<AnswerQuestion />} />
            <Route path="/viewQuestion/:id" element={<ViewQuestion />} />
            <Route path="/viewTag/:id" element={<ViewTag />} />
            <Route path="/favoriteQuestions" element={<FavoriteQuestions />} />
            <Route path="/moderatorDashboard" element={<ModeratorDashboard />} />
          </Route>
        </Routes>
        </QuestionsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
