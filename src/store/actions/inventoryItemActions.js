import * as action from './types';
import { apiCallBegan } from './apiActions';

 export const getInventoryItems = () => (dispatch, getState) => {
  // dispatch({ type: action.ITEMS_LOADING });
      dispatch(
          apiCallBegan({
                    url:'/inventoriesItems',
                    // method:'get',
                    // data:{},
                    onStart: action.INVENTORYITEM_LOADING,
                    onSuccess: action.INVENTORYITEM_LOADED,
                    onError:action.INVENTORYITEM_ERROR
          })
      )
 }

 export const postInventoryItems = (data) => (dispatch, getState) => {
    // dispatch({ type: action.ITEMS_LOADING });
        dispatch(
            apiCallBegan({
                      url:'/inventoriesItems',
                      method:'post',
                      data,
                      onStart: action.INVENTORYITEM_LOADING,
                      onSuccess: action.INVENTORYITEM_LOADED,
                      onError:action.INVENTORYITEM_ERROR
            })
        )
   }