import * as action from './types';
import { apiCallBegan } from './apiActions';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getProviders = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url:'/providers',
            // method:'get',
            // data:{},
            onStart: action.PROVIDER_LOADING,
            onSuccess: action.PROVIDER_LOADED,
            onError: action.PROVIDER_ERROR
        })
    );
}

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