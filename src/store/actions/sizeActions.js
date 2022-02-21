import * as action from './types';
import { apiCallBegan } from './apiActions';
 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getSizes = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url:'/sizes',
            // method:'get',
            // data:{},
            onStart: action.SIZE_LOADING,
            onSuccess: action.SIZE_LOADED,
            onError: action.SIZE_ERROR
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