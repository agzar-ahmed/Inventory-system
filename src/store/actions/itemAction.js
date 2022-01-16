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
    // dispatch({ type: action.ITEMS_LOADING });
    dispatch(apiCallBegan({
                      url:'/item',
                      method:'post',
                      data,
                      onStart: action.ITEMS_LOADING,
                      onSuccess: action.ADD_ITEMS,
                      onError:action.ITEMS_ERROR
                  })
  )       

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