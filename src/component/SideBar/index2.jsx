import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';

import {LineStyle,Timeline,TrendingUp} from '@material-ui/icons'

export default function index() {
    return (
        <div className="sideBar">
        
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <ul className='sideBarListe'>
                        <h4 className="sideBarTittle"> Marketplace </h4>
                        <li className='sideBarListeItem active'>
                            <LineStyle className='sideBarIcon'/>
                            Home
                        </li>
                        <li className='sideBarListeItem'>
                            <Timeline className='sideBarIcon'/>
                            Analytic
                        </li>
                        <li className='sideBarListeItem'>
                             <TrendingUp className='sideBarIcon'/> 
                             Sales
                        </li>
                        
                    </ul>
                </div>    

                <div className="sideBarMenu">
                    <ul className='sideBarListe'>
                        <h4 className="sideBarTittle"> Quick Menu </h4>
                        <li className='sideBarListeItem active'>
                            <LineStyle className='sideBarIcon'/>
                            <Link to='/userslist'>Users</Link> 
                        </li>
                        <li className='sideBarListeItem'>
                            <Timeline className='sideBarIcon'/>
                            Products
                        </li>
                        <li className='sideBarListeItem'>
                             <TrendingUp className='sideBarIcon'/> 
                             Transactions
                        </li>
                        <li className='sideBarListeItem'>
                             <TrendingUp className='sideBarIcon'/> 
                             Reports
                        </li>
                        
                    </ul>
                </div>

                  <div className="sideBarMenu">
                    <ul className='sideBarListe'>
                        <h4 className="sideBarTittle"> Marketing </h4>
                        <li className='sideBarListeItem'>
                            <LineStyle className='sideBarIcon'/>
                            Ads
                        </li>
                        <li className='sideBarListeItem'>
                            <Timeline className='sideBarIcon'/>
                            Winning product
                        </li>
                        <li className='sideBarListeItem'>
                             <TrendingUp className='sideBarIcon'/> 
                             Return
                        </li>
                        
                    </ul>
                </div>

                  <div className="sideBarMenu">
                    <ul className='sideBarListe'>
                        <h4 className="sideBarTittle"> Logistic </h4>
                        <li className='sideBarListeItem'>
                            <LineStyle className='sideBarIcon'/>
                            Transition
                        </li>
                        <li className='sideBarListeItem'>
                            <Timeline className='sideBarIcon'/>
                            Cusromers
                        </li>
                        <li className='sideBarListeItem'>
                             <TrendingUp className='sideBarIcon'/> 
                             Shipping
                        </li>
                        
                    </ul>
                </div>          
            
            </div>
                
                
                        
        </div>
    )
}
