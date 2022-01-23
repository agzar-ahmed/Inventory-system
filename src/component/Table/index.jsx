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



 function Table({tableData}) {
    const[data,setData] = useState([]);
    const[tableColumn,setTableColumn] = useState([]);
    const[rows,setRows] = useState([]);
    const[selectedRow,setSelectedRow] = useState([9]);
    
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
            items && setData(items)
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

            </div>
        </div>
    )
}


function ProductsTable1() {
  return(null);
//   const [gridApi, setGridApi] = useState(null);
//   const [gridColumnApi, setGridColumnApi] = useState(null);
//   const [rowData, setRowData] = useState(null);

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     setGridColumnApi(params.columnApi);
//     const updateData = (data) => params.api.setRowData(data);

//     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//       .then((resp) => resp.json())
//       .then((data) => {
//         console.log(data)
//         updateData(data)});
      
//   };

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <div style={{ height: '100%', boxSizing: 'border-box' }}>
//         <div
//           id="myGrid"
//           style={{
//             height: '100%',
//             width: '100%',
//           }}
//           className="ag-theme-alpine"
//         >
//           <AgGridReact
//             defaultColDef={{
//               width: 150,
//               editable: true,
//               filter: 'agTextColumnFilter',
//               floatingFilter: true,
//               resizable: true,
//             }}
//             defaultColGroupDef={{ marryChildren: true }}
//             columnTypes={{
//               numberColumn: {
//                 width: 130,
//                 filter: 'agNumberColumnFilter',
//               },
//               medalColumn: {
//                 width: 100,
//                 columnGroupShow: 'open',
//                 filter: false,
//               },
//               nonEditableColumn: { editable: false },
//               dateColumn: {
//                 filter: 'agDateColumnFilter',
//                 filterParams: {
//                   comparator: (filterLocalDateAtMidnight, cellValue) => {
//                     const dateParts = cellValue.split('/');
//                     const day = Number(dateParts[0]);
//                     const month = Number(dateParts[1]) - 1;
//                     const year = Number(dateParts[2]);
//                     const cellDate = new Date(year, month, day);
//                     if (cellDate < filterLocalDateAtMidnight) {
//                       return -1;
//                     } else if (cellDate > filterLocalDateAtMidnight) {
//                       return 1;
//                     } else {
//                       return 0;
//                     }
//                   },
//                 },
//               },
//             }}
//             rowData={rowData}
//             onGridReady={onGridReady}
//           >
//             <AgGridColumn headerName="Athlete" field="athlete" />
//             <AgGridColumn headerName="Sport" field="sport" />
//             <AgGridColumn headerName="Age" field="age" type="numberColumn" />
//             <AgGridColumn headerName="Year" field="year" type="numberColumn" />
//             <AgGridColumn
//               headerName="Date"
//               field="date"
//               type={['dateColumn', 'nonEditableColumn']}
//               width={220}
//             />
//             <AgGridColumn headerName="Medals" groupId="medalsGroup">
//               <AgGridColumn headerName="Gold" field="gold" type="medalColumn" />
//               <AgGridColumn
//                 headerName="Silver"
//                 field="silver"
//                 type="medalColumn"
//               />
//               <AgGridColumn
//                 headerName="Bronze"
//                 field="bronze"
//                 type="medalColumn"
//               />
//               <AgGridColumn
//                 headerName="Total"
//                 field="total"
//                 type="medalColumn"
//                 columnGroupShow="closed"
//               />
//             </AgGridColumn>
//           </AgGridReact>
//         </div>
//       </div>
//     </div>
//   );
 };


/*Material ui grid system Paid version*/

// import * as React from 'react';
// import PropTypes from 'prop-types';
// // import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// // import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { Add } from '@material-ui/icons';
// import {Edit} from '@material-ui/icons';
// import {Delete} from '@material-ui/icons';
// import{ Save }from  '@material-ui/icons';
// import {Cancel} from  '@material-ui/icons';
// import {
//   useGridApiRef,
//   DataGridPro,
//   GridToolbarContainer,
//   GridActionsCellItem,
// } from '@mui/x-data-grid-pro';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
//   randomId,
// } from '@mui/x-data-grid-generator';

// const rows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];

// function EditToolbar(props) {
//   const { apiRef } = props;

//   const handleClick = () => {
//     const id = randomId();
//     apiRef.current.updateRows([{ id, isNew: true }]);
//     apiRef.current.setRowMode(id, 'edit');
//     // Wait for the grid to render with the new row
//     setTimeout(() => {
//       apiRef.current.scrollToIndexes({
//         rowIndex: apiRef.current.getRowsCount() - 1,
//       });

//       apiRef.current.setCellFocus(id, 'name');
//     });
//   };

//   return (
//     <GridToolbarContainer>
//       <button>
//         Add record
//       </button>
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   apiRef: PropTypes.shape({
//     current: PropTypes.object.isRequired,
//   }).isRequired,
// };

// export default function FullFeaturedCrudGrid() {
//   const apiRef = useGridApiRef();

//   const handleRowEditStart = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleRowEditStop = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleCellFocusOut = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleEditClick = (id) => (event) => {
//     event.stopPropagation();
//     apiRef.current.setRowMode(id, 'edit');
//   };

//   const handleSaveClick = (id) => (event) => {
//     event.stopPropagation();
//     apiRef.current.commitRowChange(id);
//     apiRef.current.setRowMode(id, 'view');

//     const row = apiRef.current.getRow(id);
//     apiRef.current.updateRows([{ ...row, isNew: false }]);
//   };

//   const handleDeleteClick = (id) => (event) => {
//     event.stopPropagation();
//     apiRef.current.updateRows([{ id, _action: 'delete' }]);
//   };

//   const handleCancelClick = (id) => (event) => {
//     event.stopPropagation();
//     apiRef.current.setRowMode(id, 'view');

//     const row = apiRef.current.getRow(id);
//     if (row.isNew) {
//       apiRef.current.updateRows([{ id, _action: 'delete' }]);
//     }
//   };

//   const columns = [
//     { field: 'name', headerName: 'Name', width: 180, editable: true },
//     { field: 'age', headerName: 'Age', type: 'number', editable: true },
//     {
//       field: 'dateCreated',
//       headerName: 'Date Created',
//       type: 'date',
//       width: 180,
//       editable: true,
//     },
//     {
//       field: 'lastLogin',
//       headerName: 'Last Login',
//       type: 'dateTime',
//       width: 220,
//       editable: true,
//     },
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       cellClassName: 'actions',
//       getActions: ({ id }) => {
//         const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<Save />}
//               label="Save"
//               onClick={handleSaveClick(id)}
//               color="primary"
//             />,
//             <GridActionsCellItem
//               icon={<Cancel />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<Edit />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<Delete />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <div
//     //   sx={{
//     //     height: 500,
//     //     width: '100%',
//     //     '& .actions': {
//     //       color: 'text.secondary',
//     //     },
//     //     '& .textPrimary': {
//     //       color: 'text.primary',
//     //     },
//     //   }}
//     >
//       <DataGridPro
//         rows={rows}
//         columns={columns}
//         apiRef={apiRef}
//         editMode="row"
//         onRowEditStart={handleRowEditStart}
//         onRowEditStop={handleRowEditStop}
//         onCellFocusOut={handleCellFocusOut}
//         components={{
//           Toolbar: EditToolbar,
//         }}
//         componentsProps={{
//           toolbar: { apiRef },
//         }}
//       />
//     </div>
//   );
// }



export {
  Table,
  ProductsTable1
}