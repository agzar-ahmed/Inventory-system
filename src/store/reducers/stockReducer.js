import * as actions from "../actions/types";

    const initialState = {
        stockisLoading: false,
        stockData:[],
        stockByInventory:{}
    };

    function reorderState (state){
        var obj = {};
        state.map(k => obj[k.id] = k)
        return obj
       }

    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.STOCK_LOADING:
               return {
                   ...state,
                   stockisLoading: true
               };
              
            case actions.STOCK_LOADED:
                // console.log(action.payload.stock,'stock')

                return {
                    ...state,
                    stockData:reorderState(action.payload.stock),
                    stockisLoading: false
                };
           
            case actions.STOCKBYINVENTORY_LOADED:
                // console.log(action.payload.stock,'stockByInventory')
                return {
                    ...state,
                    stockByInventory:action.payload.stock,
                    stockisLoading: false
                };
            // case actions.ADD_INVENTORYITEM:                    
            //     return {
            //         ...state,
            //         inventoryItemData:[
            //                ...state.inventoryItemData,
            //                action.payload
            //         ]
            //     };   
            // case actions.UPDATE_INVENTORYITEM:   
            //     // const { id } = action.payload               
            //     return {
            //         ...state,
            //         inventoryItemData:{
            //                 ...state.inventoryItemData,
            //                 [action.payload.inventoryItems.id]: {...action.payload.inventoryItems}
            //         }
            //     };   

            // case actions.DELETE_INVENTORYITEM:
            //     delete state.inventoryItemData[action.payload.id]    
            //     return {
            //         ...state,
            //         inventoryItemData:{
            //             ...state.inventoryItemData,       
            //         }
            //     };  
            default:
                return state;
    
        }
    }