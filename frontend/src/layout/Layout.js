import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Navbar/>
       <div className='mx-auto min-h-[100vh] bg-gray-40'>
        <Outlet />
       </div>
         

        <Footer/>
        
    </div>
  )
}

export default Layout