import React,{useState} from 'react'
import './style.css'
import Form from '../Form';
import {FormInput, FormSelect} from "../FormFields"
import { itemSchema } from '../../validations/productValidation';
import {productTypeSelector} from '../../store/selectors/productTypeSelector';
import {sizeSelector} from '../../store/selectors/sizeSelector';
import { handleChange, handleSubmit} from '../Form/formFunctions';
import ImagWidget from '../ImageWidget';
import { createItems } from '../../store/actions/itemAction';

import { useDispatch,useSelector } from 'react-redux';

function Item() {
    const [data,setData] = useState(
        {
          name:'',description:'',sku:'',
          productImg:'',ItemTypeId:"",SizeId:"",CompanyId:"2",userId:"3"
        }
      );
    const [errors,setErrors] = useState(
        {
          name:'',description:'',sku:'',
          productImg:'',ItemTypeId:'',SizeId:''
        }
      );

    const itemTypes = useSelector(productTypeSelector())
    const sizes = useSelector(sizeSelector())

  //  const handelOnChange=
   //(e,setter)=>{
    //     setter({  
    //                     ...data,
    //                     [e.target.name]: e.target.value
    //                 })
    // }

    const inputChange =e=> handleChange(e,data,setData,itemSchema,errors,setErrors);
    
    const dispatch = useDispatch()
    const onSubmit = () =>{
      dispatch(createItems(data))
      setData({
        name:'',description:'',sku:'',
      productImg:'',productTypeId:'DEFAULT',SizeId:'',CompanyId:"2",userId:"3"
      })
  }
    const formSubmit = e => handleSubmit(e,data,itemSchema,errors,setErrors,onSubmit)
    
    const{ name, description,sku,
    productImg,ItemTypeId,SizeId } = data
  return ( 
            <Form
                    dataSchema={itemSchema}
                    initialValues={data}
                    initialValuesErrors={errors}
                    // onChange={productTypeId}
                    onSubmit={formSubmit}
                    labelBtn={"Add Item"}
                    errors = {errors}
                    setErrors = {setErrors}
            >
              {console.log(sizes)}
              <div className='item-form'>
                <div className='item-column'>
                  <ImagWidget 
                            data={data} 
                            setData={setData} 
                            maxPicture={3}  
                            value={productImg} 
                            // onChange={inputChange}
                            // onBlur={inputChange}
                            errors={errors}
                            setErrors = {setErrors}
                  />
                </div>

                <div className='item-column'>
                    <FormInput
                                label="name" 
                                placeholder="Product name" 
                                name="name" 
                                value={name} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.name}
                    />
                    
                    <FormInput
                        label="SKU"
                        type="text" 
                        placeholder="Serial number" 
                        name="sku" 
                        value={sku} 
                        onChange={inputChange}
                        onBlur={inputChange}
                        errorMessage={errors.sku}
                        // required
                    />    
                     <FormSelect
                          label="Product Type"
                          name="ItemTypeId" 
                          value={ItemTypeId}
                          onChange={inputChange}
                          onBlur={inputChange}
                          options={itemTypes}
                          errorMessage={errors.ItemTypeId}
                          buttonTittle="Add new"
                          // ButtonClick={()=>setShowModalItemType(true)}       
                    />                
                </div>
              </div>
              <div className='input-row'>
                <div  className='item-column'>
                    <FormSelect
                            label="Size"
                            name="SizeId" 
                            value={SizeId}
                            onChange={inputChange}
                            onBlur={inputChange}
                            options={sizes}
                            errorMessage={errors.SizeId}
                            buttonTittle="Add new"
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />
                </div>
                <div className="item-column">
                    <FormInput
                            label="Description"
                            type="text" 
                            placeholder="Description" 
                            name="description" 
                            value={description} 
                            onChange={inputChange}
                            onBlur={inputChange}
                            errorMessage={errors.description}
                      />  
                </div>
              </div>
         
            </Form>
        
    )
}

export default Item
