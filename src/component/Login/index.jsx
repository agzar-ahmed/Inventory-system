import React,{useState} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {loginSchema} from '../../validaions/loginValidation'
import http from '../../services/httpService'
import { loginUser } from '../../services/authService';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import  { useHistory } from 'react-router-dom'


const Login=(props)=>{
    console.log(props,'login component props')
    const initialData = {
        email:"",
        password:""
    }
    const [errorMsg,setErrorMsg] = useState()
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({
        password:"",
        email:""
    });
    //hook for redirection
    const history = useHistory()
    const {state} = props.location;

    const onSubmit = () =>{
        loginUser(data)
        .then(resJson=>{
            //redirect
             window.location = state? state.from.pathname:"/dashboard"
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
                                label="User name"
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
                <div><Link to="/register">Create account</Link></div>
            </div>
      
}
export default Login