import React from 'react';
import "./style.css"
import Login from '../../component/Login';
import { useState, useEffect } from 'react';
import Spinner from '../../component/Spinner' 
import { useHistory } from 'react-router-dom';

export default function Index(props) {
  const history = useHistory()
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
      /* Redirect user if already loggedin */
      localStorage.getItem('token') ? window.location = '/dashboard' : setLoading(false)      
  },[])
  console.log(props,'login page props')
  return <div className="login-page">
  {/* pass props get from react-router-dom to redirect to location u want  */}
      {loading?<Spinner/> : <Login {...props}/>}
    
  </div>;
};
