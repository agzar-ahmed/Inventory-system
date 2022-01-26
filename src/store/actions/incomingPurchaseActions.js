import * as action from './types';
import { apiCallBegan } from './apiActions';

 export const getIncomingPurchases = () => (dispatch, getState) => {
  // dispatch({ type: action.ITEMS_LOADING });
      dispatch(
          apiCallBegan({
                    url:'/incomingpuchase',
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
                      url:'/incomingpuchase',
                      method:'post',
                      data,
                      onStart: action.INCOMING_PURCHASES_LOADING,
                      onSuccess: action.INCOMING_PURCHASES_LOADED,
                      onError:action.INCOMING_PURCHASES_ERROR
            })
        )
   }