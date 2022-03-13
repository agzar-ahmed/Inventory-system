import { toast } from 'react-toastify';
import http from '../services/httpService';


export const registerUser =async( data ) =>{  
    try{        
        const res = await http(`/user`, {
            method: "post", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }) 
        const resJson = await res.json()
        // //add Token from localstorage
        // localStorage.setItem('token',resJson.token)

        return resJson
    }catch(err){
        /***************** expected error ******************/
        if( err.status == 400) {
            throw err
        // we thow err in this cas becuase we need to handel them in component 
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
        throw ""
        //remove Token from localstorage
        // localStorage.removeItem('token');
    }
}

export const loginUser =async( data ) =>{  
    try{        
        const res = await http(`/auth`, {
            method: "post", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }) 
        const resJson = await res.json()
        //add Token from localstorage
        console.log(resJson,'resJson')
        localStorage.setItem('token',resJson.token)
        return resJson
    }catch(err){
        /***************** expected error ******************/
        if( err.status == 400) {
            throw err
        // we thow err in this cas becuase we need to handel them in component 
        // to show set error state then show 400(client) rang errors 
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
     }
}

export const loadUser = async() => {
    try{        
        const res = await http(`/auth/user`)
        if(!res.ok) return localStorage.removeItem('token'); 
        const resJson = await res.json()
        console.log(resJson,'res from loadUser")')
        return resJson
    }catch(err){
        console.log(err,"err from loadUser")
        // remove Token from localstorage
        localStorage.removeItem('token');
    }

    
};

export const userLogout = () =>{
    localStorage.removeItem('token'); 
    window.location ="/login" 
}


export const sendResetPassword =async( data ) =>{  
    try{        
        const res = await http(`/auth/sendresetpassword`, {
            method: "post", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }) 
        const resJson = await res.json()
      
        return resJson
    }catch(err){
            // remove Token from localstorage
            localStorage.removeItem('token');
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
export const resetPassword =async( data,token ) =>{  
    try{    
        console.log(data,"data from resetPassword")    
        console.log(token,"token from resetPassword")
        const res = await http(`/auth/resetpassword`, {
            method: "post", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            // headers:{'x-auth-token': token},
        }) 
        const resJson = await res.json()
      
        return resJson
    }catch(err){
        // remove Token from localstorage
        // localStorage.removeItem('token');
        /**********************handel JWT expire *******************/
        if( err.status == 403) {
            throw Error("Link expired, please send an other reset password request to get new link.")           // we thow err in this cas becuase we need to handel them in component 
            
            //to show invali json token or expired 
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
