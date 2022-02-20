import { toast } from "react-toastify";

const { fetch: originalFetch } = window;

export default window.fetch = async (...args) => {
  let [resource, config] = args;
  console.log(resource,config)
    let response = await originalFetch(
        resource,
        config 
        // {
        //     ...config,
        //     headers:{
        //         ...config.headers,
        //         "Access-Control-Allow-Origin":"*"
        //     }
        // }
        );
    console.log(response,"interceptor response")
    //handel expected errors
    if (!response.ok && response.status >= 400 && response.status<500) { 
      let error = await response.clone().json()
      //console.log(error,'expected error')   
      //console.log(response,"error from inteceptor")
    
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
