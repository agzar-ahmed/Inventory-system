import React,{useEffect} from 'react';
// import {ProductsTable} from '../../component/ProductsTable';
import {Table,ProductsTable1} from '../../component/Table';
import Table1 from '../../component/Table1'
import ListGroup from '../../component/ListGoup'
import TopBar from '../../component/TopBar'
import { Link } from 'react-router-dom'
import './style.css'

import { getItems } from '../../store/actions/itemAction';
import { itemsSelector } from '../../store/selectors/itemSelector'
import { useDispatch,useSelector } from 'react-redux';


function ProductList() {

    //life cycle HOOKS
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getItems());
    }
    ,[])

    const productList = useSelector(itemsSelector())
     
    console.log(productList,"productList1")
    return (
        <div className="content">
            <TopBar/>
            <div className="productlist">
                <div className="titleHeader">
                    <h1>Product list</h1>
                    <div>
                        <Link to="product">
                            <button className="btn" >
                                    New product
                            </button>
                        </Link>
                    </div>              
                </div>
                <div className="prod-table">
                    {console.log(productList,"productList")}
                    {productList && <Table tableData={productList}/>} 
                    <h2>Titre tableau </h2>
                    <div className="productlist-fulltable">
                        <div className="productlist-listgroup">
                            <ListGroup/>
                        </div>

                        <div className="productlist-table">
                            <Table1 /> 
                        </div>                           
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default ProductList
