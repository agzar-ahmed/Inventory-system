import { API_CALL_FAILED } from "../actions/types"


const toast =(params)=>store=>next=>action=>{
   if(action.type === API_CALL_FAILED){
      console.log("TOAST:",action.payload)
     return next(action)
   }
   next(action)
}

export default toast