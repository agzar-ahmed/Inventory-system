import React,{useEffect, useState} from 'react';
import './style.css'
import PropTypes from 'prop-types'
import {ArrowCircleLeft, ArrowCircleRight} from '@mui/icons-material';


function Pagination({ activePage,itemCount, pageSize, onPagination}) {
 const [ totalPage, setTotalPage ] = useState(Math.ceil(itemCount/pageSize))
 
 const [ active , setActive ] = useState(activePage) 
 const pages = totalPage <= 1 ? null:[ ...Array(totalPage).keys() ];//dont show pagination if page = 1
 
 useEffect(()=>{
    console.log("render pagiation")
    setActive(1)
},[])

 useEffect(()=>{
    console.log("render pagiation componentdidupdate")
     setTotalPage(Math.ceil(itemCount/pageSize))
     setActive(1)
 },[itemCount])
 
 
  return   <div className="pagination">
                { 
                // active == 0 && (setActive(1)), 
                // active == 0 && (()=>onPagination(1)),
                // active > totalPage && (setActive(totalPage)),
                // active > totalPage && (()=>onPagination(totalPage)),
                pages && 
                <ul className="page">
                    <li className="page__btn" onClick={()=>{onPagination(active-1 == 0 ? 1 : active-1);
                                                            setActive(active-1 == 0 ? 1 : active-1)}}>
                                                                <ArrowCircleLeft/>
                    </li>
                    {
                    pages.map((n,index)=>
                    {
                    return <li key={n} className={(index+1 == active) ? "page__numbers active":"page__numbers" }
                        onClick={()=>{setActive(index+1);
                                      onPagination(index+1)
                                      }}>
                            {index+1}
                    </li>}
                    )}
                    <li className="page__btn" onClick={()=>{setActive(active+1 > totalPage  ? totalPage : active+1); 
                                                            onPagination(active+1 > totalPage ? totalPage : active+1)}}>
                        <ArrowCircleRight/>
                    </li>
                </ul>}
            </div>;
    
}
Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired,
    onPagination: PropTypes.func.isRequired,
  };

export default Pagination;
