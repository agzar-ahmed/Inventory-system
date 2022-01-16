import * as action from './types';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getInventories = () => (dispatch, getState) => {
        //category loading
    dispatch({ type: action.INVENTORY_LOADING });

    fetch('http://localhost:3002/api/inventories')
    .then(res => res.json())
    .then(resJson =>
        {
        // console.log( resJson.inventories, 'res from reducer')
        dispatch({
        type: action.INVENTORY_LOADED,
        payload: resJson.inventories
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