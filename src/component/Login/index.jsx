import React,{useState} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {loginSchema} from '../../validaions/loginValidation'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Login=()=>{
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
    const onSubmit = () =>{
        const baseURL = process.env.REACT_APP_BASE_URL
        const url = "/auth"
         
    fetch(`${baseURL}${url}`, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then( async(res) => { 
            console.log(res)
            if(!res.ok) {
                let error = await res.clone().json()
                console.log(error.msg,'error')
                toast.error(error.msg, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
        // show the error using existing error state you cab use an other
        //div to how error if you want 
               setErrors({...errors,...error.msg})
                return
                }else{
                let response = await res.clone().json()
                toast.success( `Welcome back ${response.user.fullName}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                }  
            return res.json()
        })
        .then((resJson)=>{
            console.log(resJson,'resJson')
            //addtoken to header
            //redirect 
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