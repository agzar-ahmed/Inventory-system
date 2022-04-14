import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useHistory} from 'react-router-dom';


import TopBar from '../../component/TopBar';
import Table1 from '../../component/Table1';
import './style.css';

import { getIncomingPurchases,getIncomingPurchaseDetails } from '../../store/actions/incomingPurchaseActions'
import { getInventories } from '../../store/actions/inventoryActions';
import { getProviders } from '../../store/actions/providerActions';
import { getUsers } from '../../store/actions/usersActions';

import { incomingPurchaseSelector } from '../../store/selectors/incomingPurchaseSelector'
import { usersSelector,getUserbyIdSelector } from '../../store/selectors/usersSelector';
import { providerSelector } from '../../store/selectors/providerSelector';
import { inventorySelector } from '../../store/selectors/inventorySelector';


const IncomingPurchaseList = () => {
  const [tableData, setTableData ] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const incomingList = useSelector(incomingPurchaseSelector())
  const usersList = useSelector(usersSelector())
  const providerList = useSelector(providerSelector())
  const inventoryList = useSelector(inventorySelector())


  useEffect(()=>{
      dispatch(getUsers())
      dispatch(getInventories())     
      dispatch(getProviders())
      dispatch(getIncomingPurchases()) 
    },[])

  useEffect(()=>{
    let arr=[]
    console.log(usersList,'usersList')
    incomingList.allIds != undefined && incomingList.allIds.forEach(incoming=>{
        const {id,inventoryId,providerId,totalExTax,totalVAT,totalIncTax,userId,incomingDate,updatedAt} = incomingList.byIds[incoming]
        arr.push({
            id,
            inventoryId: inventoryList.byIds!= undefined && inventoryList.byIds[String(inventoryId)].name,
            providerId: providerList.byIds!= undefined && providerList.byIds[String(providerId)].name,
            totalExTax: totalExTax,
            totalVAT: totalVAT,
            totalIncTax: totalIncTax,
            incomingDate:(new Date(incomingDate)).toUTCString(),
            userId: usersList.byIds!= undefined && usersList.byIds[String(userId)].firstName +' '+ usersList.byIds[String(userId)].lastName,
            updatedAt: (new Date(updatedAt)).toUTCString(),
        })//)    
    })
    setTableData(arr)
  },[incomingList,usersList])

  return (
      <div className='content'>
           <TopBar/>
          <div className='purchaselist'>
            <div className="titleHeader">
                    <h1>Purchases list</h1>
                    <div>
                        <Link to="incomingpurchase">
                            <button className="btn" >
                                    New Purchase
                            </button>
                        </Link>
                    </div>              
            </div>
            { <Table1 
                                    tableSize={5}
                                    tableData={tableData}
                                    tableHeader={['','Inventory','Provider','TotalExTax','TotalVAT','TotalIncTax','CreatedBy','Incoming Date','LastUpdate']} 
                                    tableColumn={['inventoryId','providerId',,'totalExTax','totalVAT','totalIncTax','userId','incomingDate','updatedAt']}
                                     showTableAction={true}
                                     onUpdate={(item)=>{
                                      history.push({
                                        pathname: '/dashBoard/incomingpurchase',
                                        state:{incomingPurchase:item}
                                      });
                                      dispatch(getIncomingPurchaseDetails(item.id))
                                    }}
                                     onDelete={()=>console.log('onDelete')}
                                    // // tableColumn to show colum in the order we want we won't to rely to object.key order 
                                    //we need to see object properties in back end
                            /> }
            </div>
      </div>
   
  )
}

export default IncomingPurchaseList