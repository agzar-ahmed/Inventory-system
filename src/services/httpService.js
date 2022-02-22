import { toast } from "react-toastify";

const token = localStorage.getItem('token')
const baseURL = process.env.REACT_APP_BASE_URL

const { fetch: originalFetch } = window;
 
// const url = "/user"
//  console.log(data,"data")
// fetch(`${baseURL}${url}`, {
// method: "post", // *GET, POST, PUT, DELETE, etc.
// headers: {
//     'Content-Type': 'application/json'
//     'x-'
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
// body: JSON.stringify(data) // body data type must match "Content-Type" header
// })

export default window.fetch = async (...args) => {
  let [url, config] = args;
  // console.log(url,config,args,'http arguments') 

  const apiURL = `${baseURL}${url}`
  const headers =  {
                      'Content-Type': 'application/json',
                      'x-auth-token': token,
                      // "access-control-allow-origin":"*"
                  }
  // console.log( apiURL,{  headers, ...config },'fetch arguments' )
  let response = await originalFetch(
                                        apiURL,
                                      { 
                                        headers,
                                        ...config
                                      } 
                                        );
    // console.log(response,"interceptor response")
    //handel expected errors
    if (!response.ok && response.status >= 400 && response.status<500) { 
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
