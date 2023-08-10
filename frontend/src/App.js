import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "flowbite";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import Tags from "./pages/Tags";
import Notifications from "./pages/Notifications";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import Reset from "./pages/Reset";
import AskQuestion from "./pages/AskQuestion";
import AuthProvider from "./context/AuthContext";
import QuestionsProvider from "./context/QuestionsContext";
import AnswerQuestion from "./pages/Answers";
import ViewQuestion from "./pages/ViewQuestion";
import ViewTag from "./pages/ViewTag";
import FavoriteQuestions from "./pages/FavoriteQuestions";
import ReportContent from "./pages/ReportContent";
import Admin from "./pages/Admin ";
import PasswordResetPage from "./pages/PasswordResetPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  console.log("Is Logged In?", isLoggedIn)

  function isUserLoggedIn(status) {
   
    if (status) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
    
  }
  
  return (
    <BrowserRouter>
      <AuthProvider isUserLoggedIn ={isUserLoggedIn}>
        <QuestionsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/About" element={<About />} />
              <Route path="/Questions" element={<Questions />} />
              <Route path="/Tags" element={<Tags />} />
              <Route path="/notifications" element={isLoggedIn ? <Notifications/> : <Navigate to="/login" />} />
              <Route path="/ReportContent/:id" element={isLoggedIn? <ReportContent /> : <Navigate to="/login" />} />
              <Route
                path="/Profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              />
              <Route path="/Reset" element={<Reset />} />
              {/* <Route path="/PasswordResetPage" element={<PasswordResetPage />} /> */}
              <Route
                path="/PasswordResetPage/:id"
                element={<PasswordResetPage />}
              />
              <Route
                path="/askQuestion"
                element={isLoggedIn ? <AskQuestion /> : <Navigate to="/login" />}
              />
              <Route
                path="/Answers/:question_id"
                element={<AnswerQuestion />}
              />
              <Route path="/viewQuestion/:id" element={<ViewQuestion />} />
              <Route path="/viewTag/:id" element={<ViewTag />} />
              <Route
                path="/favoriteQuestions"
                element={isLoggedIn ? <FavoriteQuestions /> : <Navigate to="/login" />}
              />
              <Route
                path="/moderatorDashboard"
                element={isLoggedIn ? <ModeratorDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin"
                element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
              />
            </Route>
          </Routes>
        </QuestionsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
