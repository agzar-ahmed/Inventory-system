import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';


import Form from '../Form';
import {FormInput, FormSelect} from "../FormFields"
import { inventoryItemSchema } from '../../validations/inventoryItemValidation';
import { handleChange, handleSubmit} from '../Form/formFunctions';
import './style.css';

import { updateInventoryItems } from '../../store/actions/stockActions';

import { inventorySelector } from '../../store/selectors/inventorySelector';
import { itemsSelector } from '../../store/selectors/itemSelector';


function InventoryItem ({inventoryItem,closeUpdateModal}) {


    let initialState ={}
    inventoryItem ? 
    initialState = {
    id:inventoryItem.id,
    inventoryId:String(inventoryItem.Inventory.id),
    itemId: String(inventoryItem.Item.id) ,
    totalQuantity: Number(inventoryItem.totalQuantity)
    }
    :
    initialState = {
      inventoryId:"",itemId:"",totalQuantity:""
    }
    const dispatch = useDispatch()

    const [data,setData] = useState(initialState);

    const [errors,setErrors] = useState(
        {
           inventoryId:"",itemId:"",totalQuantity:""
        }
      );

    const inventories = Object.values(useSelector(inventorySelector()))
    // console.log(Object.values(useSelector(inventorySelector())),'selector')
    
    const items = Object.values(useSelector(itemsSelector()))
    // console.log(Object.values(useSelector(itemsSelector())),'selector')
    

    const inputChange =e=> handleChange(e,data,setData,inventoryItemSchema,errors,setErrors);
    
    

    const onSubmit = () =>{
      //Update
      dispatch(updateInventoryItems({ 
        id:data.id,
        inventoryId:String(data.inventoryId),
        itemId: String(data.itemId) ,
        totalQuantity: Number(data.totalQuantity)
      }))
      closeUpdateModal(true)
    }
    const formSubmit = e => handleSubmit(e,data,inventoryItemSchema,errors,setErrors,onSubmit)
    
    const{ inventoryId,itemId,totalQuantity} = data

  return ( 
            <Form
                    dataSchema={inventoryItemSchema}
                    initialValues={data}
                    initialValuesErrors={errors}
                    // onChange={productTypeId}
                    onSubmit={formSubmit}
                    labelBtn={"Update"}
                    errors = {errors}
                    setErrors = {setErrors}
            >
            
                <div className='item-column'>
                    <FormSelect
                            label="Product"
                            name="itemId" 
                            value={itemId}
                            onChange={inputChange}
                            onBlur={inputChange}
                            options={items}
                            errorMessage={errors.itemId}
                            buttonTittle="Add new"
                            // ButtonClick={()=>setShowModalSize(true)}       
                    />
  
                    <FormSelect
                          label="Inventory"
                          name="inventoryId"
                          value={inventoryId}
                          onChange={inputChange}
                          onBlur={inputChange}
                          options={inventories}
                          errorMessage={errors.inventoryId}
                          buttonTittle="Add new"
                          // ButtonClick={()=>setShowModalManufacturer(true)}       
                    />
             
                    <FormInput
                            label="Total Quantity"
                            type="number" 
                            placeholder="total Quantity" 
                            name="totalQuantity" 
                            value={totalQuantity} 
                            onChange={inputChange}
                            onBlur={inputChange}
                            errorMessage={errors.totalQuantity}
                    />  
                </div>
         
            </Form>
        
    )
}

export default InventoryItem
