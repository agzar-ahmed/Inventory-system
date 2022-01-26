import React,{useState,useEffect} from 'react';
import TopBar from '../TopBar'
import { DataGrid } from '@material-ui/data-grid';
import './style.css';
import {usersRows} from '../../dummyData'
import {Link} from 'react-router-dom'
import { DeleteOutlineSharp } from '@material-ui/icons';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { grid } from '@mui/system';

import { useDispatch } from 'react-redux';
import { postIncomingPurchases } from '../../store/actions/incomingPurchaseActions'




 function Table({tableData}) {
    const[data,setData] = useState([]);
    const[tableColumn,setTableColumn] = useState([]);
    const[rows,setRows] = useState([]);
    const[selectedRow,setSelectedRow] = useState([9]);
    

    const dispatch = useDispatch() 

    useEffect(() => {
      console.log(selectedRow,"selected row from useEffect")
    }, [selectedRow])
    /*grid Editting */
    const [gridApi, setGridApi] = useState(null);
    const onGridReady = (params) => {
      console.log(params,'on Grid Ready')
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
    };

    const onBtStopEditing = () => {
      gridApi.stopEditing();
    };
  
    const onBtStartEditing = (params) => {
      console.log(params)
      console.log(gridApi,"gridAPI")
      console.log(gridApi.startEditingCell,"gridApi.startEditingCell")
      // gridApi.setFocusedCell(2, 'name');
      gridApi.startEditingCell({
        rowIndex: 2,
        colKey: 'name',
      });
    } 

    /*Grid Editting */
    const handelDelete=(id)=>{
       setData(data.filter((items)=>items.id !== id))
    }
    
    const setTableData=(keys)=>{
        setTableColumn(keys)
    }
/*start grid */
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
  
    // const onGridReady = (params) => {
    //   setGridApi(params.api);
    //   setGridColumnApi(params.columnApi);
    //   const updateData = (data) => params.api.setRowData(data);
  
    //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //       updateData(data)});
        
    // };
    // let listColumn = ()=>{    
    //  const columns = tableColumn.map((column)=>{
    //        <AgGridColumn headerName={column} field={column} />
    //   })
    //   console.log(columns)
    //   return 
    // }
  /*end grid */   

    const tableContent=async(items)=>{
        if(items){
            const keys=Object.keys(items[0])
            // keys.push('actions')
            if(keys){
                     setTableColumn(keys)
                     gridTable(keys)
                    }    
            const filtredItems = items.filter(item=>item !== items[0]) 
            console.log(filtredItems,'filtedItems')     
            items && setData(filtredItems)
            return 
        }
    }
      
    const gridTable=(keys)=>{
      
      console.log(tableColumn,"tableColumn")
      const agGrid =[
        ...keys.map(title=>({
            field: title,
            headerName: title, 
            width: 150,
            hide: title==="id" && true
        })),
        {
          field: "id",
          headerName:"action",
          colId: "action",
          width:200,
          sortable: false,
          editable:false,
          cellRendererFramework:(params)=>{
            // console.log(selectedRow,"selected row from cellRendererFramework")
            // console.log(selectedRow,params.value,"rende buttons")
            console.log(params.api.getSelectedRows().map(item=>item.id),params.value,"getselected")
            // gridApi.refreshCells(params);
            const mySelectedRow = params.api.getSelectedRows().map(item=>item.id)
            return(
              mySelectedRow.includes(params.value) && 
              <div>
                <button className="btn-action-edit" onClick={() => onBtStartEditing(params)}>Edit</button> 
                <button className="btn-action-delete" onClick={() => onBtStopEditing(params)}>Cancel</button>
              </div>)
              }, 
        },     ]
      
      console.log(agGrid,"agGrid")
      agGrid && setRows(agGrid)
    }
  
   
    useEffect(()=>{
      tableContent(tableData)
    }
    ,[])
    

    return (
        <div className="productsTable">
            <div className="productsGrid ag-theme-alpine">
            <AgGridReact
                defaultColDef={{
                  width: 150,
                  editable: true,
                  filter: 'agTextColumnFilter',
                  floatingFilter: true,
                  resizable: true,
                  sortable:true,
                }}
                rowData={data}
                onGridReady={onGridReady}
                editType={'fullRow'}
                rowSelection='multiple'
                pagination={true}
                paginationPageSize={20}
                onSelectionChanged={(e)=> {
                  console.log(e.api.getSelectedRows().map(item=>item.id))
                  const selectedItemId = e.api.getSelectedRows().map(item=>item.id)
                  setSelectedRow(selectedItemId)
                  console.log(selectedRow,"selected row from onSelectChange")
                  
                  gridApi.refreshCells({
                    // columns: ["action"],
                    // rowNodes: [e.node],
                    // suppressFlash:false,
                     force: true
                  });
                }}
            >
        {   
           rows.map((row,index)=> <AgGridColumn
            checkboxSelection={index===1&&true} 
            headerCheckboxSelection={index===1&&true}
            field={row.field}
            headerName={row.headerName} 
            cellRendererFramework={row.cellRendererFramework} 
            width={row.width && row.width} 
            key={index}
            hide={row.hide}
            sortable= {row.sortable}
            />
            )
        }

{/* <AgGridColumn field="id" headerName="action" width={150} cellRendererFramework={(params)=><div>test</div>} /> */}
            {/* {
          field: "id", 
          headerName:"action", 
          width:150, 
          cellRendererFramework =(params)=>{
          return(<div>test</div>)
        } */}
        
          </AgGridReact>
          <button  className="btn btnSubmit" onClick={()=>dispatch(postIncomingPurchases(data))}>Submit data</button>
            </div>
        </div>
    )
}





export {
  Table
}