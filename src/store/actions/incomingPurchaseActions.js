import * as action from './types';
import { apiCallBegan } from './apiActions';

 export const getIncomingPurchases = () => (dispatch, getState) => {
  // dispatch({ type: action.ITEMS_LOADING });
      dispatch(
          apiCallBegan({
                    url:'/incomingpurchases',
                    // method:'get',
                    // data:{},
                    onStart: action.INCOMING_PURCHASES_LOADING,
                    onSuccess: action.INCOMING_PURCHASES_LOADED,
                    onError:action.INCOMING_PURCHASES_ERROR
          })
      )
 }

 export const postIncomingPurchases = (data) => (dispatch, getState) => {
    // dispatch({ type: action.ITEMS_LOADING });
        dispatch(
            apiCallBegan({
                      url:'/incomingpurchases',
                      method:'post',
                      data,
                      onStart: action.INCOMING_PURCHASES_LOADING,
                      onSuccess: action.ADD_INCOMING_PURCHASES,
                      onError:action.INCOMING_PURCHASES_ERROR
            })
        )
   }




 /******************************************************** IncomingPurchasesDetails *****************************/  
   
 export const getIncomingPurchaseDetails = (incomingId) => (dispatch, getState) => {
    // dispatch({ type: action.ITEMS_LOADING });
        dispatch(
            apiCallBegan({
                      url:`/incomingpurchasedetails/${incomingId}`,
                      // method:'get',
                      // data:{},
                      onStart: action.INCOMING_PURCHASES_DETAILS_LOADING,
                      onSuccess: action.INCOMING_PURCHASES_DETAILS_LOADED,
                      onError:action.INCOMING_PURCHASES_DETAILS_ERROR
            })
        )
   }

export const updateIncomingPurchaseDetails = (updatedDetails) => (dispatch, getState) => {
    // dispatch({ type: action.ITEMS_LOADING });
        dispatch(
            { 
                type: action.UPDATE_INCOMING_PURCHASES_DETAILS,
                payload: updatedDetails
            }
        )
   }