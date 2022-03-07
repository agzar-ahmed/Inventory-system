import React,{useState} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {loginSchema} from '../../validations/loginValidation'
import http from '../../services/httpService'
import { loginUser } from '../../services/authService';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import  { useHistory,useParams } from 'react-router-dom'


const EmailSent=({userEmail})=>{
    
    const history = useHistory()
    
    const onSubmit = (e) =>{
        history.push(`/login/${userEmail}`)
    }
    return  <div className='emailSent box-shadow'>
        <h2>Account confirmation</h2>
        <p>
            Confirmation email has been sent to your email: {userEmail}, ckeck your account please
        </p>
        <div>
            <p>Check your email to procced</p>
        </div>
        <button  className="btn btnSubmit" onClick={onSubmit}>Procced</button>
        </div>
      
}
export default EmailSent