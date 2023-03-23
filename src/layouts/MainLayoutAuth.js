import React from "react";
import Footer from "../common/footer/Footer";
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";


const MainLayoutAuth = (Component) => function HOC() {
  

  return (

    <div id="app">
        <Sidebar />

        <div id="main" className='layout-navbar'>
            <header className="mb-3">
                <Navbar />
            </header>
            {/* <Component /> */}
            <div id="main-content">
            <Component />
            
            </div>
           <Footer />
        </div>

        
        
    </div>

  )
}

export default MainLayoutAuth

