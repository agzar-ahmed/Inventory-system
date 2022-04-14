import React,{useState,useEffect} from 'react';

import { useDispatch,useSelector } from 'react-redux';

import './style.css'
import Pagination from '../Pagination'
import { paginate } from '../../utils/paginate'
import Spinner from '../Spinner'
import Modal from '../Modal'


import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function Table({tableSize, tableHeader, tableData, tableColumn, tableTotal,showTableAction, onDelete, onUpdate}) {

 const dispatch = useDispatch()

    // const tableHeader =[<ShoppingBag/>,'Parent','Email','Téléphone 1','Proffession','Adresse']
    const [ sortedData,setSortedData ] = useState();
    const [ itemCount, setItemnCount ] = useState(0);
    const [ itemOrder,setItemOrder ] = useState(1);
    const [ sortOption,setSortOption ] = useState({column:0,order:"asc"})//sortOder by default by first column 
    const [ pageSize,setPageSize ] = useState(tableSize? tableSize:10);
    const [ activePage, setActivePage ] = useState(1);
    const [ closeModalConfim,setCloseModalConfim ] = useState(true);
    const [ deleteItem, setDeleteItem ] = useState(true);
    // const [totalExTx ] = useState(0)
    // const properties = Object.keys(tableData[0])
    const onPagination =(page)=>{
        setSortedData(paginate(tableData,page,pageSize))
        setItemOrder((page-1)*pageSize+1)
    }

    const tableAction =(item)=>{
        return  <td>
                    <div className='d-flex'>
                        <button className='btn-action-edit' onClick={()=> {
                              console.log(item,"item to update")
                              onUpdate({...item})
                          
                        //   setCloseItemModal(false)
                        //   setSelectedItem(id)
                        }}>
                            Edit
                        </button> 
                        <button className='btn-action-delete' 
                                onClick={()=> {         
                               
                                //   setSelectedItem(id)
                                //   // deleteItem(52)
                                 setDeleteItem(item)
                                 setCloseModalConfim(false)
                                }}
                        >
                            Delete
                        </button>
                    </div>
                </td>
    }
    

    const onSort =(sortProperty)=>{
        console.log(tableData,"tableData")
        //check if column sorted to do the reverse("desc" or "asc")
        let ckeckedProperty = {}
        if(sortOption.column == sortProperty.column){
           sortOption.order == sortProperty.order ? ckeckedProperty = {column:sortOption.column, order:sortOption.order == "asc" ? "desc":"asc"} : ckeckedProperty = sortProperty
        }else{
            ckeckedProperty = {...sortProperty}
        }

        const dynamicSort=(property)=> {
            //ex: property = {column:'name',order:"asc"}
            let sortOrder = 1;
           
            if( property.order === "desc") {
                sortOrder = -1;
                // property = property.substr(1);
            }

            return  (a,b) => {
                /* next line works with strings and numbers, 
                 * and you may want to customize it to your needs
                 */
                var result = (a[tableColumn[property.column]] < b[tableColumn[property.column]]) ? -1 : (a[tableColumn[property.column]] > b[tableColumn[property.column]]) ? 1 : 0;
                return result * sortOrder;
            }
        }

       
        console.log(sortedData,tableData,"sortedData")
        setSortOption(ckeckedProperty)
        setSortedData(tableData.sort(dynamicSort(ckeckedProperty)))
        onPagination(1) 
        setActivePage(1)      
    }
    //console.log(parentData,'parentData table component')
    useEffect(()=>{
        setSortedData(tableData)
        onSort(sortOption)
        onPagination(1)
        setItemnCount(tableData.length)
        setItemOrder(1)
        // console.log(tableData,sortedData,"tableData,sortedData")
    },[tableData,pageSize])

    useEffect(() => { console.log("sortedData",sortedData) }, [sortedData])
    
    return (
        <div>
                {!closeModalConfim && <Modal title={"Confirmation"}  closeModal={setCloseModalConfim}>
                        {/* <Item item={selectedItem} closeModal={setCloseItemModal}/> */}
                        <div>
                            <h4>Are sure you want to delete this product?</h4>
                            <button 
                                    className='btn-action-delete' 
                                    onClick={()=> { 
                                                dispatch(onDelete(deleteItem.id))                 
                                                console.log(deleteItem.id,"item id")
                                                setCloseModalConfim(true) 
                                                // dispatch(deleteItem(selectedItem.id))
                                                }}
                            >
                                            Delete
                            </button>
                        </div>
                        
                        </Modal>}


                    {!sortedData ? <div>
                        <table className="table box-shadow table-hover table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                            <tr>
                            {tableHeader.map((header,index)=><th key={index} className="text-center">{header}</th>)}
                            </tr>
                            </thead>
                        </table>
                        <div className='table-nodata text-center'><Spinner/></div>
                        </div>
                    :
            
                     sortedData.length>0 ? 
                     <div>
                      <table className="table box-shadow table-hover table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                {tableHeader.map((header,index)=><th key={index} className="text-center" onClick={()=>onSort({column:index-1,order:"asc"})}>
                                   <span className='table-header'> 
                                        {header}{sortOption.column == index-1 && (sortOption.order=="asc"?<ArrowDropDown/>:<ArrowDropUp/>)}
                                   </span>
                                </th>)}
                                {showTableAction && <th>{''}</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((info,index)=>{
                                            return <tr key={index}>
                                                    <td key={index} className="text-center">
                                                        <div className='table-content'>{itemOrder + index}</div> 
                                                    </td>
                                                    {  info && tableColumn.map((property,index)=>{
                                                         
                                                           return <td key={index} className="text-center">
                                                                    <div className='table-content'>{info[property]}</div> 
                                                                  </td>
                                                    })}
                                                    {showTableAction && tableAction(info)}   
                                                    </tr>
                                                    
                                            }
                                )}
                            </tbody>
                        </table>
                        { tableTotal && <div className='table-total'>
                              {  tableTotal.map((total,i)=>{
                                            return <div key={i}><span><b>{total}:</b></span> {sortedData.reduce((previousValue, currentValue) => previousValue + Number(currentValue[total]),0)} </div>
                                })}
                            </div> 
                        }      
                        </div>
                        :
                        <div>
                        <table className="table box-shadow table-hover table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                            <tr>
                            {tableHeader.map((header,index)=><th key={index} className="text-center">{header}</th>)}
                            </tr>
                        </thead>
                        </table>
                        <div className='table-nodata text-center'> <p>No data </p></div>
                        </div>
                    }
            {console.log("activePage",activePage)}
            <div style={{display:"flex", justifyContent:"space-between",alignContent:"center"}}>
                {/* <input type="text" value /> */}
                    <select             
                            className='table-pageSize' 
                            type='select'
                            value={pageSize}
                            onChange={(e)=>setPageSize(Number(e.target.value))}
                                        // errorMessage={errors.email}
                    >
                       { [ ...Array(10).keys() ].map((_,i)=><option value={i+1} key={i+1}>{i+1}</option>)}
                    </select>              
                    <Pagination activePage={activePage} itemCount={itemCount} pageSize={pageSize} onPagination={onPagination}/>
            </div> 
        </div>
       
    )
}

export default Table
     {/* //         <tr key={index}>
        //             <td className="text-center">
        //                     <div className="c-avatar">
        //                             <img src={img} className="c-avatar-img" alt="admin@bootstrapmaster.com"/>
        //                             <span className="c-avatar-status bg-success">
        //                             </span>
        //                     </div>
        //             </td>

        //             <td>
        //                 <div>{parentInfo.nomParent}</div>
        //                 <div className="small text-muted">
        //                 <span>New</span> | Registered: Jan 1, 2015
        //                 </div>
        //             </td>

        //             <td>
        //                 <div className="small text-muted">{parentInfo.emailParent}</div>
        //                 <strong>10 sec ago</strong>
        //             </td>

        //             <td className="text-center">
        //               {parentInfo.tel1Parent}
        //             </td>

        //             <td className="text-center">
        //               {parentInfo.proffessionParent}
        //             </td>

        //             <td className="">
        //             {parentInfo.addresseParent}
        //             </td>
        //         </tr>
                        
        //   ))}  */}