import React from 'react'
import './style.css'

import {TrendingUp,TrendingDown}from '@material-ui/icons';

export default function index() {
    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featureBody">
                    <span className="featuredArrow down"><TrendingDown/></span>
                    <span className="featuredMoney">$212.45</span>
                    <span className="featuredMoneyRate">-1.2</span>
                </div>
                <span className='featuredFooter'>Compared to last month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featureBody">
                <span className="featuredArrow up"><TrendingUp/></span>
                    <span className="featuredMoney">$245.45</span>
                    <span className="featuredMoneyRate">+1.2</span>
                </div>
                <span className='featuredFooter'>Compared to last month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featureBody">
                <span className="featuredArrow down"><TrendingDown/></span>
                    <span className="featuredMoney">$285.45</span>
                    <span className="featuredMoneyRate">-1.2</span>
                </div>
                <span className='featuredFooter'>Compared to last month</span>
            </div>
        </div>
    )
}
