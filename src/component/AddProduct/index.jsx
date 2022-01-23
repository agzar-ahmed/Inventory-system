import React,{useState,useRef,useEffect,Fragment} from 'react';
import './style.css'
import Modal from '../Modal';
import Form from '../Form' 
import { FormInput,FormSelect } from'../FormFields';
import Item from '../item'
import Size from '../Size'
import ItemTypes from '../ItemType'
import Manufacturer from '../Manufacurer'
import Provider from '../Provider'
import ImagWidget from '../ImageWidget';
import { Link } from 'react-router-dom';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {productSchema}from '../../validaions/productValidation'


import { createItems,getItems } from '../../store/actions/itemAction';
import { useDispatch, useSelector } from 'react-redux';

export default function AddProduct({sizes,itemTypes,items,manufacturers,providers,inventories}) {
    const initialState =  {
      itemId:'',purchaseDate:'',
      purchasePrice:'',expirationDate:'',
      quantity:'',
      productImg:'',manufacturerId:'',
      providerId:'',minLevel:'',inventoryId:''
    }
    const [data,setData] = useState(
      initialState
    );
    const [errors,setErrors] = useState(
      {
        itemId:'',purchaseDate:'',
        purchasePrice:'',expirationDate:'',
        quantity:'',
        productImg:'',manufacturerId:'',
        providerId:'',minLevel:'',inventoryId:''
      }
    );
    const [btnDisable,setBtnDisabled] = useState(true)

    // const [showModalProductList,setShowModalProductList] = useState(false)
    const [showModalItem,setShowModalItem] = useState(false)
    const [showModalSize,setShowModalSize] = useState(false);
    const [showModalItemType,setShowModalItemType] = useState(false);
    const [showModalManufacturer,setShowModalManufacturer] = useState(false);
    const [showModalProvider,setShowModalProvider] = useState(false);
    const [showModalInventory,setShowModalInventory] = useState(false)

    const inputChange =e=> handleChange(e,data,setData,productSchema,errors,setErrors);
    const onSubmit = () =>{
                  
                  const {productName,purchaseDate,
                          purchasePrice,expirationDate,
                          quantity,description,sku,
                          productImg,productTypeId,sizeId,
                          manufacturerId,providerId,minLevel,
                          inventoryId} = data;
                          
                        //we did this because we want to change IDs to Number type   
                  const data2 = {
                            productName,
                            purchaseDate,
                            purchasePrice,
                            expirationDate,
                            quantity,
                            description,
                            sku,
                            productImg,
                            minLevel,
                            productTypeId : Number(productTypeId),
                            sizeId: Number(productTypeId),
                            manufacturerId: Number(manufacturerId),
                            providerId: Number(providerId),
                            inventoryId:Number(inventoryId),
                          }
                          console.log("submitted");
                    
                    //     console.log(data2,"data2");
                    //     // dispatch(createItems(data))
                    //     // getItems()
                    setData( {
                      itemId:"",purchaseDate:'',
                      purchasePrice:'',expirationDate:'',
                      quantity:'',
                      productImg:'',manufacturerId:'',
                      providerId:'',minLevel:'',inventoryId:''
                    })
                    
                }
    const formSubmit = e => handleSubmit(e,data,productSchema,errors,setErrors,onSubmit)

    const mounted = useRef();
      useEffect(() => {
        // if (!mounted.current) {
        //   // do componentDidMount logic
        //   mounted.current = true;
        // } else {
        //   // do componentDidUpdate logic
        //   validate()? setBtnDisabled(true): setBtnDisabled(false)
        // }
    });

    const dispatch = useDispatch()

   
  
    const {itemId,purchaseDate,
           purchasePrice,expirationDate,
           quantity,description,sku,
           productImg,productTypeId,sizeId,
           manufacturerId,providerId,minLevel,
           inventoryId} = data
    
    // const handelmodal=()=>{
    //    setShowModalSize(true)
    // }
      
    return (
        <div className='product' 
             onClick={()=>{
                         //close modal when you click out side modal
                              // setShowModalSize(false);
                              // setShowModalItemType(false);
                              // setShowModalManufacturer(false);
                              // setShowModalProvider(false);
                              // setShowModalInventory(false)
                              // console.log('you clicked outside of Modal')
                          }}
        >
            {/* {showModalProductList &&
              <Modal title="Add new Product" closeModal={setShowModalProductList}>
                  <ProductList/>
              </Modal>
            } */}
             {showModalItem &&
              <Modal title="Add new Product" closeModal={setShowModalItem}>
                  <Item/>
              </Modal>
            }
            {showModalSize &&
              <Modal title="Add new size" closeModal={setShowModalSize}>
                  <Size/>
              </Modal>
            }

            {showModalItemType &&
              <Modal title="Add new item type" closeModal={setShowModalItemType}>
                  <ItemTypes/>
              </Modal>
            }

            {showModalManufacturer &&
              <Modal title="Add new manufacturer" closeModal={setShowModalManufacturer}>
                  <Manufacturer showModalManufacturer={showModalManufacturer}/>
              </Modal>
            }

            {showModalProvider &&
              <Modal title="Add new provider" closeModal={setShowModalProvider}>
                  <Provider/>
              </Modal>
            }

            {showModalInventory &&
              <Modal title="Add new inventory" closeModal={setShowModalInventory}>
                  <Size/>
              </Modal>
            }
            <div className="titleHeader">
            <h1>Incoming Purchases</h1>

            <div>
              <Link to="productlist">
                  <button 
                        // onClick={()=>setShowModalProductList(true)}
                        className="btn"
                        >
                        Product list
                  </button>
              </Link>
            </div>              
            </div>
              <Form
                    dataSchema={productSchema}
                    initialValues={data}
                    initialValuesErrors={errors}
                    // onChange={handleChange}
                    onSubmit={formSubmit}
                    // labelBtn={"Add Item"}
                    errors = {errors}
                    setErrors = {setErrors}
              >
                  <div className='incoming-purchase'>
                    <div className="addProduct">    
                    <h3>Product information</h3>   
                    <div className="productForm"> 
                      {console.log(initialState,'initialstate')}
                      {console.log(items,itemId,"options,value")}
                      <div className="input-row">
                      <FormSelect
                                    label="Product"
                                    name="itemId"
                                    value={itemId}
                                    onChange={inputChange}
                                    onBlur={inputChange}
                                    options={items}
                                    errorMessage={errors.itemId}
                                    buttonTittle="Add new"
                                    ButtonClick={()=>setShowModalItem(true)}
                        /> 
                        <FormInput
                                label="Purchase date" 
                                type="date"
                                placeholder="Purchase Date"
                                name="purchaseDate" 
                                value={purchaseDate} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.purchaseDate}
                        />
                        <FormInput
                                label="Expiration date" 
                                type="date"
                                placeholder="Expiration date"
                                name="expirationDate" 
                                value={expirationDate} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.expirationDate}
                        />
                      </div>
                      <div className="input-row">
                      <FormInput
                                label="Purchase price"
                                type="number" 
                                min="1" 
                                step="0.01" 
                                placeholder="Purchase Price" 
                                name="purchasePrice" 
                                value={purchasePrice} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.purchasePrice}
                        />
                        
                      <FormInput
                                label="Quantity"
                                type="number" 
                                placeholder="Quantity" 
                                min="0" name="quantity" 
                                value={quantity} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.quantity}
                        />
                        <div></div>
                      </div>
                        
                        
                    </div>

                          
                      

                    {/* </Form>    */}
                    </div>

                  <div className="addProduct">    
                    {/* <h3>Manufacturer and Provider</h3>            */}
                    {/* <Form
                          dataSchema={productSchema}
                          initialValues={data}
                          initialValuesErrors={errors}
                          // onChange={handleChange}
                          onSubmit={formSubmit}
                          // labelBtn={"Add Item"}
                          errors = {errors}
                          setErrors = {setErrors}
                    >  */}
                      <div className="input-row">
                      <FormSelect
                                  label="Manufacturer"
                                  name="manufacturerId"
                                  value={manufacturerId}
                                  onChange={inputChange}
                                  onBlur={inputChange}
                                  options={manufacturers}
                                  errorMessage={errors.manufacturerId}
                                  buttonTittle="Add new"
                                  ButtonClick={()=>setShowModalManufacturer(true)}       
                      />
                      <FormSelect
                                  label="Provider"
                                  name="providerId"
                                  value={providerId} 
                                  onChange={inputChange}
                                  onBlur={inputChange}
                                  options={providers}
                                  errorMessage={errors.providerId}
                                  buttonTittle="Add new"
                                  ButtonClick={()=>setShowModalProvider(true)}       
                      /> 
                      <div></div>
                      </div>
                    
                      {/* </Form>    */}
                  </div>

                  <div className="addProduct">    
                    {/* <h3>Inventry</h3>            */}
                    {/* <Form
                        dataSchema={productSchema}
                        initialValues={data}
                        initialValuesErrors={errors}
                        // onChange={handleChange}
                        onSubmit={formSubmit}
                        // labelBtn={"Add Item"}
                        errors = {errors}
                        setErrors = {setErrors}
                  >  */}
                    <div className="input-row">
                        <FormSelect
                                    label="Inventory"
                                    name="inventoryId" 
                                    value={inventoryId}
                                    onChange={inputChange}
                                    onBlur={inputChange}
                                    options={inventories}
                                    errorMessage={errors.inventoryId}
                                    buttonTittle="Add new"
                                    ButtonClick={()=>setShowModalInventory(true)}       
                        />
                        <FormInput
                                label="Min level"
                                type="number" 
                                placeholder="Min level" 
                                name="minLevel" 
                                value={minLevel} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.minLevel}
                                // required
                        />
                        <div></div>
                    </div>
                  </div>
                  <button  className="btn btnSubmit" onClick={formSubmit}>ADD</button>
              </div>
              </Form>                 
        </div>
    )
}