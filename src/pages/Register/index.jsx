import React,{ useState, useEffect } from 'react';
import "./style.css"
import Register from '../../component/Register';
import Spinner from '../../component/Spinner' ;

export default function Index() {
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    /* Redirect user if already loggedin */
    localStorage.getItem('token') ? window.location = '/dashboard' : setLoading(false)      
},[])
  return <div className="login-page">
          {loading?<Spinner/> : <Register/>}
       
  </div>;
};
