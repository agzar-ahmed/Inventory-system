import React,{useEffect, useState} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {loginSchema} from '../../validations/loginValidation'
import http from '../../services/httpService'
import { loginUser } from '../../services/authService';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import  { useHistory, useParams } from 'react-router-dom'


const Login=(props)=>{
     //hook for redirection
     const history = useHistory()
     const {state} = props.location;

     //get UserEmail if exist
     const {userEmail} = useParams()
     
    console.log(props,'login component props')
    const initialData = {
        email:userEmail,
        password:""
    }

    const [loading, setLoading] = useState(true);
    const [errorMsg,setErrorMsg] = useState()
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({
        password:"",
        email:""
    });
   
    const onSubmit = () =>{
        loginUser(data)
        .then(resJson=>{
            //redirect
             window.location = state? state.from.pathname:"/dashboard"
        })
        .catch(err=>setErrors({...err.message}))
    }
    const handelChange = e => handleChange(e,data,setData,loginSchema,errors,setErrors);
    const handelSubmit= e =>handleSubmit(e,data,loginSchema,errors,setErrors,onSubmit)


    const { email,password } = data
    return  <div className='loginForm'>
        <h2>Login</h2>
        <p>{errorMsg ? errorMsg:null}</p>
                <Form
                  labelBtn="Submit"
                  onSubmit={handelSubmit}
                >
                    <FormInput
                                label="Email"
                                name="email"
                                value={email}
                                autoFocus
                                onChange={handelChange}
                                // onBlur={inputChange}
                                errorMessage={errors.email}
                    />  
                    <FormInput
                            label="Password"
                            name="password"
                            value={password}
                            onChange={handelChange}
                            // onBlur={inputChange}
                            type="password"
                            errorMessage={errors.password}
                    />  
                </Form>
                <div><Link to="/sendresetpassword">Forget password?</Link> <Link to="/register">Create account</Link></div>
            </div>
      
}
export default Login