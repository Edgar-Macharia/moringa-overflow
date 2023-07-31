import { createContext, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [current_user, setCurrentUser] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sign up
  const handleSignup = (user) => {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.errors) {
        Swal.fire("Error", response.errors, "error");
      } else if (response.message) {
        Swal.fire("Success", response.message, "success");
        nav("/login");
      } else {
        throw new Error("Network response was not OK");
      }
    })
  };
//Login
  const login = (user) => {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          Swal.fire("Error", response.error, "error");
        } else if (response.success) {
          handleLogin(response);
          Swal.fire("Success", response.success, "success");
          nav("/");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      });
  };

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUsername(data.username);
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data.user_id);
  };

  // Logout
  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  };

  //Current user
  

  const contextData = {
    login,
    handleSignup,
    logout,
    current_user,
    username,
    isLoggedIn,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}
