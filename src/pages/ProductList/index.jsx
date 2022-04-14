import React,{useEffect} from 'react'
import './style.css'
import Table from '../../component/Table1'
import TopBar from '../../component/TopBar'
import Item from '../../component/Item'
import Modal from '../../component/Modal'

import { getItems,deleteItem, updateItems } from '../../store/actions/itemAction'
import { getSizes } from '../../store/actions/sizeActions'
import { getUsers } from '../../store/actions/usersActions'
import { getProductTypes } from '../../store/actions/productTypeActions'
import { getCompanies } from '../../store/actions/companiesActions'
import { getManufacturers } from '../../store/actions/manufacturerActions'

import { itemsSelector } from '../../store/selectors/itemSelector'
import { getSizebyIdSelector } from '../../store/selectors/sizeSelector'
import { getUserbyIdSelector } from '../../store/selectors/usersSelector'
import { getProductTypebyIdSelector } from '../../store/selectors/productTypeSelector'
import { getCompanybyIdSelector } from '../../store/selectors/companieSelector'

import { useDispatch, useSelector, useStore } from 'react-redux'
import { useState } from 'react'


export default function ProductList() {
    const dispatch = useDispatch()

    const itemData = useSelector(itemsSelector())
    const itemList = itemData.byIds != undefined && itemData.byIds
    
    // const sizeById = useSelector(getSizebyIdSelector(id))

    console.log(itemList,'itemList 1')

    const [ tableData,setTableData ] = useState([])
    const [ closeItemModal, setCloseItemModal ] = useState(true)
    const [ closeConfimModal, setCloseConfimModal ] = useState(true)
    const [ selectedItem, setSelectedItem ] = useState (null)

    useEffect(()=>{
      dispatch(getSizes())
      dispatch(getUsers())
      dispatch(getProductTypes())
      dispatch(getManufacturers())
      dispatch(getCompanies())
      dispatch(getItems())

    },[])

    //actions
    
    const tableAction=(item)=>{
      return  <div className='d-flex'>
                  <button className='btn-action-edit' onClick={()=> {
                    setCloseItemModal(false)
                    setSelectedItem(item)
                    }}>
                      Edit
                  </button> 
                  <button className='btn-action-delete' 
                          onClick={()=> {                          
                            // console.log(item.id)
                            setSelectedItem(item)
                            // deleteItem(52)
                            setCloseConfimModal(false)
                          }}
                  >
                      Delete
                  </button>
              </div>
    }

    useEffect(
      ()=>{
        // const tableData = changeData(itemList)
      //  setTableData(tableData)
      
      const arr = Object.values(itemList)
      console.log(itemList,arr,'itemList')
      arr && setTableData( arr.map((item,index)=>{
        const imageURL = item.imageURL1 || item.imageURL2 || item.imageURL3
        return {     
                id:index+1,
                imageURL1: <img className='table-productimg' 
                src={`${ process.env.REACT_APP_PUBLIC_URL}${imageURL}`} 
                label={imageURL} />,
                name:item.name,
                sku:item.sku,
                ItemTypeId:item.ItemTypeId && <GetProductTypeName id={item.ItemTypeId}/>,
                SizeId: item.SizeId && <GetSizeName id={item.SizeId}/>,//useSelector(getSizebyIdSelector(item.SizeId))[0].name,// sizeById[0] && sizeById[0].name,
                CompanyId:item.CompanyId && <GetCompanyName id={item.CompanyId}/>,
                UserId:item.UserId && <GetUserName id={item.UserId}/>,
                updatedAt:(new Date(item.updatedAt)).toUTCString(),
                action: tableAction(item)
              }
              
      }))
      }
      ,[itemList])
  return (
    <div className="content">
       {!closeItemModal && <Modal title={selectedItem?"Edit Product":"Add Product"} closeModal={setCloseItemModal}>
                              <Item item={selectedItem} closeModal={setCloseItemModal}/>
                           </Modal>}
       {!closeConfimModal && <Modal title={"Confirmation"}  closeModal={setCloseConfimModal}>
                                {/* <Item item={selectedItem} closeModal={setCloseItemModal}/> */}
                                <div>
                                    <h4>Are sure you want to delete this product?</h4>
                                    <button 
                                            className='btn-action-delete' 
                                            onClick={()=> { 
                                                     setCloseConfimModal(true) 
                                                     dispatch(deleteItem(selectedItem.id))
                                                     }}
                                    >
                                                  Delete
                                    </button>
                                </div>
                                
                              </Modal>}
    
       <TopBar/>
       <div className="itemList-table">
         <div className='titleHeader'>
            <h1>All products:</h1>
            <button 
                    className="btn"
                    onClick={()=>{
                                    setSelectedItem(null)//clear data SelectedItem state 
                                    setCloseItemModal(false)
                                  }}>
                Add product
              </button>
         </div>
          <Table 
                    tableSize={20} 
                    tableHeader={["N°","Image","Product","SKU","Type","Size","Manufacurer","CreatedBy","Last update",'']} 
                    tableData={tableData} 
                    tableColumn={["imageURL1","name","sku","ItemTypeId","SizeId","CompanyId","UserId","updatedAt","action"]} 
          />
       </div>
    </div>
  )
}

// I can not call the hook inside a function so I did this below the error we get:
// cannot be called inside a callback. React Hooks must be called in a React function component nction component or a custom React Hook function
function GetSizeName({id}) {
  const { name } = useSelector(getSizebyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <div>{name}</div>
  )
}

function GetUserName({id}) {
  const { firstName, lastName } = useSelector(getUserbyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <div>{firstName} {lastName}</div>
  )
}

function GetProductTypeName({id}) {
  const { name } = useSelector(getProductTypebyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <div>{name}</div>
  )
}
function GetCompanyName({id}) {
  const { name } = useSelector(getCompanybyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <div>{name}</div>
  )
}