import React,{useState} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {sendResetPasswordSchema} from '../../validations/sendResetPasswordValidation'
import http from '../../services/httpService'
import { sendResetPassword } from '../../services/authService';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import  { useHistory, useParams } from 'react-router-dom'


const SendResetPassword=(props)=>{
     
    const initialData = {
        email:'',
    }
    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({
        email:""
    });
   
    const onSubmit = () =>{
        console.log("send a reset request password")
        sendResetPassword(data)
         .then(res=>{
            //redirect
            console.log(res,'send password')
            setSuccessMessage(res.message)
            // toast.success( `Welcome back ${resJson.user.fullName}`, {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored"
            // });       
        })
        .catch(err=>setErrors({...err.message}))
    }
    const handelChange = e => handleChange(e,data,setData,sendResetPasswordSchema,errors,setErrors);
    const handelSubmit= e =>handleSubmit(e,data,sendResetPasswordSchema,errors,setErrors,onSubmit)

    const { email } = data
    return  <div className='sendResetPasswordForm'>
        <h2>Forget password ? enter your email below to begin the reset process.</h2>
        
                <Form
                  labelBtn="Send"
                  onSubmit={handelSubmit}
                >
                    {successMessage && <div className="success-message center">{successMessage}</div>  }
                    <FormInput
                                label="Email"
                                name="email"
                                value={email}
                                autoFocus
                                onChange={handelChange}
                                // onBlur={inputChange}
                                errorMessage={errors.email}
                    />  
                </Form>
                <div><Link to="/login">Login</Link></div>
            </div>
      
}
export default SendResetPassword