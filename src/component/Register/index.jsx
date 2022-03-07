import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import  { useHistory } from 'react-router-dom'

import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
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
        registerUser(data)
        .then(resJson=>{
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
        .catch(err=>setErrors({...err.message}))
    
    //   const url = "/user"

    // fetch(`${url}`, {
    //     method: "post", // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    //   })
    //     .then( async(res) => { 
    //     //     console.log(res)
    //     //     if(!res.ok) {
    //     //         let error = await res.clone().json()
    //     //         const errKeys = error.msg&&Object.keys(error.msg)
    //     //         toast.error(error.msg[errKeys[0]], {
    //     //             position: "bottom-right",
    //     //             autoClose: 5000,
    //     //             hideProgressBar: false,
    //     //             closeOnClick: true,
    //     //             pauseOnHover: true,
    //     //             draggable: true,
    //     //             progress: undefined,
    //     //             theme: "colored"
    //     //         });
    //     //         //remove Token from localstorage
    //     //         localStorage.removeItem('token');
    //     // // show the error using existing error state you cab use an other
    //     // //div to how error if you want 
    //         //    setErrors({...errors,...error.msg})
    //         //     return
    //             // }else{
    //             let response = await res.clone().json()
    //             toast.success( `Welcome ${response.user.fullName}`, {
    //                 position: "bottom-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored"
    //             });
    //             // }  
    //         return res.json()
    //     })
    //     .then((resJson)=>{
    //         console.log(resJson,'resJson')
    //         //addtoken to header
    //          localStorage.setItem('token',resJson.token);
    //         //redirect 
    //         history.push("/")
    //     })
    //     .catch(err=>{
    //         toast.error('Error connection', {
    //             position: "bottom-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored"
    //         });
    //          //remove Token from localstorage
    //          localStorage.removeItem('token');
    //     })      
    }
    const handelChange = e => handleChange(e,data,setData,RegisterSchema,errors,setErrors);
    const handelSubmit= e =>handleSubmit(e,data,RegisterSchema,errors,setErrors,onSubmit)

    const { email,password,firstName,lastName,confirmPassword } = data
    return  <div className='loginForm'>
        <h2>Create Account</h2>
        <p>{errorMsg ? errorMsg:null}</p>
        
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