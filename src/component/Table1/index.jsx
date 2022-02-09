import React,{useState} from 'react'
import './style.css'
import Pagination from '../Pagination'
import { paginate } from '../../utils/paginate'

import img from "./picture.jpg"
import { ShoppingBag } from '@mui/icons-material';


function Table({tableTittle, tableHeaders, tabledata}) {
    const tableHeader =[<ShoppingBag/>,'Parent','Email','Téléphone 1','Proffession','Adresse']
    const [ pageSize,setPageSize ] = useState(5)
    const parentData = 
    [
        {nomParent:'test1',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test2',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test3',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test4',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test5',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test6',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test7',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test8',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test9',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test10',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test11',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test12',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test13',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test14',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test15',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test16',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test17',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test18',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test19',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test20',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test21',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test22',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test23',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test24',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test25',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test26',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}, 
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"},
        {nomParent:'test',tel1Parent:'01245654865',proffessionParent:'test proffession',addresseParent:"address parent"}
    ]
    const [data, setData ] = useState(paginate(parentData,1,pageSize));
    const onPagination =(page)=>{
     setData(paginate(parentData,page,pageSize))
    }
    //console.log(parentData,'parentData table component')
    return (
        <div>
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-light">
                    <tr>
                    {tableHeader.map(header=><th className="text-center">{header}</th>)}
                    </tr>
            </thead>
            <tbody>
           { data.map((parentInfo,index)=>(    
                <tr key={index}>
                    <td className="text-center">
                            <div className="c-avatar">
                                    <img src={img} className="c-avatar-img" alt="admin@bootstrapmaster.com"/>
                                    <span className="c-avatar-status bg-success">
                                    </span>
                            </div>
                    </td>

                    <td>
                        <div>{parentInfo.nomParent}</div>
                        <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                        </div>
                    </td>

                    <td>
                        <div className="small text-muted">{parentInfo.emailParent}</div>
                        <strong>10 sec ago</strong>
                    </td>

                    <td className="text-center">
                      {parentInfo.tel1Parent}
                    </td>

                    <td className="text-center">
                      {parentInfo.proffessionParent}
                    </td>

                    <td className="">
                    {parentInfo.addresseParent}
                    </td>
                </tr>
                        
           ))} 
               </tbody>
            </table>
            <Pagination itemCount={parentData.length} pageSize={pageSize} onPagination={onPagination}/>
        </div>
    )
}

export default Table
