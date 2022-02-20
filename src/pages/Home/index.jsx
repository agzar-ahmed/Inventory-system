import React from 'react';
import './style.css'
import TopBar from '../../component/TopBar';
import Features from '../../component/Features';
import Chart from '../../component/Chart';
import SmallWidget from '../../component/SmallWidget';
import LargeWidget from '../../component/LargeWidget';


import {chartData} from '../../dummyData'

export default function index() {
    return (
      
            
    <div className='Home'>
        {/* <button onClick={()=>{testSentrylogger}}>Break the world</button>; */}
            <TopBar/>
            <Features/>
            <Chart data={chartData} title="Chart title"/>
            

            <div className="homeWidgets">
                <SmallWidget/>
                <LargeWidget/>
            </div>

    </div>
       
    )
}
