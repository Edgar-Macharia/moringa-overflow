import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [currentUserData, setCurrentUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [onChange, setonChange] = useState(true)

  // Register
  const registerUser = (user) => {
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
        setonChange(!onChange);
      } else {
        throw new Error("Network response was not OK");
      }
    })
  };

  // Login
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
          setonChange(!onChange);
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

  // Fetch current user
  const fetchCurrentUser = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (!token || !userId) return;
    fetch(`/users/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setCurrentUserData(data);
      console.log(currentUserData)
    })
    .catch((error) => {
      console.error("Error fetching current user:", error);
    });
  };

  // Fetch questions

const fetchQuestions = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return;
  fetch("/questions", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setQuestions(data);
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
};

// Fetch user by ID

const fetchUserById = (userId) => {
  const token = sessionStorage.getItem("token");
  if (!token) return;
  fetch(`/users/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setCurrentUserData(data);
    })
    .catch((error) => {
      console.error("Error fetching user by ID:", error);
    });
};


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (token && userId) {
      setIsLoggedIn(true);
      fetchUserById(userId);
      fetchQuestions();
      // fetchCurrentUser();
    }
  }, []); 

  // Edit user post
  const editUserPost = (postId, newPostData) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch(`/users/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming the response contains a success message
        Swal.fire("Success", data.message, "success");
        const userId = sessionStorage.getItem("userId");
        fetchUserById(userId);
        fetchQuestions();
      })
      .catch((error) => {
        console.error("Error editing user post:", error);
        Swal.fire("Error", "Failed to edit user post", "error");
      });
  };

  const editUserProfile = (newProfileData) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch("/users/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfileData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", data.message, "success");
        const userId = sessionStorage.getItem("userId");
        fetchUserById(userId);
      })
      .catch((error) => {
        console.error("Error editing user profile:", error);
        Swal.fire("Error", "Failed to edit user profile", "error");
      });
  };


  const resetPassword = (userId, formData) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to reset password", "error");
      return;
    }

    fetch(`/users/${userId}/reset_password`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((response) => {
      if (response.errors) {
        Swal.fire("Error", response.errors, "error");
      } else if (response.message) {
        Swal.fire("Success", response.message, "success");
      } else {
        throw new Error("Network response was not OK");
      }
    })
    .catch((error) => {
      console.error("Error resetting password:", error);
      Swal.fire("Error", "Something went wrong", "error");
    });
  };

  const contextData = {
    login,
    registerUser,
    logout,
    currentUserData,
    username,
    isLoggedIn,
    questions,
    editUserPost,
    editUserProfile,
    resetPassword,
    fetchCurrentUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}
