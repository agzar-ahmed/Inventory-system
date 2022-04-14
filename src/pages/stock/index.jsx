import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from '@mui/icons-material';

import Table1 from '../../component/Table1';
import ListGroup from '../../component/ListGoup';
import TopBar from '../../component/TopBar';
import Modal from '../../component/Modal';
import Stock from '../../component/Stock'
import './style.css';



//actions
import { getItems } from '../../store/actions/itemAction';
import { getStock, deleteInventoryItems, getStockByInventories,updateInventoryItems } from '../../store/actions/stockActions';
import { getInventories} from '../../store/actions/inventoryActions';


//selectors
import { itemsSelector } from '../../store/selectors/itemSelector'
import { stockSelector, stockByInventoriesSelector } from '../../store/selectors/stockSelector'
import { getItemsbyIdSelector } from '../../store/selectors/itemSelector';
import { inventorySelector } from '../../store/selectors/inventorySelector';


import { useDispatch,useSelector } from 'react-redux';
import { ContactSupportOutlined } from '@material-ui/icons';


function StockPage() {

    const dispatch = useDispatch()

    const inventoriesList =  useSelector(inventorySelector())
    const productList =  useSelector(itemsSelector())

    const inventoryData = inventoriesList.byIds != undefined ? Object.values(inventoriesList.byIds) : []
    const productData = productList.byIds //!= undefined ? Object.values(productList.byIds) : []
    const stockData = useSelector(stockSelector())
    const stockByInventories = useSelector(stockByInventoriesSelector())

   
    const [ tableData,setTableData ] = useState([]);
    const [ stock,setStock ] = useState([])
    const [ filtredData,setFiltredData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState ()
    // const [ closeUpdateModal, setCloseUpdateModal] = useState(true)


    //get data array from normalizedstore data object
    // setInventoryItems([])

    

    const onSelect = (id) =>{
        //be carefull we have item in all inventories witch means stock 
        //and we have items in each inventory
        if(id == "all") {
            //stock data in all inventories
           return setFiltredData(stock);     
        }
        //stockbyinvrntory data
        const newData = stockByInventories[id] ? stockByInventories[id] : []
   
        setFiltredData(newData)
    }

        
    useEffect( ()=>{  
        setStock(Object.values(stockData))
        dispatch(getInventories())
        dispatch(getStockByInventories())
    },[stockData])
    
    useEffect( ()=>{
        onSelect("all")
    },[stock])
    
    useEffect(
        ()=>{
          setTableData(filtredData.map((item,index)=>{
                return {     
                        id           : item.id,
                        product      :  productData[item.itemId].name,//.Item.name,
                        image        : <img className='table-productimg' 
                                            src={`${process.env.REACT_APP_PUBLIC_URL}${productData[item.itemId].imageURL1||productData[item.itemId].imageURL2||productData[item.itemId].imageURL3}`} 
                                            label={productData[item.itemId].imageURL1} />,
                        sku          : productData[item.itemId].sku,
                        //  inventory    : inventoryData.filter(inventory=>inventory.id == item.inventoryId)[0].name,
                        totalQuantity: item.totalQuantity,
                        lastUpdate   :(new Date(item.updatedAt)).toUTCString(),
                        //  action:tableAction(inventoryItem.id)
                    }
            }))
        }
    ,[filtredData])

    // useEffect(()=>{
    //     selectedItem ? setCloseUpdateModal(false) : setCloseUpdateModal(true)
    // },[selectedItem])

    useEffect(()=>{
        dispatch(getItems());
        dispatch(getStock())
        dispatch(getInventories())   
    }
    ,[])

    const reorderInventoryData = [
            {id:"all",name:"Stock",totalItem:stock.length},
            ...inventoryData.map(inventory=>{
            return { 
                    id:inventory.id,
                    name:inventory.name,
                    totalItem:stockByInventories[inventory.id]!= undefined && stockByInventories[inventory.id].length
            }
            })
    ]

     console.log(reorderInventoryData,"reorderInventoryData")

    return (
        <div className="content">
         {/* {!closeUpdateModal && <Modal title={"Update inventory Items:"} closeModal={setCloseUpdateModal}>
             <Stock 
                        inventoryItem={stockData[selectedItem !== undefined && selectedItem.id]}
                        closeUpdateModal={setCloseUpdateModal}
                        />
            </Modal>} */}
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
                            {/* {console.log(tableData,"tableData")} */}
                            {tableData &&<Table1 
                                    tableSize={5}
                                    tableData={tableData}
                                    tableHeader={[<ShoppingBag/>,'Product image','Product','SKU','Total quantity','Last update']} 
                                    tableColumn={['image','product',,'sku','totalQuantity','lastUpdate']}
                                    // showTableAction={true}
                                    // onUpdate={setSelectedItem}
                                    // onDelete={deleteInventoryItems}
                                    // // tableColumn to show colum in the order we want we won't to rely to object.key order 
                                    //we need to see object properties in back end
                            /> }
                        </div>                           
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default StockPage

