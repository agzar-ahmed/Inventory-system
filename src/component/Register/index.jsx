import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import  { useHistory } from 'react-router-dom'

import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import Spinner from '../Spinner'

import { handleChange, handleSubmit } from '../Form/formFunctions';
import {RegisterSchema} from '../../validations/registerValidation'
// import { toast } from 'react-toastify';
import { registerUser } from '../../services/authService'

const Register=()=>{
    const initialData = {
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""        
    }
    const [ loader, setLoader ] = useState(false)
    const [errorMsg,setErrorMsg] = useState()
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""  
    });

    const history=useHistory()

    const onSubmit = () =>{
        setLoader(true)
        registerUser(data)
        .then(resJson=>{
            setLoader(false)
            console.log(resJson,'resJson login')
            //redirect
            history.push(`/checkemail/${email}`)
            //  window.location = state? state.from.pathname:"/dashboard"
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
        .catch(err=>{
            setLoader(false)
            console.log(err,'err login')
            setErrors({...err.message})
            setErrorMsg(err.message)
        })
    
    }
    const handelChange = e => handleChange(e,data,setData,RegisterSchema,errors,setErrors);
    const handelSubmit= e =>handleSubmit(e,data,RegisterSchema,errors,setErrors,onSubmit)

    const { email,password,firstName,lastName,confirmPassword } = data
    return  <div className='loginForm'>
        <h2>Create Account <span>{loader && <Spinner/>}</span></h2>
        {errorMsg && <div className='error-message center'> {errorMsg}</div>}
        
                <Form
                  labelBtn="Submit"
                  onSubmit={handelSubmit}
                >
                    <FormInput
                                label="First name"
                                name="firstName"
                                value={firstName}
                                autoFocus
                                onChange={handelChange}
                                // onBlur={inputChange}
                                errorMessage={errors.firstName}
                    />  
                     <FormInput
                                label="Last name"
                                name="lastName"
                                value={lastName}
                                onChange={handelChange}
                                // onBlur={inputChange}
                                errorMessage={errors.lastName}
                    /> 
                    <FormInput
                                label="Email"
                                name="email"
                                value={email}
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
                    <FormInput
                            label="Confirm password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handelChange}
                            // onBlur={inputChange}
                            type="password"
                            errorMessage={errors.confirmPassword}
                    />  
                </Form>
                <div><Link to="/login">Login</Link></div>
            </div>
      
}
export default Register