import React from 'react'
import './style.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';


export default function index() {
    return (
        <div className="smallWidget">
           <h4 className="widgetTitle">New join Member</h4>
           <ul className="widgetList">
               <li className="widgetListItem">
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsK6oIKzeSCKiqpjv5cuoC4ZC_hJ0FxNkvQ&usqp=CAU" alt="memeber img" />
                   <div className="listItemInfo">                      
                       <span className="userInfo">Hassan test</span>
                       <span className="userJobTitle">Software engineer</span>
                   </div>
                   <button className="widgetBtn"><MoreVertIcon/>Display</button>
               </li>

               <li className="widgetListItem">
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsK6oIKzeSCKiqpjv5cuoC4ZC_hJ0FxNkvQ&usqp=CAU" alt="memeber img" />
                   <div className="listItemInfo">                      
                       <span className="userInfo">Hassan test</span>
                       <span className="userJobTitle">Software engineer</span>
                   </div>
                   <button className="widgetBtn"><MoreVertIcon/>Display</button>

               </li>

               <li className="widgetListItem">
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsK6oIKzeSCKiqpjv5cuoC4ZC_hJ0FxNkvQ&usqp=CAU" alt="memeber img" />
                   <div className="listItemInfo">                      
                       <span className="userInfo">Hassan test</span>
                       <span className="userJobTitle">Software engineer</span>
                   </div>
                   <button className="widgetBtn"><MoreVertIcon/>Display</button>

               </li>
           </ul>
        </div>
    )
}

