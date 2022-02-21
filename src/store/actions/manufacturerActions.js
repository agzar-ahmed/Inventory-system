import * as action from './types';
import { apiCallBegan } from './apiActions';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};



 export const getManufacturers = () => (dispatch, getState) => {

    dispatch(
        apiCallBegan({
            url:'/manufacturers',
            // method:'get',
            // data:{},
            onStart: action.MANUFACTURER_LOADING,
            onSuccess: action.MANUFACTURER_LOADED,
            onError: action.MANUFACTURER_ERROR
        })
    );
    //     //category loading
    // dispatch({ type: action.MANUFACTURER_LOADING });

    // fetch('http://localhost:3002/api/manufacturers')
    // .then(res => res.json())
    // .then(resJson =>
    //     {
    //    // console.log( resJson.manufacturers, 'res from reducer')
    //     dispatch({
    //     type: action.MANUFACTURER_LOADED,
    //     payload: resJson.manufacturers
    //     }) }
    // )

    // .catch(err => {
    //     // dispatch(returnErrors(err.response.data, err.response.status,'PRODUCT_TYPE_ERROR'));
    // }); 
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