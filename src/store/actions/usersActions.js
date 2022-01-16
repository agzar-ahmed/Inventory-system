import * as action from './types';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getUsers = () => (dispatch, getState) => {
        //category loading
    dispatch({ type: action.USERS_LOADING });

    fetch('http://localhost:3002/api/users')
    .then(res => res.json())
    .then(resJson =>
        {
        console.log( resJson.users, 'res from reducer')
        dispatch({
        type: action.USERS_LOADED,
        payload: resJson.users
        }) }
    )

    .catch(err => {
        // dispatch(returnErrors(err.response.data, err.response.status,'PRODUCT_TYPE_ERROR'));
    }); 
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