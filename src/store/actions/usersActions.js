import { apiCallBegan } from './apiActions';
import * as action from './types';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getUsers = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url:'/users',
            // method:'get',
            // data:{},
            onStart: action.USERS_LOADING,
            onSuccess: action.USERS_LOADED,
            onError: action.USERS_ERROR
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