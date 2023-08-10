import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const nav = useNavigate();
  const [currentUserData, setCurrentUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onChange, setonChange] = useState(true);
  const [users, setUsers] = useState([]);
  const [moderator, setModerator] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (token && userId) {
      setIsLoggedIn(true);
      fetchUserById(userId);
    }
  }, []);

  // Sign up
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
    nav("/");
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
        if (data.email) {
          setCurrentUserData(data);
          console.log(currentUserData)
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
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

  ///update moderator
  const updateModerator = (userId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to update moderator status", "error");
      return;
    }
  
    fetch(`/users/${userId}/update_moderator_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.errors) {
          Swal.fire("Error", data.errors, "error");
        } else {
          setModerator(data)
          // You might want to update the user's moderator status in the context
        }
      })
      .catch((error) => {
        console.error("Error updating moderator status:", error);
        Swal.fire("Error", "Failed to update moderator status", "error");
      });
  };

  // Delete user
  const deleteUser = (userId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to delete user", "error");
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`/users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire(
                'Deleted!',
                'Your user has been deleted.',
                'success'
              )
              setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            );
              // nav("/admin");
            } else {
              Swal.fire("Error", "Failed to delete user", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error", "Failed to delete user", "error");
          });
      }
    }) 
  };

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
      })
      .catch((error) => {
        console.error("Error editing user post:", error);
        Swal.fire("Error", "Failed to edit user post", "error");
      });
  };

// Profile update
  const editUserProfile = (newProfileData) => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch(`/users/${userId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfileData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          Swal.fire("Success", data.message, "success");
          fetchUserById(userId);
        } else {
          Swal.fire("Error", data.errors[0], "error");
        }
      })
      .catch((error) => {
        console.error("Error editing user profile:", error);
        Swal.fire("Error", "Failed to edit user profile", "error");
      });
  };

// Password reset
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
    users,
    setUsers,
    moderator,
    isLoggedIn,
    editUserPost,
    editUserProfile,
    resetPassword,
    fetchCurrentUser,
    // fetchUsers,
    setCurrentUserData,
    updateModerator,
    deleteUser
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}
