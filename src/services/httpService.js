/****************************interceptor  *****************************/
/**********************************************************************/
import { toast } from "react-toastify";
import {userLogout} from "./authService"

const token = localStorage.getItem('token')
const baseURL = process.env.REACT_APP_BASE_URL

const { fetch: originalFetch } = window;

export default  async (...args) => {
  let [url,config] = args;
  console.log(url,config,args,token,'http arguments') 
  /************ header ********************/
  //get custom configuration 
  let customHeader =[]
  //check custom header exist
  if(config){
      if (config.hasOwnProperty('headers')) customHeader =  {...config.headers}
  }
 
  const apiURL = `${baseURL}${url}`
  const headers =  {
                      'Content-Type': 'application/json',
                       'x-auth-token': token,
                      // "access-control-allow-origin":"*",
                       ...customHeader
                  }
  console.log(headers,apiURL,config,"http header")
  let response = await originalFetch(
                                        apiURL,
                                      { 
                                        headers,
                                        ...config
                                      } 
                                        );
    if (!response.ok && response.status >= 400 && response.status<500) { 
      //authentication error (token expire ,No token) redirect user to login
      //check if path name is note login to avoid infinite loop cause we check token when we login component mount
      console.log(window.location.pathname,window.location.pathname != '/login' )
        window.location.pathname != '/login' && response.status == 403 && userLogout()
      let error = await response.clone().json()
      // console.log(error,"interceptor 400 error")
    
    /*************************if you need to show expected error********/
    //   const errKeys =  Object.keys(error.message)
    //     toast.error(typeof(error.message) =='object' ? error.message[errKeys[0]] : error.message, {
    //         position: "bottom-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored"
    //     });
       return Promise.reject(error);
    }
    return response;
  
};
