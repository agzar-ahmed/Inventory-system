import React,{ useState, useEffect }from 'react';
import "./style.css";
import SendResetPassword from '../../component/SendResetPassword';
import Spinner from '../../component/Spinner';


export default function Index() {
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    /* Redirect user if already loggedin */
    localStorage.getItem('token') ? window.location = '/dashboard' : setLoading(false) 
  },[])
  return <div className="SendResetPassword-page">
        {loading?<Spinner/> : <SendResetPassword/>}
  </div>;
};

