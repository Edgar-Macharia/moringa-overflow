import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Navbar/>
       
       <div className='container mx-auto min-h-[85vh] bg-gray-100 p-5'>
        <Outlet />
       </div>
         

        <Footer/>
        
    </div>
  )
}

export default Layout