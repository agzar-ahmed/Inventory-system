import React from 'react';
import "./style.css"
import EmailVerified from '../../component/EmailVerified'
import { useParams } from 'react-router-dom';

export default function Emailverifiaction(props) {
  // const { userEmail } = useParams()
  // console.log(props,'login page props')
  return <div className="login-page">
{/* pass props get from react-router-dom to redirect to location u want  */}
        <EmailVerified {...props}/>
  </div>;
};
