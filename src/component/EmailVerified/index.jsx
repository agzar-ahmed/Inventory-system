import React,{useState,useEffect} from 'react';
import "./style.css"
import Form from '../Form'
import { FormInput,FormSelect } from'../FormFields';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {loginSchema} from '../../validations/loginValidation'
import http from '../../services/httpService'
import { loginUser } from '../../services/authService';
import Spinner from '../Spinner'

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import  { useHistory, useParams } from 'react-router-dom'


const EmailVerified=()=>{
    const {token,userEmail} = useParams()
    const [ message,setMessage ] = useState('')
    const [ showLogin, setShowLogin ] = useState(false)
    const [ verificationToken, setVerificationToken] = useState()
    
    

    const verifyLink = async (token) =>{ 
        try{       
            const res = await http(`/auth/emailverification`, {
                method: "post", // *GET, POST, PUT, DELETE, etc.
                headers:{'x-auth-token': token},
                body: ""//JSON.stringify('') // body data type must match "Content-Type" header
              }) 
            const resJson = await res.json()
            
            return resJson
        }catch(err){
            console.log(err)
            /**********************handel JWT expire *******************/
            if( err.status == 403) {
                throw Error("Link expired please register again to get new link")           // we thow err in this cas becuase we need to handel them in component 
                
                //to show set error state then show 400(client) rang errors 
            }   

            /***************** expected error ******************/
            if( ( err.status >= 400 && err.status<500)) {
                throw err           // we thow err in this cas becuase we need to handel them in component 
            //to show set error state then show 400(client) rang errors 
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
         }
    }
    useEffect(()=>{
        localStorage.setItem('token',token) 
        console.log(localStorage.getItem('token'),'token from componentDidMount')
        setVerificationToken(localStorage.getItem('token'))
        console.log(verificationToken,'verificationToken from componentDidMount')

    },[])
   
    useEffect(()=>{
        
        const getMessage = async () => {
            try{ 
                const res = await verifyLink(verificationToken)
               
                if(res.message) {
                    setShowLogin(true)
                    setMessage(res.message)
                }
            }catch(err){
                // console.log(err)
                setMessage(err.message)
            }
           
         }
         console.log(localStorage.getItem('token'),'token from componentDidUpdate')
         console.log(verificationToken,'verificationToken from componentDidUpdate')
         getMessage()
    },[verificationToken])

    const history = useHistory()
    
    const showBtn = () =>{
       return showLogin?
        <button  className="btn btnSubmit" onClick={(e)=> history.push(`/login/${userEmail}`)}>Login</button>
        :
        <button  className="btn btnSubmit" onClick={ (e)=> history.push(`/register`)}>Register</button>
    }
    
    // const view= ()=>
    
 { !verificationToken &&  <div>
                         <Spinner/>
                 </div>}

    return <div className='checkEmail box-shadow'>
    <h2>Account confirmation</h2>
        <p>
        {message}
        {/* : {userEmail} */}
        </p>
        <div>
            {/* <p> </p> */}
        </div>
        {showBtn()}
        </div>
    // }
  
    //     { token ? 
    //         // view()
    //         <div>message</div>
    //                         :
    //             <div>
    //                     <Spinner/>
    //             </div>
    //     }

     
      
}
export default EmailVerified