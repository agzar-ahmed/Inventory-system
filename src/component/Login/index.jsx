import React,{useState} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {loginSchema} from '../../validaions/loginValidation'
import http from '../../services/httpSevice'

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
        const baseURL = process.env.REACT_APP_BASE_URL
        const url = "/auth"
        
    http(`${baseURL}${url}`, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            // "Access-Control-Allow-Origin":"*"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(res=>res.json())
        .then((resJson)=>{
            console.log(resJson,'resJson login') 
            //addtoken to localStorage
            localStorage.setItem("token",resJson.token)
            //redirect 
            // history.push
            console.log(state,'state.from.pathname')
             window.location = state? state.from.pathname:"/dashboard"
             console.log(window.location,'window.location')
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
            console.log(err,"catch error from login")
            /***************** expected error ******************/
           if( err.status == 400) {
                setErrors({...err.message})
                return
            }
           
        /******************** Unexpected error **************************/   
        toast.error("Error connection", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })   
        //remove Token from localstorage
            localStorage.removeItem('token');
        })  
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