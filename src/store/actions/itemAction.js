import * as action from './types';
import { apiCallBegan } from './apiActions';

 export const getItems = () => (dispatch, getState) => {
  // dispatch({ type: action.ITEMS_LOADING });
      dispatch(
          apiCallBegan({
                    url:'/items',
                    // method:'get',
                    // data:{},
                    onStart: action.ITEMS_LOADING,
                    onSuccess: action.ITEMS_LOADED,
                    onError:action.ITEMS_ERROR
          })
      )
  }

  export const createItems = (data) => (dispatch, getState) => {
    
    console.log(data,'data')
    const baseURL = process.env.REACT_APP_BASE_URL
    const url ='/item'
    const method= "POST"
    dispatch({ type: action.ITEMS_LOADING })
      /* Mulipart fom data */
  const formData  = new FormData();

  for(const name in data) {
    console.log(data[name])
    if(typeof(data[name]) == "object"){
      console.log("I get one object")
      //check datatype to get productImg array to send every picture file as dataform 
      data[name].map(file => formData.append(name, file))
    }
    formData.append(name, data[name]);
  }
/* Mulipart fom data */
    //we move this down to dispatch onStart action (loading indecators must of the time)
    //first be we do API_CALL_BEGAN
    // next(action)//API_CALL_BEGAN passed to other middlewares

    fetch(`${baseURL}${url}`, {
        method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            //  'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: formData
        // JSON.stringify(data) // body data type must match "Content-Type" header
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
        dispatch({
                    type: action.ADD_ITEMS,
                    payload: resJson
                    })
        //general
        // dispatch(apiCallSuccess(resJson))
        //spacefic
        // if(onSuccess) dispatch({type: onSuccess, payload:resJson})
        }
        
    ) 
    .catch(err => {
         console.log(err,'error')
        //  dispatch(returnErrors(err,'PRODUCT_TYPE_ERROR'));
    //   const error = JSON.stringify(err, ["message", "arguments", "type", "name"])
    //general error
    //   dispatch(apiCallFailed(err.message || 'Something bad happened'));
    //specific error
    //  if(onError) dispatch({type: onError, payload:err.message || 'Something bad happened'})
    }); 
    // dispatch({ type: action.ITEMS_LOADING });
// //     dispatch(apiCallBegan({
// //                       url:'/item',
// //                       method:'post',
// //                       data,
// //                       onStart: action.ITEMS_LOADING,
// //                       onSuccess: action.ADD_ITEMS,
// //                       onError:action.ITEMS_ERROR
// //                   })
// //   )       

  //  dispatch({ 
  //                   type:action.API_CALL_BEGAN,
  //                   payload:{
  //                       url:'/items',
  //                       method:'get',
  //                       // data:{},
  //                       onSuccess: action.API_CALL_SUCCESS,
  //                       onError:action.API_CALL_FAILED
  //                   }   
  //            })
 }
       
        //category loading
//     dispatch({ type: action.ITEMS_LOADING });
//     fetch('http://localhost:3002/api/items')
//     .then(res => res.json())
//     .then(resJson =>
//         {
//         // console.log( resJson.providers, 'res from reducer')
//         dispatch({
//         type: action.ITEMS_LOADED,
//         payload: resJson.items
//         })
//         }
        
//     )
    
//     .catch(err => {
//         console.log(err,'error')
//          dispatch(returnErrors(err,'PRODUCT_TYPE_ERROR'));
//     }); 
// }

// export function deleteProductType(id){
//     return{
//              type: action.DELETE_INVENTORY,
               
//          }
//  }
// export function clearProductType(){
//     return{
//              type: action.CLEAR_PRODUCT_TYPE       
//          }
//  }