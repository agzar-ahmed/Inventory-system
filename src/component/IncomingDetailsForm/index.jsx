import React,{useState,useEffect} from 'react'
import './style.css'
import Form from '../Form';
import {FormInput, FormSelect} from "../FormFields"
import { incomingDetailsSchema } from '../../validations/productValidation';
import { handleChange, handleSubmit} from '../Form/formFunctions';

import { updateIncomingPurchaseDetails } from '../../store/actions/incomingPurchaseActions';

import {itemsSelector} from '../../store/selectors/itemSelector';

import { useDispatch,useSelector } from 'react-redux';
import { date } from 'yup';
import { toast } from 'react-toastify';

function IncomingDetailsForm( {itemToUpdate,closeModal,addToTable}) {
 
  console.log(itemToUpdate,'itemToUpdate')
   let initialState = {
      itemId:'',ordredQuantity:'',incomingQuantity:'',
      reste:'',totalExTax:"",VATRate:'',discount:'',totalIncTax:"",unitPrice:''
      //,userId:"26"
    }
    const [data,setData] = useState(itemToUpdate ? itemToUpdate : initialState);
    const [errors,setErrors] = useState(
        {
            itemId:'',ordredQuantity:'',incomingQuantity:'',
            reste:'',totalExTax:"",VATRate:"",discount:"",totalIncTax:"",unitPrice:''
        }
      );

    const itemData = useSelector(itemsSelector());
    const itemsList = itemData.byIds != undefined && Object.values(itemData.byIds)
    

    const inputChange =e=> handleChange(e,data,setData,incomingDetailsSchema,errors,setErrors);
    
    const dispatch = useDispatch()
    const onSubmit = () =>{
    
    //Update
     if( itemToUpdate ) {
    // addToTable(data)
      dispatch(updateIncomingPurchaseDetails(data))
      toast.success(`${itemData.byIds[data.itemId].name} updated `,{
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      // theme: "colored"
                      })
      closeModal(true)
      setData(initialState)
      return
     }
     //create
     toast.success(`${itemData.byIds[data.itemId].name} Added to table `,{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // theme: "colored"
      })
      addToTable(data)
      setData(initialState)
  }
    const formSubmit = e => handleSubmit(e,data,incomingDetailsSchema,errors,setErrors,onSubmit)
    
    // useEffect(()=>{
    //   setData({})
    // },[])
    const{  itemId,ordredQuantity,incomingQuantity,
    reste,totalExTax,VATRate,discount,totalIncTax,unitPrice } = data
    console.log(data,'dataToupdate')
  return ( 
            <Form
                    dataSchema={incomingDetailsSchema}
                    initialValues={data}
                    initialValuesErrors={errors}
                    // onChange={productTypeId}
                    onSubmit={formSubmit}
                    labelBtn={itemToUpdate !== undefined ? "Update":"Add Item"}
                    errors = {errors}
                    setErrors = {setErrors}
            >
              <div className=''>
              <div  className='item-column'>
                <div className="input-row">
                
                {itemToUpdate ?    
                <FormInput
                                readOnly
                                label="Product" 
                                value={itemData.byIds[itemToUpdate.itemId].name } 
                                                        
                /> 
                :
                <FormSelect
                                label="Product"
                                name="itemId" 
                                value={itemId}
                                onChange={inputChange}
                                onBlur={inputChange}
                                options={itemsList}
                                errorMessage={errors.itemId}
                                buttonTittle="Add new"
                                // ButtonClick={()=>setShowModalItemType(true)}       
                    /> 
                } 
                <div></div>    

                </div>
                   
              </div>
                  <div className='input-row'>
                    <FormInput
                                label="Ordred Quantity" 
                                type="number" 
                                placeholder="Product name" 
                                name="ordredQuantity" 
                                value={ordredQuantity} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.ordredQuantity}
                    />
                    
                    <FormInput
                                label="Incoming Quantity"
                                type="number" 
                                placeholder="Incoming Quantity" 
                                name="incomingQuantity" 
                                value={incomingQuantity} 
                                onChange={e=>{ 
                                  handleChange(e,data,setData,incomingDetailsSchema,errors,setErrors);
                                  setData({
                                    ...data,
                                    [ e.target.name ]: e.target.value,
                                    reste:  ordredQuantity - e.target.value
    
                                  })}
                                }
                                onBlur={inputChange}
                                errorMessage={errors.incomingQuantity}
                                // required
                    />    
                    

                    <FormInput
                                readOnly
                                label="Reste"
                                type="number" 
                                placeholder="Reste Quantity" 
                                name="reste" 
                                value={reste} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.reste}
                                // required
                    /> 
                                  
                </div>
              </div>
              <div className='input-row'>
               
                <FormInput
                            label="Unit Price"
                            type="number" 
                            placeholder="unit Price" 
                            name="unitPrice" 
                            value={unitPrice}
                            onChange={e=>{ 
                              handleChange(e,data,setData,incomingDetailsSchema,errors,setErrors);
                              setData({
                                ...data,
                                [ e.target.name ]: e.target.value,
                                totalExTax:  incomingQuantity*e.target.value,
                                totalIncTax:  incomingQuantity*e.target.value,
                                discount: 0

                              })
                            }}
                            onBlur={inputChange}
                            errorMessage={errors.unitPrice}
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />

                    <FormInput
                            readOnly
                            label="Total ExTax"
                            type="number" 
                            placeholder="Total excluding Tax" 
                            name="totalExTax" 
                            value={totalExTax}
                            onChange={inputChange}
                            onBlur={inputChange}
                            errorMessage={errors.totalExTax}
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />

                     <FormInput
                            label="VAT (%)"
                            type="number" 
                            placeholder="Value Added Tax" 
                            name="VATRate" 
                            value={VATRate}
                            onChange={e=>{ 
                              handleChange(e,data,setData,incomingDetailsSchema,errors,setErrors);
                              setData({
                                ...data,
                                [ e.target.name ]: e.target.value,
                                totalIncTax: incomingQuantity*unitPrice + incomingQuantity*unitPrice*e.target.value*0.01 

                              })
                            }}
                            onBlur={inputChange}
                            errorMessage={errors.VATRate}
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />
                   
                </div>
                <div className="input-row">
                    
                <FormInput
                            label="Discount"
                            type="number" 
                            placeholder="discount" 
                            name="discount" 
                            value={discount}
                            onChange={e=>{ 
                              handleChange(e,data,setData,incomingDetailsSchema,errors,setErrors);
                              setData({
                                ...data,
                                [ e.target.name ]: e.target.value,
                                totalIncTax:  incomingQuantity*unitPrice + incomingQuantity*unitPrice*VATRate*0.01 - e.target.value

                              })
                            }}
                            onBlur={inputChange}
                            errorMessage={errors.discount}
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />
                     <FormInput
                            readOnly
                            label="Total IncTax"
                            type="number" 
                            placeholder="Total including Tax" 
                            name="totalIncTax" 
                            value={totalIncTax}
                            // onChange={inputChange}
                            // onBlur={inputChange}
                            errorMessage={errors.totalIncTax}
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />
                </div>
         
            </Form>
        
    )
}

export default IncomingDetailsForm
