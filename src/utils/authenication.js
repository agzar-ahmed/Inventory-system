import { toast } from 'react-toastify';
import http from '../services/httpSevice';


//login user

const baseURL = process.env.REACT_APP_BASE_URL

export const loginUser = (data, errors,setErrors) =>{  
//     const url = "/auth"
//     const {state} = props.location;
    
// fetch(`${baseURL}${url}`, {
//     method: "post", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })
//     .then( async(res) => { 
//         console.log(res)
//         if(!res.ok) {
//             let error = await res.clone().json()
//             const errKeys = error.msg&&Object.keys(error.msg)
//             toast.error(error.msg[errKeys[0]], {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored"
//             });
//     // show the error using existing error state you cab use an other
//     //div to how error if you want 
//            setErrors({...errors,...error.msg})
//             return
//             }else{
//             let response = await res.clone().json()
//             toast.success( `Welcome back ${response.user.fullName}`, {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored"
//             });
//             }  
            
//         return res.json()
//     })
//     .then((resJson)=>{
//         console.log(resJson,'resJson') 
//         //addtoken to localStorage
//         localStorage.setItem("token",resJson.token)
//         //redirect 
//         // history.push
//         console.log(state,'state.from.pathname')
//         window.location = state? state.from.pathname:"/dashboard"
//         console.log(window.location,'window.location')
//     })   
//     .catch(err=>{
//         console.log(err)
//         toast.error(err.message, {
//             position: "bottom-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored"
//         });
//         //remove Token from localstorage
//         localStorage.removeItem('token');
//     })
}

export const loadUser = async() => {
    const baseURL = process.env.REACT_APP_BASE_URL
    const url = "/auth/user";
    const token =localStorage.getItem("token");

    try{
        // console.log(`${baseURL}${url}`,token)
        
        const res = await http(`${baseURL}${url}`, {
                            method: "get", // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': token,
                                // "access-control-allow-origin":"*"
                            },
                    })
        // console.log(res,'loadUser function')
        if(!res.ok) return localStorage.removeItem('token'); 
        const resJson = await res.json()
        // console.log(resJson,'resJson')
        return resJson
    }catch{
          // remove Token from localstorage
        localStorage.removeItem('token');
    }

    
};

export const userLogout = () =>{
    localStorage.removeItem('token'); 
    window.location ="/login" 
}