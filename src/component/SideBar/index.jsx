import React from 'react';
import './style1.css';
import {Link} from 'react-router-dom';

import {LineStyle,Timeline,TrendingUp,PeopleOutlineRounded
  ,DashboardRounded,EmailOutlined,BarChartRounded
   ,SettingsApplicationsRounded,ShoppingCartRounded} from '@material-ui/icons'

export default function index1() {
    return (
        <div className="sidebar open">
        <div className="logo-details">
          <i className='bx bxl-c-plus-plus icon'></i>
            <div className="logo_name">app title</div>
            <i className='bx bx-menu' id="btn" ></i>
        </div>
        <ul className="nav-list">
          <li>
             <i className='bx bx-search' ></i>
             <input type="text" placeholder="Search..."/>
             <span className="tooltip">Search</span>
          </li>
          <li className='active'>
            <Link to='/' className='active'>
            {/* <a href="#" classeName='active'> */}
              <i className='bx bx-grid-alt active'><DashboardRounded className='sideBarIcon'/></i>
              <span className=" active">Dashboard</span>
            {/* </a> */}
             <span className="tooltip">Dashboard</span>
             </Link>
          </li>
          <li>
             <Link to='/userslist'>
              <i className='bx bx-user'><PeopleOutlineRounded /></i>
              <span className="links_name">Users</span>
             </Link>
           <span className="tooltip">Users</span>
         </li>
         <li>
           <a href="#">
             <i className='bx bx-chat' ><EmailOutlined /></i>
             <span className="links_name">Messages</span>
           </a>
           <span className="tooltip">Messages</span>
         </li>
         <li>
           <a href="#">
             <i className='bx bx-pie-chart-alt-2' ><BarChartRounded/></i>
             <span className="links_name">Analytics</span>
           </a>
           <span className="tooltip">Analytics</span>
         </li>
         <li>
           <Link  to='/product'>
             <i className='bx bx-folder' ><ShoppingCartRounded/></i>
             <span className="links_name">Product</span>
           </Link>
           <span className="tooltip">product</span>
         </li>
         <li>
           <a href="#">
             <i className='bx bx-cart-alt' ></i>
             <span className="links_name">Order</span>
           </a>
           <span className="tooltip">Order</span>
         </li>
         <li>
           <a href="#">
             <i className='bx bx-heart' ></i>
             <span className="links_name">Saved</span>
           </a>
           <span className="tooltip">Saved</span>
         </li>
         <li>
           <a href="#">
             <i className='bx bx-cog' ><SettingsApplicationsRounded /></i>
             <span className="links_name">Setting</span>
           </a>
           <span className="tooltip">Setting</span>
         </li>
         <li className="profile">
             <div className="profile-details">
               <img src="profile.jpg" alt="profileImg"/>
               <div className="name_job">
                 <div className="name">Prem Shahi</div>
                 <div className="job">Web designer</div>
               </div>
             </div>
             <i className='bx bx-log-out' id="log_out" ></i>
         </li>
        </ul>
      </div>
    )
}
