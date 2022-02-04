import { API_CALL_FAILED, API_CALL_SUCCESS } from "../actions/types"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const notify = () => toast("Wow so easy!");

const toastMiddleware =(params)=>store=>next=>action=>{
   if(action.type === API_CALL_FAILED){
      console.log("TOAST:",action.payload)
      toast.error(action.payload, {
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored"
   });
   return next(action)
   }
  
   
   next(action)
}

export default toastMiddleware