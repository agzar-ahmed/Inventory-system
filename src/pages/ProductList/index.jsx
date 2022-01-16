import React from 'react';
// import {ProductsTable} from '../../component/ProductsTable';
import {ProductsTable1,ProductsTable2} from '../../component/ProductsTable';
import TopBar from '../../component/TopBar'
import { Link } from 'react-router-dom'
import './style.css'


function ProductList() {
    return (
        <div className="content">
            <TopBar/>
            <div className="productlist">
                <div className="titleHeader">
                    <h1>Product</h1>
                    <div>
                        <Link to="product">
                            <button className="btn" >
                                    New product
                            </button>
                        </Link>
                    </div>              
                </div>
                <div className="prod-table">
                    <ProductsTable2/> 
                </div>
                <div className="prod-table">
                    <ProductsTable1/> 
                </div>
            </div>
        </div>
    )
}

export default ProductList
