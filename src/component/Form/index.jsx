import React,{Children, useState} from 'react'
import { reach } from 'yup';
import { FormInput } from "../FormFields";

export default function Form ({errors,setErrors,children,onSubmit,dataSchema,initialValues,onChange,doSubmit,labelBtn}) {
  //   const [data,setData] = useState(initialValues)
  //   // const [errors,setErrors] = useState(initialValuesErrors)

  //   const validate=async()=>{
  //       const validationResponse = await dataSchema.validate(data,{ abortEarly: false })
  //       .then(()=>{
  //       //   setBtnDisabled(false)
  //         return false
  //       })
  //       .catch(err=>{
  //       //   setBtnDisabled(false)
  //         const errors = {}
  
  //         err.inner.map(error=>errors[error.path]=error.errors[0])
  //         console.log(errors,"erors")
  //         return errors
  //       })
        
  //       return validationResponse
  //     }
  
  //     const validateProperty=(e)=>{
  //         // const obj = {[e.target.name]:e.target.value};
  //         //extract field [e.target.name] schema from general schema
  //         const schema = reach(dataSchema, [e.target.name])
  
  //         schema.validate(e.target.value)
  //         .then(()=> {
  //               setErrors({
  //                 ...errors,
  //                 [e.target.name]:""
  //               })
  //         })
  //         .catch(err=>{
  //               setErrors({
  //                             ...errors,
  //                             [e.target.name]:err.errors[0]
  //                         })
  //                console.log(err.errors,errors,"validate properties error")
  //           })
  //     }

  //   const handleChange=(e)=>{
  //   validateProperty(e)
  //   // console.log(e.target.value) 
  //   onChange()
  //       // setData({  
  //       //             ...data,
  //       //             [e.target.name]: e.target.value
  //       //         })
  //   // console.log(
  //   //               {  
  //   //                 ...data,
  //   //                 [e.target.name]: e.target.value
  //   //               }
  //   //             )
  //   }

      
  // const handleSubmit=async(e)=>{
  //   e.preventDefault(); // stops default reloading behaviour

  //   const validationErrors = await validate();

  //   setErrors({errors,...validationErrors })
  //   console.log(errors,"errors",validationErrors,'validationErrors')

  //   if(validationErrors)return;

  //  doSubmit()
  //}
//   const doSubmit=()=>{
//       console.log("submitted")
//   }
// const {productName,purchaseDate,
//     purchasePrice,expirationDate,
//     quantity,description,sku,
//     productImg,productTypeId,sizeId,
//     manufacturerId,providerId,minLevel,
//     inventoryId} = data

    
    return (
        <div>
            <form className="formContent" onSubmit={onSubmit}>
              {children}
              {labelBtn && <button  className="btn btnSubmit" onClick={onSubmit}>{labelBtn}</button>}
            </form>
        </div>
    )
}

