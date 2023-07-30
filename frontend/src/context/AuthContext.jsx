import { createContext, useEffect, useState } from "react";
import  Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
export const  AuthContext = createContext()


export default function AuthProvider({children}) 
{
    const nav = useNavigate()
    const [current_user, setCurrentUser] = useState([])
    const [onChange, setonChange] = useState(true)
    // Login
    const login = (username, password) =>{
        fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({username, password})
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
                nav("/")
                Swal.fire(
                    'Success',
                    response.success,
                    'success'
                  )
                  setonChange(!onChange)
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

    // Logout
    const logout = () =>{
       fetch("/api/logout", {
        method: "DELETE",
               })
       .then((res)=>res.json())
       .then((response)=>{
        setCurrentUser()
        setonChange(!onChange)
        console.log(response)
       })
    }
    // Register
    const register = () =>{
     return "Register function"
    }

    useEffect(()=>{
        console.log("Error")
        fetch("/api/current_user")
        .then((res)=>res.json())
        .then((response)=>{
            setCurrentUser(response)
            console.log("Current user ",response)
        })
    }, [onChange])

    const contextData ={
        login, 
        signup,
        signout,
        current_user
    }

  return (
   <AuthContext.Provider value={contextData}>
    {children}
   </AuthContext.Provider>
  )
}
