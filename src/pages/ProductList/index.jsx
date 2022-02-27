import React,{useEffect,useState} from 'react';
// import {ProductsTable} from '../../component/ProductsTable';
import {Table,ProductsTable1} from '../../component/Table';
import Table1 from '../../component/Table1';
import ListGroup from '../../component/ListGoup';
import TopBar from '../../component/TopBar';
import { Link } from 'react-router-dom';
import './style.css';
import { ShoppingBag } from '@mui/icons-material';

//actions
import { getItems } from '../../store/actions/itemAction';
import { getInventoryItems } from '../../store/actions/inventoryItemActions';
import { getInventories } from '../../store/actions/inventoryActions';


//selectors
import { itemsSelector } from '../../store/selectors/itemSelector'
import { inventoryItemSelector } from '../../store/selectors/inventoryItemSelector'
import { getItemsbyIdSelector } from '../../store/selectors/itemSelector';
import { inventorySelector } from '../../store/selectors/inventorySelector';


import { useDispatch,useSelector } from 'react-redux';


function ProductList() {

    //life cycle HOOKS
    const dispatch = useDispatch()

    const productList = useSelector(itemsSelector())
    const inventoryItems = useSelector(inventoryItemSelector())
    const inventoryData = useSelector(inventorySelector())

    const [ tableData,setTableData ] = useState([]);
    const [ listData,setListData ] = useState([])
    const [ filtredData,setFiltredData ] = useState([]);

    const onSelect = (id) =>{
        if(id == "all") return  setFiltredData(inventoryItems) 
        const newData = inventoryItems.filter(inventoryItem=>id == inventoryItem.inventoryId)
        setFiltredData(newData)
    }
    useEffect( ()=>onSelect("all"),[inventoryItems])
    
    useEffect(
        ()=>setTableData(filtredData.map((inventoryItem,index)=>{
            return {     
                     id:index+1,
                     inventory:inventoryItem.Inventory.name,
                     product:inventoryItem.Item.name,
                     image:<img className='table-productimg' 
                                src={`${ process.env.REACT_APP_PUBLIC_URL}${inventoryItem.Item.imageURL1}`} 
                                label={inventoryItem.Item.imageURL1} />,
                     sku:inventoryItem.Item.sku,
                     inventory:inventoryItem.Inventory.name,
                     totalQuantity:inventoryItem.totalQuantity,
                     lastUpdate:<span>{(new Date(inventoryItem.updatedAt)).toUTCString()}</span>,
                     action:<span><button>Update</button> <button>delete</button></span>
                   }
         }))
        ,[filtredData])

        useEffect(()=>{
            dispatch(getItems());
            dispatch(getInventoryItems())
            dispatch(getInventories())
           
        }
        ,[])

        const reorderInventoryData = [
            {id:"all",name:"All inventories",totalItem:inventoryItems.length},
            ...inventoryData.map(inventory=>{
            return { id:inventory.id,
             name:inventory.name,
             totalItem:inventory.Item_inventories.length}
            })
     ]

     console.log(reorderInventoryData,"reorderInventoryData")

    return (
        <div className="content">
            <TopBar/>
            <div className="productlist">
                <div className="titleHeader">
                    <h1>Product list</h1>
                    <div>
                        <Link to="product">
                            <button className="btn" >
                                    New product
                            </button>
                        </Link>
                    </div>              
                </div>
                <div className="prod-table">
                    {/* {console.log(productList,"productList")}
                    {productList && <Table tableData={productList}/>}  */}
                    <div className="productlist-fulltable">
                        <div className="productlist-listgroup">
                            <ListGroup
                            listData={reorderInventoryData}
                            onSelect={onSelect}
                            />
                        </div>

                        <div className="productlist-table">
                            {console.log(tableData,"tableData")}
                            {tableData &&<Table1 
                                    tableSize={5}
                                    tableData={tableData}
                                    tableHeader={[<ShoppingBag/>,'Inventory','Product','Product image','SKU','Total quantity','Last update','']} 
                                    tableColumn={['inventory','product','image','sku','totalQuantity','lastUpdate','action']}
                           // tableColumn to show colum in the order we want we won't to rely to object.key order 
                          //we need to see object properties in back end
                          /> }
                        </div>                           
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default ProductList
