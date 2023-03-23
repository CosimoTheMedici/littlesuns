import React, {useState} from 'react'
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';

const Sidebar = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);


  const handleCheckboxChange = (event) => {
    setIsDarkModeEnabled(event.target.checked);
    console.log("isDarkModeEnabled",isDarkModeEnabled)
    if(isDarkModeEnabled === true){document.body.className = 'theme-light'; document.body.style.backgroundColor = '#e4e9f7';}
    if(isDarkModeEnabled === false){document.body.className = 'theme-dark'; document.body.style.backgroundColor = '#151521';}
  }  

  return (
    <div id="sidebar" className="active">
            <div className="sidebar-wrapper active">
    <div className="sidebar-header position-relative">
        <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
                <a href="index.html"><img src="assets/images/logo/logo.svg" alt="Logo" srcset=""/></a>
            </div>
            <div className="theme-toggle d-flex gap-2  align-items-center mt-2">
                <div className="form-check form-switch fs-6">
                    <input 
                          className="form-check-input  me-0" 
                          type="checkbox" 
                          id="toggle-dark"  
                          checked={isDarkModeEnabled}
                          onChange={handleCheckboxChange}
                          />
                    <label className="form-check-label" ></label>
                </div>
            </div>
            <div className="sidebar-toggler  x">
                <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
            </div>
        </div>
    </div>
    <div className="sidebar-menu">
        <ul className="menu">
            <li className="sidebar-title">Menu</li>
            
        

            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            
            
{/*             
            <li className="sidebar-title">Raise Support</li>
            
            <li
                className="sidebar-item  ">
                <a href="https://zuramai.github.io/mazer/docs" className='sidebar-link'>
                    <i className="bi bi-life-preserver"></i>
                    <span>Documentation</span>
                </a>
            </li>
            
            <li
                className="sidebar-item  ">
                <a href="https://github.com/zuramai/mazer/blob/main/CONTRIBUTING.md" className='sidebar-link'>
                    <i className="bi bi-puzzle"></i>
                    <span>Contribute</span>
                </a>
            </li>
            
            <li
                className="sidebar-item  ">
                <a href="https://github.com/zuramai/mazer#donation" className='sidebar-link'>
                    <i className="bi bi-cash"></i>
                    <span>Donate</span>
                </a>
            </li> */}
            
        </ul>
    </div>
</div>
        </div>
  )
}

export default Sidebar