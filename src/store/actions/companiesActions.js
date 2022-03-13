import * as action from './types';
import { apiCallBegan } from './apiActions';

 export const getCompanies = () => (dispatch, getState) => {
  // dispatch({ type: action.ITEMS_LOADING });
      dispatch(
          apiCallBegan({
                    url:'/companies',
                    // method:'get',
                    // data:{},
                    onStart: action.COMPANIES_LOADING,
                    onSuccess: action.COMPANIES_LOADED,
                    onError:action.COMPANIES_ERROR
          })
      )
 }

 export const postCompanies = (data) => (dispatch, getState) => {
    // dispatch({ type: action.ITEMS_LOADING });
        dispatch(
            apiCallBegan({
                      url:'/companies',
                      method:'post',
                      data,
                      onStart: action.COMPANIES_LOADING,
                      onSuccess: action.ADD_COMPANIES,
                      onError:action.COMPANIES_ERROR
            })
        )
   }