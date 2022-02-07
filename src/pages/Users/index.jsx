import React,{useState,useEffect} from 'react';
import TopBar from '../../component/TopBar'
import { DataGrid } from '@material-ui/data-grid';
import './style.css';
import {usersRows} from '../../dummyData'
import {Link} from 'react-router-dom'
import { DeleteOutlineSharp } from '@material-ui/icons';
import { getUsers } from '../../store/actions/usersActions';
import {usersSelector} from '../../store/selectors/usersSelector'
import { useDispatch,useSelector } from 'react-redux';


export default function Users() {
    const[data,setData] = useState([]);
    const[tableColumn,setTableColumn] = useState([]);


    const handelDelete=(id)=>{
       setData(data.filter((items)=>items.id !== id))
    }
    
    const setTableData=(keys)=>{
        setTableColumn(keys)
    }

    let columns = []; 
    columns = 
    [
        ...tableColumn.map(title=>({
            field: title , 
            headerName: title, 
            width: 150, 
            // valueGetter: (params) => {
            //     // return console.log(params,'table data')            
            //     // return params.getValue(params.id, "attributes").userId;
            // }
        })),
        // { field: 'id', headerName: 'ID', width: 90 },
        // { field: 'user', headerName: 'User', width: 200, editable: true,
        //  renderCell:(params)=>{
        //       return(
        //           <div className="userRow">
        //               <img src={params.row.avatar} alt="userAvatar" />
        //               {params.row.userName}
        //           </div>
        //       )
        //  }
        // },
        // { field: 'email', headerName: 'Email', width: 200, editable: true,},
        // { field: 'status', headerName: 'Status', width: 120, editable: true,},
        // { field: 'transaction', headerName: 'Transaction', width: 150, editable: true,},
        // { field: 'action', headerName: 'Action', width: 200, editable: true,
        //  renderCell:(params)=>{
        //       return(
        //           <>
        //           <Link to={'/user/'+params.row.id}><button className="usersEdit">Edit</button></Link>
        //           <button className="usersDelete" onClick={()=>handelDelete(params.row.id)}>Delete</button>
        //           </>
        //       )
        //  }
        //  },
    ];

    const renderTable=(users)=>{
        if(users.length > 0){
            
            const keys=Object.keys(users[0])
            console.log(users,users[0],"keys and users")
             keys && setTableColumn(keys)
             users && setData(users)
            return 
        }
    }
      
    //life cycle HOOKS
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUsers());
    }
    ,[])

    const usersList = useSelector(usersSelector())
     
    useEffect(()=>{
            renderTable(usersList)
    }
    ,[usersList])
    

    return (
        <div className="usersTable">
            <TopBar/>
            <DataGrid
                      rows={data}
                      columns={columns}
                      pageSize={8}
                      checkboxSelection
                      disableSelectionOnClick
                      onSelectionModelChange={(ids) => {
                        // const selectedIDs = new Set(ids);
                        // const selectedRows = data.rows.filter((row) =>
                        //   selectedIDs.has(row.id),
                        //  );
                        return console.log(ids,'selected row')
                        // setSelectedRows(selectedRows);
                     }}
            />
        </div>
    )
}