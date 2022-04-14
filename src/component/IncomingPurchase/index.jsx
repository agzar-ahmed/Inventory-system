import React,{useState,useRef,useEffect,Fragment} from 'react';
import { toast } from 'react-toastify';
import './style.css';
import IncomingDetailsForm from '../IncomingDetailsForm';
import Modal from '../Modal';
import Form from '../Form' 
import { FormInput,FormSelect } from'../FormFields';
import Item from '../Item'
import Size from '../Size'
import ItemTypes from '../ItemType'
import Manufacturer from '../Manufacurer'
import Provider from '../Provider'
import { Link,useLocation } from 'react-router-dom';
import { handleChange, handleSubmit } from '../Form/formFunctions';
import {incomingProductSchema}from '../../validations/productValidation'
import { Table } from '../../component/Table';
import Table1 from '../../component/Table1'
import Spinner from '../../component/Spinner'


import { createItems,getItems } from '../../store/actions/itemAction';
import { getIncomingPurchases, getIncomingPurchaseDetails } from '../../store/actions/incomingPurchaseActions'
import { useDispatch, useSelector } from 'react-redux';

import { postIncomingPurchases } from '../../store/actions/incomingPurchaseActions'

import { getItemsbyIdSelector, itemsSelector } from '../../store/selectors/itemSelector'
import { incomingPurchaseSelector,incomingPurchaseDetailsSelector,incomingDetailsLoadingSelector } from '../../store/selectors/incomingPurchaseSelector'
import { getManufacturerbyIdSelector } from '../../store/selectors/manufacturerSelector';
import { getProviderbyIdSelector } from '../../store/selectors/providerSelector';
import { getInventorybyIdSelector } from '../../store/selectors/inventorySelector';

export default function IncomingPurchase({orders,sizes,itemTypes,items,manufacturers,providers,inventories}) {
    const dispatch = useDispatch() 
    const location = useLocation()
  
    const itemsData = useSelector(itemsSelector())
    const incomingPurchasesData = useSelector(incomingPurchaseSelector())
    const incomingPurchaseDetails = useSelector(incomingPurchaseDetailsSelector())
    const incomingDetailsLoading =useSelector(incomingDetailsLoadingSelector())

  
     useEffect(()=>{
       //Clear history from location.state
      window.history.replaceState({}, document.title)
      // dispatch(getProductTypes())
      // dispatch(getInventories())
      // dispatch(getSizes())
      // dispatch(getProviders())
      // dispatch(getManufacturers())
      // dispatch(getItems())
      dispatch(getIncomingPurchases())  
    },[])

    useEffect(()=>{
      //get incoming Details when we click edit
      location.state !== undefined &&  incomingPurchaseDetails.byIds !== undefined && 
        setIncomingPurchaseData(
          Object.values( incomingPurchaseDetails.byIds)
                .map(detail=>{
                          const {id,itemId,ordredQuantity,incomingQuantity,reste,unitPrice,totalExTax,VATRate,totalIncTax,discount,updatedAt} = detail
                          return {
                            id:Number(id),
                            item:itemsData.byIds[String(itemId)].name,
                            ordredQuantity:Number(ordredQuantity),
                            incomingQuantity:Number(incomingQuantity),
                            reste:Number(reste),
                            unitPrice:Number(unitPrice),
                            totalExTax:Number(totalExTax),
                            VATRate:Number(VATRate),
                            totalIncTax:Number(totalIncTax),
                            totalIncTax:Number(totalIncTax),
                            updatedAt: (new Date(updatedAt)).toUTCString()
                          }
                }))
      location.state !== undefined &&  incomingPurchaseDetails.byIds !== undefined && 
        setIncomingDetails(   
          Object.values( incomingPurchaseDetails.byIds)
                .map(detail=>{
                          const {id,itemId,ordredQuantity,incomingQuantity,reste,unitPrice,totalExTax,VATRate,totalIncTax,discount,updatedAt} = detail
                          return {
                            id:Number(id),
                            itemId:String(itemId),
                            ordredQuantity:Number(ordredQuantity),
                            incomingQuantity:Number(incomingQuantity),
                            reste:Number(reste),
                            unitPrice:Number(unitPrice),
                            totalExTax:Number(totalExTax),
                            VATRate:Number(VATRate),
                            totalIncTax:Number(totalIncTax),
                            totalIncTax:Number(totalIncTax),
                            updatedAt: (new Date(updatedAt)).toUTCString()
                          }
        }))
      
      },[location.state,incomingPurchaseDetails])
      
    // location.state !== undefined && console.log(location.state.incomingPurchase,'location frm incomingPurchase')
   
    const initialState =  location.state !== undefined && 
                        {
                          id: location.state.incomingPurchase.id,
                          providerId: incomingPurchasesData.byIds[location.state.incomingPurchase.id].providerId ,
                          orderId: incomingPurchasesData.byIds[location.state.incomingPurchase.id].orderId ,
                          inventoryId: incomingPurchasesData.byIds[location.state.incomingPurchase.id].inventoryId ,
                          incomingDate:  new Date(incomingPurchasesData.byIds[location.state.incomingPurchase.id].incomingDate).toISOString().slice(0, 19) ,
                          numberIncomingPurchase: incomingPurchasesData.byIds[location.state.incomingPurchase.id].numberIncomingPurchase ,
                          totalExTax:  incomingPurchasesData.byIds[location.state.incomingPurchase.id].totalExTax,
                          totalVAT:  incomingPurchasesData.byIds[location.state.incomingPurchase.id].totalVAT,
                          totalIncTax:  incomingPurchasesData.byIds[location.state.incomingPurchase.id].totalIncTax,
                        }
                        || 
                        {
                          providerId:'',
                          orderId:'',
                          inventoryId:'',
                          incomingDate:'',
                          numberIncomingPurchase:'',
                          totalExTax:'',
                          totalVAT:'',
                          totalIncTax:'',
                        }
    /*Data to handel form */
    const [data,setData] = useState(
      initialState
    );
    /*incomingDetails to dispatch array data to server */
    // const initialIncomingDetails =  incomingPurchaseDetails.byId != undefined ? 
    //                                   Object.values( incomingPurchaseDetails.byIds).map(detail=>{
    //                                     const {itemId,ordredQuantity,incomingQuantity,reste,unitPrice,totalExTax,VATRate,totalIncTax,discount,updatedAt} = detail
    //                                     return {
    //                                       item:itemsData.byIds[String(itemId)].name,
    //                                       ordredQuantity:Number(ordredQuantity),
    //                                       incomingQuantity:Number(incomingQuantity),
    //                                       reste:Number(reste),
    //                                       unitPrice:Number(unitPrice),
    //                                       totalExTax:Number(totalExTax),
    //                                       VATRate:Number(VATRate),
    //                                       totalIncTax:Number(totalIncTax),
    //                                       totalIncTax:Number(totalIncTax),
    //                                     }
    //                                   })
    //                                   :[]
    const [incomingDetails,setIncomingDetails] = useState([]);

    /*incomingPurchseData to show data in table with names(item..) not the ids(itemId) */
    const [incomingPurchaseData,setIncomingPurchaseData] = useState([])
    const [errors,setErrors] = useState(
      {
        providerId:'',
        orderId:'',
        inventoryId:'',
        incomingDate:'',
        numberIncomingPurchase:''
      }
    );
    const [ itemToUpdate, setItemToUpdate ] = useState()
    const [btnDisable,setBtnDisabled] = useState(true)

    // const [showModalProductList,setShowModalProductList] = useState(false)
    const [showModalItem,setShowModalItem] = useState(true)
    const [showModalSize,setShowModalSize] = useState(false);
    const [showModalItemType,setShowModalItemType] = useState(false);
    const [showModalManufacturer,setShowModalManufacturer] = useState(false);
    const [showModalProvider,setShowModalProvider] = useState(false);
    const [showModalInventory,setShowModalInventory] = useState(false)
    
    const [closeModalIncomingDetails,setClosewModalIncomingDetails] = useState(true)

    const inputChange =e=> handleChange(e,data,setData,incomingProductSchema,errors,setErrors);
    const addToTable = (incomingData) =>{ 
     
      const {itemId,ordredQuantity,incomingQuantity,reste,unitPrice,totalExTax,VATRate,totalIncTax,discount,updatedAt} = incomingData
      //check if item already exist in the table  
      
      const check=incomingDetails.find(purchase=>purchase.itemId === String(itemId)) 
      if(check) { 
                    toast.warning(`${itemsData.byIds[itemId].name} already exist in table`, {
                                            position: "bottom-right",
                                            // autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored"
                                            });
                    return 
                  }

                      setIncomingPurchaseData([                      
                            ...incomingPurchaseData,
                        {   
                            item:itemsData.byIds[itemId].name,
                            ordredQuantity:Number(ordredQuantity),
                            incomingQuantity:Number(incomingQuantity),
                            reste:Number(reste),
                            unitPrice:Number(unitPrice),
                            totalExTax:Number(totalExTax),
                            VATRate:Number(VATRate),
                            totalIncTax:Number(totalIncTax),
                            totalIncTax:Number(totalIncTax),
                          }
                      ])
                      setIncomingDetails([
                        ...incomingDetails,
                        {   
                          itemId:String(itemId),
                          ordredQuantity:Number(ordredQuantity),
                          incomingQuantity:Number(incomingQuantity),
                          reste:Number(reste),
                          unitPrice:Number(unitPrice),
                          totalExTax:Number(totalExTax),
                          VATRate:Number(VATRate),
                          totalIncTax:Number(totalIncTax),
                          totalIncTax:Number(totalIncTax),
                          discount:Number(discount)
                        }
                      ]) 
                      setData({
                        ...data,
                        totalExTax: Number(data.totalExTax) + Number(totalExTax) ,
                        totalVAT: Number(data.totalVAT) + Number(totalExTax)*Number(VATRate)*0.01,
                        totalIncTax: Number(data.totalIncTax) + Number(totalIncTax),
                        
                      })              
    }

  
    const formToTable = e => handleSubmit(e,data,incomingProductSchema,errors,setErrors,addToTable)
                      

    // const mounted = useRef();
    //   useEffect(() => {
    //     // if (!mounted.current) {
    //     //   // do componentDidMount logic
    //     //   mounted.current = true;
    //     // } else {
    //     //   // do componentDidUpdate logic
    //     //   validate()? setBtnDisabled(true): setBtnDisabled(false)
    //     // }
    // });

    // const dispatch = useDispatch()

    const { 
            providerId,
            orderId,
            inventoryId,
            incomingDate,
            numberIncomingPurchase
          } = data
    
    const selectedItem = []//useSelector(getItemsbyIdSelector(itemId));
    const selectedProvider =[]// useSelector(getProviderbyIdSelector(providerId));
    const selectedManufacturer =[] //useSelector(getManufacturerbyIdSelector(manufacturerId));
    const selectedInventory = []//useSelector(getInventorybyIdSelector(inventoryId));
       
    return(
      <div className='product'>

            {/* {showModalProductList &&
              <Modal title="Add new Product" closeModal={setShowModalProductList}>
                  <ProductList/>
              </Modal>
            } */}
           

            {!closeModalIncomingDetails &&
              <Modal title="Add new Product" closeModal={setClosewModalIncomingDetails}>
                <IncomingDetailsForm itemToUpdate={itemToUpdate} addToTable={addToTable} closeModal={setClosewModalIncomingDetails}/>
              </Modal>
            }
            {!showModalItem &&
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
              <Link to="incomingpurchaselist">
                  <button 
                        className="btn"
                        >
                        Incoming purchase list
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
                    <h3>Incoming information</h3>   
                    <div className="productForm"> 
                     <div className="input-row">
                
                    <FormSelect
                                  label="Provider"
                                  name="providerId"
                                  autoFocus 
                                  value={providerId} 
                                  onChange={inputChange}
                                  onBlur={inputChange}
                                  options={providers}
                                  errorMessage={errors.providerId}
                                  buttonTittle="Add new"
                                  ButtonClick={()=>setShowModalProvider(true)}       
                    /> 
                   <FormSelect
                                  label="Order"
                                  name="orderId"
                                  value={orderId} 
                                  onChange={inputChange}
                                  onBlur={inputChange}
                                  options={orders}
                                  errorMessage={errors.orderId}
                                  buttonTittle="Add new"
                                  ButtonClick={()=>setShowModalProvider(true)}       
                      />                 
                    </div>
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
                                    label="N° IncomingPurchase" 
                                    type="text"
                                    placeholder="Incoming Purchase Number"
                                    name="numberIncomingPurchase" 
                                    value={numberIncomingPurchase} 
                                    onChange={inputChange}
                                    onBlur={inputChange}
                                    errorMessage={errors.numberIncomingPurchase}
                    />
                      </div> 
                      <div className="input-row">
                      <FormInput
                                    label="Incoming date" 
                                    type="datetime-local"
                                    placeholder="incoming Date"
                                    name="incomingDate" 
                                    value={incomingDate} 
                                    onChange={inputChange}
                                    onBlur={inputChange}
                                    errorMessage={errors.incomingDate}
                      />
                      <div></div>
                      <div></div>
                       </div>
                     
                    </div>
                  </div>
              </div>
              </Form> 
              
              <div className="purchases-table">
                <div className="titleHeader">
                <h2>Incoming purchases details</h2>
                  <button  
                      className="btn btnSubmit" 
                      onClick={()=>{
                        setItemToUpdate()
                        setClosewModalIncomingDetails(false)}}>Add Product</button>
                </div>
                { incomingPurchaseData.length>0  &&   <div className='incoming-total'>
                                                                                      <div><span>Total ExTax:</span> {data.totalExTax} </div>
                                                                                      <div><span>Total VAT:</span>{data.totalVAT} </div>
                                                                                      <div><span>Total IncTax:</span>{data.totalIncTax} </div>
                                                                                    </div>}
                  { console.log(incomingPurchaseData,'incomingPurchaseData')}
                   <Table1                        
                          tableSize={5}
                          tableData={incomingPurchaseData}
                          tableHeader={['','Product','OrdredQuantity','IncomingQuantity','ResteQuantity','UnitPrice','TotalExTax','VATRate(%)','TotalIncTax','LastUpdate']} 
                          tableColumn={['item','ordredQuantity','incomingQuantity','reste','unitPrice','totalExTax','VATRate','totalIncTax','updatedAt']}
                          // tableTotal={['totalExTax','totalIncTax']}
                          showTableAction={true}
                          onUpdate={item=>{
                                          setItemToUpdate(incomingPurchaseDetails.byIds[item.id]||item)
                                          setClosewModalIncomingDetails(false)
                                          console.log(incomingPurchaseDetails.byIds[item.id],item,'incomingPurchaseDetails.byIds[item.id] update')
                                        }}
                          onDelete={console.log('onDelete')}
                   />
                   <div>

                   </div>
                  {/* <Table 
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
                  /> */}

                {location.state !== undefined ?
                  <button
                  className="btn btnSubmit" 
                  onClick={()=>{
                    console.log({incomingDetails,incomingPurchaseDetails:data},'data to update DB')
                    dispatch()
                  }}
                  >
                       Update data
                  </button>
                  :<button  
                        className="btn btnSubmit" 
                        onClick={()=>{
                          console.log(incomingDetails,data,'data to DB')
                          // dispatch(postIncomingPurchases({incomingPurchase:data,incomingPurchaseDetails:incomingDetails}))
                          // setIncomingDetails([])
                          // setIncomingPurchseData([{
                          //   userId:'',
                          //   itemId:'',
                          //   quantity:'',
                          //   unitPrice:'',
                          //   totalExTax:'',
                          //   VATRate:'',
                          //   discount:'',
                          //   totalIncTax:'',
                          //   inventoryId:'',
                          //   // minLevel:'',
                          //   msrp:'',
                          //   providerId:'',
                          //   manufacturerId:'',
                          //   purchaseDate:'',
                          //   expirationDate:'',
                          //   productionDate:'',
                          // }])
                          // setData({ 
                          //   userId:'1',
                          //   itemId:'',
                          //   manufacturerId:'',
                          //   providerId:'',
                          //   inventoryId:'',
                          //   purchaseDate:'',
                          //   expirationDate:'',
                          //   productionDate:'',
                          //   purchasePrice:'',
                          //   quantity:'',
                          //   purchasePrice:'',
                          //   msrp:'',
                          //   unitPrice:'',
                          //   VATRate:'',
                          //   discount:0,
                          //   tatalExTax:'',
                          //   totalIncTax:'',
                          // })
                          }}>
                          Submit data
                    </button>}
              </div>                
        </div>   
    ) 
}