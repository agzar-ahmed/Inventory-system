import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import  { useParams } from 'react-router-dom'

import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {resetPasswordSchema} from '../../validations/resetPasswordValidation'
// import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService'

const ResetPassword=()=>{
    
    const {token,userEmail} = useParams()

    const initialData = {
        email:userEmail,
        password:"",
        confirmPassword:""        
    }
    const [ verificationToken, setVerificationToken] = useState()
    const [successMsg,setSuccessMsg] = useState("")
    const [errorMsg,setErrorMsg] = useState("")
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({
        email:"",
        password:"",
        confirmPassword:"",
    });

    const onSubmit = () =>{
        console.log(data,"reset password")
        console.log(token,"token from onSubmit")
        resetPassword(data)
        .then(res=>{
            setSuccessMsg(res.message)
            setData(initialData)
            localStorage.removeItem('token')
            // console.log(res)
            //redirect
            // history.push(`/checkemail/${email}`)
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
            setErrors({...err.message})
            setErrorMsg(err.message)
            setSuccessMsg('')
            // localStorage.removeItem('token')
            // // console.log(err)
         })
    
    }
    useEffect(()=>{
        console.log(token,"token from componentDidMount")
        localStorage.setItem('token',token) 
        // console.log(localStorage.getItem('token'),'token from componentDidMount')
        // console.log(verificationToken,'verificationToken from componentDidMount')
    },[])

    const handelChange = e => handleChange(e,data,setData,resetPasswordSchema,errors,setErrors);
    const handelSubmit= e =>handleSubmit(e,data,resetPasswordSchema,errors,setErrors,onSubmit)

    const { email,password,confirmPassword } = data
    return  <div className='resetPasswordForm'>
        <h2>Reset Password</h2>
                <Form
                  labelBtn="Reset"
                  onSubmit={handelSubmit}
                >
                    {successMsg && <div className='success-message center'> {successMsg}</div>}
                    {errorMsg && <div className='error-message center'> {errorMsg}</div>}
                    <FormInput
                                label="Email"
                                name="email"
                                value={email}
                                disabled="disabled"
                                // onChange={handelChange}
                                // onBlur={inputChange}
                                errorMessage={errors.email}
                    />  
                    <FormInput
                            autoFocus
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
                <div onClick={()=>{ 
                    localStorage.removeItem('token')
                    //removing token is really important in this stage otherwise 
                    //the user will login if click this link   
                    }}>
                     <Link to={`/login/${email}`}> 
                        Login
                     </Link> 
                </div>
            </div>
      
}
export default ResetPassword