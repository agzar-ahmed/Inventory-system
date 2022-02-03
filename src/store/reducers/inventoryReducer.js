import * as actions from "../actions/types";

    const initialState = {
        inventoryisLoading: false,
        inventoryData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.INVENTORY_LOADING:
               return {
                   ...state,
                   inventoryisLoading: true
               };
            case actions.INVENTORY_LOADED:
                return {
                    ...state,
                    inventoryData: action.payload,
                    inventoryisLoading: false
                };
            case actions.ADD_INVENTORY:                    
                return {
                    ...state,
                    inventoryData:[
                           ...state.inventory,
                           action.payload
                    ]
                };   
            case actions.DELETE_INVENTORY:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }