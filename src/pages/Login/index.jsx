import React from 'react';
import "./style.css"
import Login from '../../component/Login';

export default function index(props) {
  console.log(props,'login page props')
  return <div className="login-page">
{/* pass props get from react-router-dom to redirect to location u want  */}
        <Login {...props}/>
  </div>;
};
