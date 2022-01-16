import React from 'react';
import './style.css'

import {transitionData} from '../../dummyData'

export default function index() {
    return (
        <div className="widgetLg">
             <h4 className="widgetLgTitle">Last transactions</h4>
             <table className="widgetLgTable">
                 <thead>
                    <tr className="widgetLgTr">
                        <th></th>
                        <th>Custumer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                 </thead>
                 {
                     transitionData.map((user,index)=>(
                            <tbody key={index}>
                                <tr className="widgetLgTr">
                                   <td><img className="widgetLgImg" src={user.img} alt="widgetLgImg"/></td>
                                   <td className="widgetLgCustumer">{user.custumer}</td>
                                   <td className="widgetLgDate">{user.date}</td>
                                   <td className="widgetLgAmount">{user.amount}$</td>
                                   <td><span className={`widgetLgSpan${user.status}`}>{user.status}</span></td>
                                </tr>   
                            </tbody>
                            )
                            ) 
                 }    
             </table>
    
        </div>
    )
}
