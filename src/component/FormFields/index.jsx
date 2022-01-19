import React,{useState,useRef} from 'react';
import './style.css'

export function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, htmlFor, displayInput, ...inputProps } = props;
  
    const handleFocus = (e) => {
      setFocused(true);
    };
  
    const displayNone={display:'none'}

    return (
      <div className="inputBox">
        <div>
          <label htmlFor={htmlFor}>{label}</label>
        </div>
        <div>
            <input
              {...inputProps}
              onChange={onChange}
                
              // onBlur={handleFocus}
            //   onFocus={() =>
            //     inputProps.name === "confirmPassword" && setFocused(true)
            //   }
              focused={focused.toString()}
              className={errorMessage ? "error": ""}
            /> 
            <span className='error'>{errorMessage}</span>
        </div>
      </div>
    )
}


export function FileForm(props) {
  const { label, errorMessage, onChange, htmlFor, displayInput, ...inputProps } = props;
  const imgRef = useRef()
  return (
    <div>
     <label 
          onClick={()=>{
            console.log(imgRef.current,"input Ref")
            imgRef.current.click()
          }} 
          htmlFor="file1"> 
         {label}
          {/* <AddPhotoAlternate className="imgIcon"/>  */}
      </label>
      <input 
          ref={imgRef} 
          {...inputProps}
          onChange={onChange}
            
          // onBlur={handleFocus}
        //   onFocus={() =>
        //     inputProps.name === "confirmPassword" && setFocused(true)
        //   }
          className={errorMessage ? "error": ""}
          // onChange={handelPicture} 
          style={{display:'none'}}
      />
      <span className='error'>{errorMessage}</span>
    </div>
  )
}


export function FormSelect(props) {
 
  
  const [focused, setFocused] = useState(false);
  const { label, value,errorMessage, onChange, options, ButtonClick, buttonTittle, id, htmlFor, ...inputProps } = props;

  const [ formValue,setFormValue ] = useState(value) 
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="inputRow">
        <div className="inputBox">
          <div>
            <label htmlFor={htmlFor}>{label}</label>
          </div>
 
          <div>
          <select 
                  {...inputProps} 
                  // onBlur={handleFocus} 
                  onChange={onChange} 
                  focused={focused.toString()}
                  value={value? value: "DEFAULT"}
                  //make shure o use to use value instead of defaultValue
                  //Changing the value of defaultValue attribute 
                  //after a component has mounted will not cause any update of the value in the DOM.
                  className={errorMessage ? "error": ""}
          >
                    {console.log(value,"options,value")}
                    <option value="DEFAULT" disabled>Choose a value ...</option>
                    {options ? 
                    options.map((option)=><option value={Number(option.id)} key={option.id}>{option.name}</option>)
                    :<option>Loading...</option>
             }               
                   
              </select>
         {/* { options?
         //We did this to render the selected value when we have initial selectd value
         //and when we submit the form we want to select the default value
         //It doen't want to work without this initial condition
             (<select 
                            {...inputProps} 
                            // onBlur={handleFocus} 
                            onChange={onChange} 
                            focused={focused.toString()}
                            value={value? value: "DEFAULT"}
                            className={errorMessage ? "error": ""}
              >
                    {console.log(value,"options,value")}
                    <option value="DEFAULT" disabled>Choose a value ...</option>
                    {options && options.map((option)=><option value={Number(option.id)} key={option.id}>{option.name}</option>)}               
                   
              </select>)
              :
              (
                <div>Loading...</div>
              // <select 
              //   {...inputProps} 
              //   // onBlur={handleFocus} 
              //   onChange={onChange} 
              //   focused={focused.toString()}
              //   defaultValue={'DEFAULT'}
              //   className={errorMessage ? "error": ""}
              // >
              // <option value="DEFAULT" disabled>Loading...</option>               
              // </select>
              )
              } */}
              <span className='error'>{errorMessage}</span>
          </div>   
      
       
          <button className="inputBtn" onClick={ButtonClick}>{buttonTittle}</button>                      
      </div>
  </div>
  )
}

