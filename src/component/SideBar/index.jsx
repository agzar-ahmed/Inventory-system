import React,{ useState } from 'react';
import './style1.css';
import {Link} from 'react-router-dom';

import { userLogout } from '../../services/authService';

import {LineStyle,Timeline,TrendingUp,PeopleOutlineRounded
  ,DashboardRounded,EmailOutlined,BarChartRounded
   ,SettingsApplicationsRounded,AddShoppingCartRounded} from '@material-ui/icons'
import InventoryIcon from '@mui/icons-material/Inventory';
import { Logout } from '@mui/icons-material';


export default function SideBar({user}) {

const initailState =[
  {id: 1, label: "Dashboard", to: "/dashboard", icon: <DashboardRounded/>,toolTip:'Dashboard'},
  {id: 2, label: "Users", to: "/dashboard/userslist", icon: <PeopleOutlineRounded />,toolTip:'Users'},
  {id: 3, label: "Products", to: "/dashboard/productlist", icon: <InventoryIcon/>,toolTip:'Products'},
  {id: 4, label: "Incoming Purchase", to: "/dashboard/incomingpurchase", icon: <AddShoppingCartRounded/>,toolTip:'Incoming Purchase'},
  {id: 7, label: "Order", to: "", icon: <EmailOutlined />,toolTip:'Order'},
  {id: 8, label: "Order", to: "", icon: <BarChartRounded/>,toolTip:'Analytics'},
  {id: 6, label: "Messages", to: "", icon: <EmailOutlined />,toolTip:'Messages'},
  {id: 5, label: "Setting", to: "", icon: <SettingsApplicationsRounded />,toolTip:'Setting'},
]
  

const [ links, setLinks ] = useState(initailState)
const [ activeLink, setActiveLink ] = useState(1)

const renderLinks=()=>links && links.map(link =>{
  return <li 
             key={link.id}
             className={activeLink == link.id ? "active":""}
             onClick={()=>{setActiveLink(link.id)}}>
               <Link to={link.to} className=''>
                 <i className='bx bx-grid-alt'>{link.icon}</i>
                 <span className="links_name">{link.label}</span>
               </Link>
               <span className="tooltip">{link.toolTip}</span>
         </li>
})
console.log(user,'user sideBar')

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
          
         {renderLinks()}
        
         <li className="profile">
             <div className="profile-details">
               <img src="https://th.bing.com/th/id/OIP.Uqj5HIcNLaDcs2o2x9UNhQHaHa?w=160&h=180&c=7&o=5&pid=1.7" alt="profileImg"/>
               <div className="name_job">
                 <div className="name">{user && user.firstName}</div>
                 <div className="job">{user && user.email}</div>
               </div>
             </div>
             <i className='profile-logout' onClick={userLogout}><Logout/></i>
         </li>
        </ul>
      </div>
    )
}
