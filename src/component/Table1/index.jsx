import React,{useState,useEffect} from 'react'
import './style.css'
import Pagination from '../Pagination'
import { paginate } from '../../utils/paginate'

import img from "./picture.jpg"
import { ShoppingBag } from '@mui/icons-material';


function Table({tableSize, tableHeader, tableData}) {
    // const tableHeader =[<ShoppingBag/>,'Parent','Email','Téléphone 1','Proffession','Adresse']
    const [ itemCount,setItemnCount ] = useState(tableData.length)
    const [ pageSize,setPageSize ] = useState(tableSize? tableSize:10);
    const [data, setData ] = useState(paginate(tableData,1,pageSize));
    // const properties = Object.keys(tableData[0])
    const onPagination =(page)=>{
     setData(paginate(tableData,page,pageSize))
    }
    //console.log(parentData,'parentData table component')
    useEffect(()=>{
        onPagination(1)
        setItemnCount(tableData.length)
        console.log(itemCount,"setItemnCount")
    },[tableData])
    return (
        <div>
                    {!data && <div>
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                            <tr>
                            {tableHeader.map((header,index)=><th key={index} className="text-center">{header}</th>)}
                            </tr>
                            </thead>
                        </table>
                        <div className='table-nodata text-center'> <p>...Loading </p></div>
                        </div>
                    }
            
                    { data.length>1 ? 
                      <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                {tableHeader.map((header,index)=><th key={index} className="text-center">{header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((parentInfo,index)=>{
                                            return <tr key={index}>
                                                    {  parentInfo && Object.keys(parentInfo).map((property,index)=>{
                                                            return <td key={index} className="text-center">
                                                                    <div>{parentInfo[property]}</div> 
                                                                    </td>
                                                    })}
                                                    </tr>   
                                            }
                                )}
                            </tbody>
                        </table>
                        :
                        <div>
                        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                            <tr>
                            {tableHeader.map((header,index)=><th key={index} className="text-center">{header}</th>)}
                            </tr>
                            </thead>
                        </table>
                        <div className='table-nodata text-center'> <p>No data </p></div>
                        </div>
                    }
            
            <Pagination itemCount={itemCount} pageSize={pageSize} onPagination={onPagination}/>
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