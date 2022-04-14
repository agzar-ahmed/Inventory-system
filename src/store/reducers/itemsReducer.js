import * as actions from "../actions/types";
import groupBy from "../../utils/groupBy";

    const initialState = {
        itemsisLoading: false,
        itemsData:{}
    };
    
//    function reorderState (state){
//     var obj = {};
//     state.map(k => obj[k.id] = k)
//     return obj
//    }
    

    
    export default function(state = initialState, action){
      
        switch (action.type) {
            case  actions.ITEMS_LOADING:
               return {
                   ...state,
                   itemsisLoading: true
               };
            case actions.ITEMS_LOADED:
                return {
                    ...state,
                    itemsData: {
                        byIds:groupBy(action.payload.items,'id'),
                        allIds: action.payload.items.map(inventory=>inventory.id)
                    }, 
                    itemsisLoading: false
                };
            case  actions.ITEMS_ERROR:
               return {
                   ...state,
                   itemsisLoading: false
               };
            case actions.UPDATE_ITEMS:   
            // const { id } = action.payload               
               return {
                   ...state,
                   itemsData:{
                          ...state.itemsData,
                          [action.payload.id]: {...action.payload}
                   }
               };   
            case actions.ADD_ITEMS:                    
                return {
                    ...state,
                    itemsData:{
                           ...state.itemsData,
                           [action.payload.items.id]: {...action.payload.items}
                        //    action.payload.items
                    }
                };   
            case actions.DELETE_ITEMS: 
            delete state.itemsData[action.payload.id]    
                return {
                    ...state,
                    itemsData:{
                        ...state.itemsData,       
                 }
                }; 
            default:
                return state;
    
        }
    }