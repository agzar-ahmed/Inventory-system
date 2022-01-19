import { API_CALL_BEGAN } from '../actions/types';
import {apiCallBegan, apiCallSuccess, apiCallFailed } from '../actions/apiActions'

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
    if(action.type !== API_CALL_BEGAN) return next(action)
  
    const { url, method, data, onStart, onSuccess, onError } = action.payload
    const baseURL = process.env.REACT_APP_BASE_URL

    if(onStart) dispatch({type:onStart})

    //we move this down to dispatch onStart action (loading indecators must of the time)
    //first be we do API_CALL_BEGAN
    next(action)//API_CALL_BEGAN passed to other middlewares

    fetch(`${baseURL}${url}`, {
        method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
    .then(async (res) => {
        // console.log(JSON.stringify(data),method)
        //  console.log(res,'response before json')
         if(!res.ok) {
            let error = await res.clone().json()
            console.log(error,'error')
            return  Promise.reject(error)
            }
           
           
        return res.json()
    })
    .then(resJson =>
        {
        console.log( resJson,'res from reducer')
        //general
        dispatch(apiCallSuccess(resJson))
        //spacefic
        if(onSuccess) dispatch({type: onSuccess, payload:resJson})
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