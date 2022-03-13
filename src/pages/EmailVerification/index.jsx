import React,{useEffect} from 'react';
import "./style.css"
import EmailVerified from '../../component/EmailVerified'
import { useParams } from 'react-router-dom';

export default function Emailverifiaction(props) {
  // const { userEmail } = useParams()
  // console.log(props,'login page props')
  useEffect(()=>{
    /* Redirect user if already loggedin */
    localStorage.getItem('token') &&( window.location = '/dashboard' )
},[])
  return <div className="login-page">
{/* pass props get from react-router-dom to redirect to location u want  */}
        <EmailVerified {...props}/>
  </div>;
};
