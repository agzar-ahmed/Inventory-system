import React,{useState} from 'react'
import './style.css'
import Form from '../Form';
import {FormInput, FormSelect} from "../FormFields"
import { itemSchema } from '../../validaions/productValidation';
import {productTypeSelector} from '../../store/selectors/productTypeSelector';
import {sizeSelector} from '../../store/selectors/sizeSelector';
import { handleChange, handleSubmit} from '../../component/Form/formFunctions';
import ImagWidget from '../ImageWidget';

import { useDispatch,useSelector } from 'react-redux';

function item() {
    const [data,setData] = useState(
        {
          productName:'',description:'',sku:'',
          productImg:'',productTypeId:'',sizeId:'' 
        }
      );
    const [errors,setErrors] = useState(
        {
          productName:'',description:'',sku:'',
          productImg:'',productTypeId:'',sizeId:''
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
    
    const onSubmit = () =>{setData({
      productName:'',description:'',sku:'',
      productImg:'',productTypeId:'DEFAULT',sizeId:''
    })}
    const formSubmit = e => handleSubmit(e,data,itemSchema,errors,setErrors,onSubmit)
    
    const{ productName, description,sku,
    productImg,productTypeId,sizeId } = data
  return ( 

            <Form
                    dataSchema={itemSchema}
                    initialValues={data}
                    initialValuesErrors={errors}
                    // onChange={productTypeId}
                    onSubmit={formSubmit}
                    labelBtn={"Add Item"}t
                    errors = {errors}
                    setErrors = {setErrors}
            >
              <div className='item-form'>
              <ImagWidget data={data} setData={setData} maxPicture={3} />
              <div>
                <FormInput
                            label="name" 
                            placeholder="Product name" 
                            name="productName" 
                            value={productName} 
                            onChange={inputChange}
                            onBlur={inputChange}
                            errorMessage={errors.productName}
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
                                name="productTypeId" 
                                value={productTypeId}
                                onChange={inputChange}
                                onBlur={inputChange}
                                options={itemTypes}
                                errorMessage={errors.productTypeId}
                                buttonTittle="Add new"
                                // ButtonClick={()=>setShowModalItemType(true)}       
                />

                <FormSelect
                                label="Size"
                                name="sizeId" 
                                value={sizeId}
                                onChange={inputChange}
                                onBlur={inputChange}
                                options={sizes}
                                errorMessage={errors.sizeId}
                                buttonTittle="Add new"
                                // ButtonClick={()=>setShowModalSize(true)}       
                />

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

export default item
