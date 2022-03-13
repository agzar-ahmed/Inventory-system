import * as action from './types';
import { apiCallBegan } from './apiActions';


 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    // return {
    //     type: GET_ERRORS,
    //     payload: {msg, status, id}
    // };
};

export const addProductType= ({data}) => (dispatch, getState)=>{

    
 }

 //get name from th link then get list of products that is sharing the same category parentId
 export const getProductTypes = () => (dispatch, getState) => {

    dispatch(
        apiCallBegan({
                  url:'/itemTypes',
                  // method:'get',
                  // data:{},
                  onStart: action.PRODUCT_TYPE_LOADING,
                  onSuccess: action.PRODUCT_TYPE_LOADED,
                  onError:action.PRODUCT_TYPE_ERROR
        })
    )
    // //category loading
    // dispatch({ type: action.PRODUCT_TYPE_LOADING });

    // fetch('http://localhost:3002/api/itemTypes')
    // .then(res => res.json())
    // .then(resJson =>
    //     //console.log(res, 'res from reducer')
    //     dispatch({
    //     type: action.PRODUCT_TYPE_LOADED,
    //     payload: resJson.itemTypes
    //     }) 
    // )

    // .catch(err => {
    //     // 
    //     //err && dispatch(returnErrors(err.response.data, err.response.status,'PRODUCT_TYPE_ERROR'));
    // }); 
}

export function deleteProductType(id){
    return{
             type: action.DELETE_PRODUCT_TYPE,
               
         }
 }
export function clearProductType(){
    return{
             type: action.CLEAR_PRODUCT_TYPE       
         }
 }