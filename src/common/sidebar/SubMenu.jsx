import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './sidebar.scss'


const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
    const pathname = useLocation().pathname;
  
    const showSubnav = () => setSubnav(!subnav);
  
    return (
      <>
        <li className={item.subNav !== undefined ?(`${subnav===true  ? 'sidebar-item  has-sub active ' : 'sidebar-item  has-sub'}`):(`${pathname === item.path ? 'sidebar-item active' : 'sidebar-item' }`)} onClick={item.subNav ? showSubnav : null}>
          <Link to={item.path} class='sidebar-link'>
          <i className={item.icon}></i>
            <span>{item.title}</span>
            {item.subNav !== undefined ? <span className="menu-arrow"></span> :"" }
            
          </Link>
        
        </li>
        {subnav &&
          item.subNav.map((subItem, index) => (
            // <li className={`${pathname === subItem.path ? 'active' : ''}`} key={index}>
            <ul className="submenuStyles" key={index}>
            <li className="submenu-item ">
             
              <a href={subItem.path}><span>{subItem.title}</span></a>
            </li>
            </ul>
          ))}
      </>
    );
  };

  export default SubMenu