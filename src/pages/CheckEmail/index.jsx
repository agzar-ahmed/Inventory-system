import React from 'react';
import "./style.css"
import EmailSent from '../../component/EmailSent'
import { useParams } from 'react-router-dom';

export default function CheckEmail(props) {
  const { userEmail } = useParams()
  console.log(props,'login page props')
  return <div className="login-page">
{/* pass props get from react-router-dom to redirect to location u want  */}
        <EmailSent userEmail={userEmail} {...props}/>
  </div>;
};
