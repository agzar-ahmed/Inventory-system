import { reach } from 'yup';

export const onChange=(e,data,setter)=>{
    setter({  
                    ...data,
                    [e.target.name]: e.target.value
                })
}

export const validateData =async(data,dataSchema)=>{
    const validationResponse = await dataSchema.validate(data,{ abortEarly: false })
    .then(()=>{
      return false
    })
    .catch(err=>{
      const errors = {}
      err.inner.map(error=>errors[error.path]=error.errors[0]) 
      return errors
    })
    
    return validationResponse
  }

export const validateProperty=(e,dataSchema,errors,setErrors)=>{
      const schema = reach(dataSchema, [e.target.name])
      schema.validate(e.target.value)
      .then(()=> {
            setErrors({
              ...errors,
              [e.target.name]:""
            })
      })
      .catch(err=>{
            setErrors({
                  ...errors,
                  [e.target.name]:err.errors[0]
            })
       })
       console.log(errors,"errors")
  }

export const handleChange=(e,data,setter,dataSchema,errors,setErrors)=>{
   validateProperty(e,dataSchema,errors,setErrors)
   console.log(data)
   onChange(e,data,setter)
}

      
export const handleSubmit=async(e,data,dataSchema,errors,setErrors,onSubmit)=>{
    e.preventDefault(); // stops default reloading behaviour
    console.log(e,"event")
    const validationErrors = await validateData(data,dataSchema);

    setErrors({errors,...validationErrors })

    console.log(validationErrors,"validationErrors")
    console.log(data,"submitted data")
    if(validationErrors) return;
    
    onSubmit()
}