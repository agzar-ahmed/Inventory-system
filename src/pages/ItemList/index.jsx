import React,{useEffect} from 'react'
import './style.css'
import Table from '../../component/Table1'
import TopBar from '../../component/TopBar'

import {getItems} from '../../store/actions/itemAction'
import { getSizes } from '../../store/actions/sizeActions'
import { getUsers } from '../../store/actions/usersActions'
import { getProductTypes } from '../../store/actions/productTypeActions'
import { getCompanies } from '../../store/actions/companiesActions'

import { itemsSelector } from '../../store/selectors/itemSelector'
import { getSizebyIdSelector } from '../../store/selectors/sizeSelector'
import { getUserbyIdSelector } from '../../store/selectors/usersSelector'
import { getProductTypebyIdSelector } from '../../store/selectors/productTypeSelector'
import { getCompanybyIdSelector } from '../../store/selectors/companieSelector'

import { useDispatch, useSelector, useStore } from 'react-redux'
import { useState } from 'react'


export default function ItemList() {
    const dispatch = useDispatch()

    const itemList = useSelector(itemsSelector())
    // const sizeById = useSelector(getSizebyIdSelector(id))

    console.log(useSelector)

    const [tableData,setTableData] = useState([])
    const [loading, setLoading ] = useState (true)

    useEffect(()=>{
      dispatch(getSizes())
      dispatch(getUsers())
      dispatch(getProductTypes())
      dispatch(getCompanies())
      dispatch(getItems())

      setLoading(false)
    },[])

    //Add image tag to data   

    useEffect(
      ()=>{
        // const tableData = changeData(itemList)
      //  setTableData(tableData)
      setTableData( itemList.map((item,index)=>{
        return {     
                id:index+1,
                imageURL1:<img className='table-productimg' 
                src={`${ process.env.REACT_APP_PUBLIC_URL}${item.imageURL1}`} 
                label={item.imageURL1} />,
                name:item.name,
                sku:item.sku,
                ItemTypeId:<GetProductTypeName id={item.ItemTypeId}/>,
                SizeId: <GetSizeName id={item.SizeId}/>,//useSelector(getSizebyIdSelector(item.SizeId))[0].name,// sizeById[0] && sizeById[0].name,
                CompanyId:<GetCompanyName id={item.CompanyId}/>,
                UserId:<GetUserName id={item.UserId}/>,
                updatedAt:(new Date(item.updatedAt)).toUTCString(),
                action:<span><button>Update</button> <button>delete</button></span>
              }
              
    }))
      }
      ,[itemList])
  return (
    <div className="content">
       <TopBar/>
       <div className="itemList-table">
       <h1>All products:</h1>
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

// I can not call he hook inside a funcio so I did this below the error we get
// cannot be called inside a callback. React Hooks must be called in a React function component nction component or a custom React Hook function
function GetSizeName({id}) {
  const { name } = useSelector(getSizebyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <p>{name}</p>
  )
}

function GetUserName({id}) {
  const { firstName, lastName } = useSelector(getUserbyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <p>{firstName} {lastName}</p>
  )
}

function GetProductTypeName({id}) {
  const { name } = useSelector(getProductTypebyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <p>{name}</p>
  )
}
function GetCompanyName({id}) {
  const { name } = useSelector(getCompanybyIdSelector(id))[0]
//  console.log(id,name,'name from getSizeName')
  return(
    <p>{name}</p>
  )
}