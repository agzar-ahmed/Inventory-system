import * as action from './types';
import { apiCallBegan } from './apiActions';

 export const getStock = () => (dispatch, getState) => {
      dispatch(
          apiCallBegan({
                    url:'/stock',
                    onStart: action.STOCK_LOADING,
                    onSuccess: action.STOCK_LOADED,
                    onError:action.STOCK_ERROR
          })
      )
 }

 export const getStockByInventories = () => (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                      url:'/stock/inventories',
                      onStart: action.STOCK_LOADING,
                      onSuccess: action.STOCKBYINVENTORY_LOADED,
                      onError:action.STOCK_ERROR
            })
        )
   }

export const postInventoryItems = (data) => (dispatch, getState) => {
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

export const deleteInventoryItems = (id) => (dispatch, getState) => {
    console.log(id,'deleteInventoryItems')
        dispatch(
            apiCallBegan({
                      url:`/inventoriesItems/${id}`,
                      method:'delete',
                      index:id,
                      onStart: action.INVENTORYITEM_LOADING,
                      onSuccess: action.DELETE_INVENTORYITEM ,
                      onError:action.INVENTORYITEM_ERROR
            })
        )
   }

export const updateInventoryItems = (alldata) => (dispatch, getState) => {
    console.log(alldata,'updateInventoryItems')
    const { id,...data } = alldata
    dispatch(
        apiCallBegan({
                    url:`/inventoriesItems/${id}`,
                    method:'put',
                    data,
                    onStart: action.INVENTORYITEM_LOADING,
                    onSuccess: action.UPDATE_INVENTORYITEM,
                    onError:action.INVENTORYITEM_ERROR
        })
    )
}