import * as actions from "../actions/types";

    const initialState = {
        inventoryItemisLoading: false,
        inventoryItemData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.INVENTORYITEM_LOADING:
               return {
                   ...state,
                   inventoryItemisLoading: true
               };
            case actions.INVENTORYITEM_LOADED:
                return {
                    ...state,
                    inventoryItemData: action.payload.inventoryItems,
                    inventoryItemisLoading: false
                };
            case actions.ADD_INVENTORYITEM:                    
                return {
                    ...state,
                    inventoryItemData:[
                           ...state.inventoryItemData,
                           action.payload
                    ]
                };   
            case actions.DELETE_INVENTORYITEM:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }