import React,{useState,useRef,useEffect,Fragment} from 'react';
import './style.css'
import Modal from '../Modal';
import Form from '../Form' 
import { FormInput,FormSelect } from'../FormFields';
import Item from '../Item'
import Size from '../Size'
import ItemTypes from '../ItemType'
import Manufacturer from '../Manufacurer'
import Provider from '../Provider'
import ImagWidget from '../ImageWidget';
import { Link } from 'react-router-dom';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {incomingProductSchema}from '../../validaions/productValidation'
import { Table } from '../../component/Table';

import { createItems,getItems } from '../../store/actions/itemAction';
import { useDispatch, useSelector } from 'react-redux';

import { postIncomingPurchases } from '../../store/actions/incomingPurchaseActions'

import { getItemsbyIdSelector, itemsSelector } from '../../store/selectors/itemSelector'
import { getManufacturerbyIdSelector } from '../../store/selectors/manufacturerSelector';
import { getProviderbyIdSelector } from '../../store/selectors/providerSelector';
import { getInventorybyIdSelector } from '../../store/selectors/inventorySelector';

export default function AddProduct({sizes,itemTypes,items,manufacturers,providers,inventories}) {
    
    const initialState =  {
      userId:'1',
      itemId:'',
      manufacturerId:'',
      providerId:'',
      inventoryId:'',
      purchaseDate:'',
      expirationDate:'',
      productionDate:'',
      purchasePrice:'',
      quantity:'',
      purchasePrice:'',
      msrp:'',
      unitPrice:'',
      VATRate:'',
      discount:0,
      tatalExTax:'',
      totalIncTax:'',
      // minLevel:''
    }
    /*Data to handel form */
    const [data,setData] = useState(
      initialState
    );
    /*dataArray to dispatch array data to server */
    const [dataArray,setDataArray] = useState([]);
    /*incomingPurchseData to show data in table with names(user,item..) not the ids(uerId,itemId) */
    const [incomingPurchseData,setIncomingPurchseData] = useState([{
      userId:'',
      itemId:'',
      quantity:'',
      unitPrice:'',
      totalExTax:'',
      VATRate:'',
      discount:'',
      totalIncTax:'',
      inventoryId:'',
      // minLevel:'',
      msrp:'',
      providerId:'',
      manufacturerId:'',
      purchaseDate:'',
      expirationDate:'',
      productionDate:'',
    }])
    const [errors,setErrors] = useState(
      {
        userId:'',
        itemId:'',
        manufacturerId:'',
        providerId:'',
        inventoryId:'',
        purchaseDate:'',
        expirationDate:'',
        productionDate:'',
        purchasePrice:'',
        quantity:'',
        purchasePrice:'',
        msrp:'',
        unitPrice:'',
        VATRate:'',
        discount:'',
        tatalExTax:'',
        totalIncTax:'',
        // minLevel:''
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

    const inputChange =e=> handleChange(e,data,setData,incomingProductSchema,errors,setErrors);
    const addToTable = () =>{ 
      console.log(data,incomingPurchseData,'data and incoming purchase')
                       setIncomingPurchseData([
                         ...incomingPurchseData,{
                        userId,
                        itemId:selectedItem[0].name,
                        quantity,
                        unitPrice,
                        totalExTax: unitPrice*quantity ,
                        VATRate: VATRate? VATRate: 20,
                        totalIncTax: (unitPrice*quantity+unitPrice*quantity*VATRate/100)-(unitPrice*quantity*discount/100),
                        discount,
                        inventoryId: selectedInventory[0].name,
                        msrp,
                        providerId:selectedProvider[0].name,
                        manufacturerId:selectedManufacturer[0].name,
                        purchaseDate,
                        expirationDate,
                        productionDate,
                      }])
                      setDataArray([
                        ...dataArray,{
                       userId,
                       itemId,
                       quantity:Number(quantity),
                       unitPrice:Number(unitPrice),
                       totalExTax: unitPrice*quantity,
                       VATRate: VATRate? Number(VATRate): 20,
                       totalIncTax: (unitPrice*quantity+unitPrice*quantity*VATRate/100)-(unitPrice*quantity*discount/100),
                       discount:Number(discount),
                       inventoryId,
                       msrp:Number(msrp),
                       providerId,
                       manufacturerId,
                       purchaseDate,
                       expirationDate,
                       productionDate,
                     }])               
    }

    const formToTable = e => handleSubmit(e,data,incomingProductSchema,errors,setErrors,addToTable)
                      

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

    const { 
            userId,
            itemId,
            manufacturerId,
            providerId,
            inventoryId,
            purchaseDate,
            expirationDate,
            productionDate,
            quantity,
            msrp,
            unitPrice,
            VATRate,
            discount
          } = data
    
    const selectedItem = useSelector(getItemsbyIdSelector(itemId));
    const selectedProvider = useSelector(getProviderbyIdSelector(providerId));
    const selectedManufacturer = useSelector(getManufacturerbyIdSelector(manufacturerId));
    const selectedInventory = useSelector(getInventorybyIdSelector(inventoryId));
    
    console.log(typeof(itemId),'itemId')
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
                    dataSchema={incomingProductSchema}
                    initialValues={data}
                    initialValuesErrors={errors}
                    // onChange={handleChange}
                    // onSubmit={formSubmit}
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
                                    autoFocus
                                    onChange={inputChange}
                                    onBlur={inputChange}
                                    options={items}
                                    errorMessage={errors.itemId}
                                    buttonTittle="Add new"
                                    ButtonClick={(e)=>{ e.preventDefault();setShowModalItem(true)}}
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
                      </div>  
                      <div className="input-row">
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
                                label="Production date" 
                                type="date"
                                placeholder="Production date"
                                name="productionDate" 
                                value={productionDate} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.productionDate}
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
                                label="unit price"
                                type="number" 
                                min="1" 
                                step="0.01" 
                                placeholder="Unit Price" 
                                name="unitPrice" 
                                value={unitPrice} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.unitPrice}
                      />
                      <FormInput
                                label="Suggested price"
                                type="number" 
                                min="1" 
                                step="0.01" 
                                placeholder="Suggested retail price" 
                                name="msrp" 
                                value={msrp} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.msrp}
                      />
                      <FormInput
                                label="VAT rate(%)"
                                type="number" 
                                min="1" 
                                step="1" 
                                placeholder="Value Added Tax" 
                                name="VATRate" 
                                value={VATRate} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.VATRate}
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
                    {/* <h3>Inventry</h3>*/}
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
                        {/* <FormInput
                                label="Min level"
                                type="number" 
                                placeholder="Min level" 
                                name="minLevel" 
                                value={minLevel} 
                                onChange={inputChange}
                                onBlur={inputChange}
                                errorMessage={errors.minLevel}
                                // required
                        /> */}
                        <div></div>
                    </div>
                  </div>
              </div>
              </Form> 
              <button  className="btn btnSubmit" onClick={formToTable}>ADD</button>
              <div className="purchases-table">
                  <h2>Incoming purchases table</h2>
                  {/* {incomingPurchseData.map((data,index)=><div key={index}>{JSON.stringify(data)}</div>)} */}
                  { }
                  {/* {selectedItem = getItemsbyIdSelector(itemId)} */}
                  {console.log(selectedItem,incomingPurchseData,'selected item')}
                   {/*key is important to force table to reload if we add data */}
                  <Table 
                        TableHeader={['USER',
                                      'PRODUCT NAME',
                                      'QUANTITY',
                                      'UNIT Price',
                                      'TOTAL ExTax',
                                      'VAT Rate',
                                      'DISCOUNT',
                                      'TOTAL IncTax',
                                      'INVENTORY',
                                      'MIN level',
                                      'SELLER Price',
                                      'PROVIDER',
                                      'MANUFACTURER',
                                      'PURCHASE DATE',
                                      'EXPIRATION DATE',
                                      'PRODUCTION DATE']} 
                        tableData={incomingPurchseData}  
                        key={incomingPurchseData}
                  />
                <button  
                      className="btn btnSubmit" 
                      onClick={()=>{
                        dispatch(postIncomingPurchases(dataArray))
                        setDataArray([])
                        setIncomingPurchseData([{
                          userId:'',
                          itemId:'',
                          quantity:'',
                          unitPrice:'',
                          totalExTax:'',
                          VATRate:'',
                          discount:'',
                          totalIncTax:'',
                          inventoryId:'',
                          // minLevel:'',
                          msrp:'',
                          providerId:'',
                          manufacturerId:'',
                          purchaseDate:'',
                          expirationDate:'',
                          productionDate:'',
                        }])
                        setData({ 
                          userId:'1',
                          itemId:'',
                          manufacturerId:'',
                          providerId:'',
                          inventoryId:'',
                          purchaseDate:'',
                          expirationDate:'',
                          productionDate:'',
                          purchasePrice:'',
                          quantity:'',
                          purchasePrice:'',
                          msrp:'',
                          unitPrice:'',
                          VATRate:'',
                          discount:0,
                          tatalExTax:'',
                          totalIncTax:'',
                        })
                        }}>
                        Submit data
                </button>
              </div>  
                           
        </div>
    )
}