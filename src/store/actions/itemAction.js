import * as action from './types';
import { apiCallBegan,apiCallFailed } from './apiActions';
import { userLogout } from '../../services/authService'
import { toast } from 'react-toastify';


async function reorderState (state){
  var obj = {};
  state.map(k => obj[k.id] = k)
  return obj
 }
  

export const getItems = () => (dispatch, getState) => {
    // dispatch({ type: action.ITEMS_LOADING });
    dispatch(
        apiCallBegan({
                  url:'/items',
                  // method:'get',
                  // data:{},
                  onStart: action.ITEMS_LOADING,
                  onSuccess: action.ITEMS_LOADED,
                  onError:action.ITEMS_ERROR
        })
    )
}

export const deleteItem = (id) => (dispatch, getState) => {
  // dispatch({ type: action.ITEMS_LOADING });
  console.log(id,'id from itemDelete action')
      dispatch(
          apiCallBegan({
                    url:`/items/${id}`,
                    method:'delete',
                    index:id,
                    // data:{},
                    onStart: action.ITEMS_LOADING,
                    onSuccess: action.DELETE_ITEMS,
                    onError:action.ITEMS_ERROR
          })
      )
}

export const createItems = (data) => (dispatch, getState) => {
    
  console.log(data,'data')
  const baseURL = process.env.REACT_APP_BASE_URL
  const url ='/item'
  const method= "POST"
  dispatch({ type: action.ITEMS_LOADING })
  /* Mulipart fom data */
  const formData  = new FormData();

  for(const name in data) {
    console.log(data[name])
    if(typeof(data[name]) == "object"){
      console.log("I get one object")
      //check datatype to get productImg array to send every picture file as dataform 
      data[name].map(file => formData.append(name, file))
    }
    formData.append(name, data[name]);
  }
/* Mulipart fom data */
    //we move this down to dispatch onStart action (loading indecators must of the time)
    //first be we do API_CALL_BEGAN
    //next(action)//API_CALL_BEGAN passed to other middlewares
    console.log(formData,'formData')
    fetch(`${baseURL}${url}`, {
        method, // *GET, POST, PUT, DELETE, etc.
        headers: {
        //make sure not to set the Content-Type header. The browser will set it for you, including the boundary parameter.
          'x-auth-token': localStorage.getItem('token')
        },
        body: formData // body data type must match "Content-Type" header   
      })
    .then(async(response) => {
      //check client error
      if (!response.ok && response.status >= 400 && response.status<500) { 
        //authentication error (token expire ,No token) redirect user to login
        response.status == 403 && userLogout()
        const error = await response.clone().json()
        console.log(error,"client error");
        return Promise.reject(error);
      
      }
      //check if it is creation status  201 to show toast creation success 
      if(response.status == 201) {
        toast.success('Created successfully' , {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
          });
        
      }
      return response.json()
    })
    .then(async(resJson) =>
        {
        console.log( resJson,'res from reducer')
        // const reorderRes = await reorderState(resJson)
        dispatch({
                    type: action.ADD_ITEMS,
                    payload: resJson
                    })
        //general
        // dispatch(apiCallSuccess(resJson))
        //spacefic
        // if(onSuccess) dispatch({type: onSuccess, payload:resJson})
        }
        
    ) 
    .catch(err => {
        //general error
        dispatch(apiCallFailed(err.message || 'Something bad happened'));
        //specific error
        dispatch({type: action.ITEMS_ERROR, payload:err.message || 'Something bad happened'})
    }); 
 
 }


export const updateItems = (data) => (dispatch, getState) => {
    
  // console.log(data,'data')
  const baseURL = process.env.REACT_APP_BASE_URL
  const url =`/item/${data.id}`
  const method= "PUT"
  dispatch({ type: action.ITEMS_LOADING })
    /* Mulipart fom data */
    const formData  = new FormData();

    for(const name in data) {
    
      // console.log(data[name],'key bfore condition')

      if(data[name]!=null && typeof(data[name])== "object"){
        console.log(data[name],'key after condition')
        //check datatype to get productImg array to send every picture file as dataform 
        data[name].map(file => formData.append(name, file))
      }
      // if(data[name]!=null )
      formData.append(name, data[name]);
    }
  /* Mulipart fom data */
    //we move this down to dispatch onStart action (loading indicators must of the time)
    //first be we do API_CALL_BEGAN
    //next(action)//API_CALL_BEGAN passed to other middlewares
    fetch(`${baseURL}${url}`, {
        method, // *GET, POST, PUT, DELETE, etc.
        headers: {
        //make sure not to set the Content-Type header. The browser will set it for you, including the boundary parameter.
          'x-auth-token': localStorage.getItem('token')
        },
        body: formData // body data type must match "Content-Type" header   
      })
    .then(async response => {
      //check client error
      if (!response.ok && response.status >= 400 && response.status<500) { 
        if(response.status == 403) {  
                                  userLogout()
                                  }
        const error = await response.clone().json()
        console.log(error,"client error");
        return Promise.reject(error);
      }
      //check if it is success status  20 to show toast Updated success 
      if(response.status == 200) {
        toast.success('Updated successfully' , {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
          });
        
      }

      return response.json()
    })
    .then(resJson =>
        {
      
        dispatch({
                    type: action.UPDATE_ITEMS,
                    payload: resJson
                    })
        //general
        // dispatch(apiCallSuccess(resJson))
        //spacefic
        // if(onSuccess) dispatch({type: onSuccess, payload:resJson})
        }
        
    ) 
    .catch(err => {
     //general error
     dispatch(apiCallFailed(err.message || 'Something bad happened'));
     //specific error
     dispatch({type: action.ITEMS_ERROR, payload:err.message || 'Something bad happened'})
    }); 

}
