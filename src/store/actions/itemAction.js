import * as action from './types';
import { apiCallBegan } from './apiActions';
import { toast } from 'react-toastify';

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
    //next(action)//API_CALL_BEGAN passed to other middlewares
    console.log(formData,'formData')
    fetch(`${baseURL}${url}`, {
        method, // *GET, POST, PUT, DELETE, etc.
        headers: {
        //make sure not to set the Content-Type header. The browser will set it for you, including the boundary parameter.
          'x-auth-token': localStorage.getItem('token')
        },
        body: formData // body data type must match "Content-Type" header   
      })
    .then(response => {
      if (!response.ok && response.status >= 400 && response.status<500) { 
      response.clone().json()
       .then( error=>{ return Promise.reject(error);})
      }
      //check if it is creation status  201 to show toast creation success 
      if(response.status == 201) {
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
      console.log(response,'response schema')
      return response.json()
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