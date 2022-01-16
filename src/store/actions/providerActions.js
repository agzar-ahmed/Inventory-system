import * as action from './types';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getProviders = () => (dispatch, getState) => {
        //category loading
    dispatch({ type: action.PROVIDER_LOADING });

    fetch('http://localhost:3002/api/providers')
    .then(res => res.json())
    .then(resJson =>
        {
        console.log( resJson.providers, 'res from reducer')
        dispatch({
        type: action.PROVIDER_LOADED,
        payload: resJson.providers
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