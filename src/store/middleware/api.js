import { API_CALL_BEGAN } from '../actions/types';
import {apiCallBegan, apiCallSuccess, apiCallFailed } from '../actions/apiActions'
import { toast } from 'react-toastify';
import http from '../../services/httpService';

//api action structure
// const action={
//     type:'apiCallBegan',
//     payload:{
//         url:'/items',
//         method:'get',
//         data:{},
//         onStart: action.ITEMS_LOADING,
//         onSuccess: 'apiCallSuccess',
//         onError:'apiCallFailed'
//     }
// }

const api =(params)=>({dispatch})=>next=>action=>{
  console.log(params,'params')
    if(action.type !== API_CALL_BEGAN) return next(action)
  
    const { url, method, data, onStart, onSuccess, onError, index } = action.payload
    const baseURL = process.env.REACT_APP_BASE_URL

    if(onStart) dispatch({type:onStart})

    //we move this down to dispatch onStart action (loading indecators must of the time)
    //first be we do API_CALL_BEGAN
    next(action)//API_CALL_BEGAN passed to other middlewares

    http(url, {
        method, // *GET, POST, PUT, DELETE, etc.
        //header is already defined in httpService
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
  .then(async (res) => {
    console.log(res,"res")
      //check if it is creation status  201 to show toast creation success
      //create toast
      if(res.status == 201) {
        toast.success('Created successfully' , {
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
      //update toast
      if(res.status == 200 && method == 'put') {
        toast.success('Updated successfully' , {
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
      //delete toast
      if(res.status == 204) {
        toast.success('Deleted successfully' , {
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
          
      if(res.status != 204){ return res.json() }//res.json({status:204})}
      
    })
    .then(resJson =>
        {
        console.log( resJson,'res from reducer')
        //general
        dispatch(apiCallSuccess(resJson))
        //spacefic
        //index used to know id ,delete request situation
        if(onSuccess) dispatch({type: onSuccess, payload:index? {id:index} : resJson})
        }
        
    ) 
   
    .catch(err => {
         console.log(err,Object.getOwnPropertyNames(err),'error')
    //   const error = JSON.stringify(err, ["message", "arguments", "type", "name"])
    //general error
      dispatch(apiCallFailed(err.message || 'Something bad happened'));
    //specific error
     if(onError) dispatch({type: onError, payload:err.message || 'Something bad happened'})
    }); 
 }
 
 export default api