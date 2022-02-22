import { toast } from 'react-toastify';
import http from '../services/httpService';


export const loginUser =async( data ) =>{  
    try{        
        const res = await http(`/auth`, {
            method: "post", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          }) 
        const resJson = await res.json()
        //add Token from localstorage
        localStorage.setItem('token',resJson.token)
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
        //remove Token from localstorage
        localStorage.removeItem('token');
     }
}

export const loadUser = async() => {
    try{        
        const res = await http(`/auth/user`)
        if(!res.ok) return localStorage.removeItem('token'); 
        const resJson = await res.json()
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