import * as actions from "../actions/types";
import groupBy from '../../utils/groupBy'

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
                    inventoryData:  {
                                byIds:groupBy(action.payload.inventories,'id'),
                                allIds: action.payload.inventories.map(inventory=>inventory.id)
                            },
                    inventoryisLoading: false
                };
            case actions.ADD_INVENTORY:                    
                return {
                    ...state,
                    inventoryData:[
                           ...state.inventory,
                           groupBy(action.payload.inventories)
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