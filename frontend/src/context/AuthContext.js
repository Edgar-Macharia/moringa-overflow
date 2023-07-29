import { createContext, useState, useEffect } from "react";
import  Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
export const  AuthContext = createContext()


export default function AuthProvider({children}) 
{
    const nav = useNavigate()
    const [current_user, setCurrentUser] = useState([])
    const [username, setUsername] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Register
    const handleSignup = (user) => {
    
      fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.status === 201) {
              console.log(response)
            return response.json();
          } else {
              console.log(response)
            throw new Error('Network response was not OK');
          }
        })
        .then((data) => {
          if (data) {
            nav('/login');
          }
        })
        .catch((error) => console.log('Signup errors:', error));
    };

 
    const login = (user) =>{
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(user)
        })
        .then((res)=>res.json())
        .then((response)=>{
            console.log(response)
            if(response.error)
            {
                Swal.fire(
                    'Error',
                    response.error,
                    'error'
                  )
            }
            else if(response.success)
            {
                handleLogin(response);
                
                Swal.fire(
                    'Success',
                    response.success,
                    'success'
                  )
                nav("/")
               
            }
            else{
                Swal.fire(
                    'Error',
                    "Something went wrong",
                    'error'
                  )
            }

        })
    }
          
      const handleLogin = (data) => {
        setIsLoggedIn(true);
        setUsername(data.username)
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.user_id);
      };

    // Logout
    const logout = () => {
      setIsLoggedIn(false)
      setUsername("");
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
    };


    const contextData ={
        login, 
        handleSignup,
        logout,
        current_user,
        username,
        isLoggedIn
    }

  return (
   <AuthContext.Provider value={contextData}>
    {children}
   </AuthContext.Provider>
  )
}