import * as actions from "../actions/types";

    const initialState = {
        itemsisLoading: false,
        itemsData:null
    };

    
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
                    itemsData: action.payload.items.results.rows,
                    itemsisLoading: false
                };
            case  actions.ITEMS_ERROR:
               return {
                   ...state,
                   itemsisLoading: false
               };
            case actions.ADD_ITEMS:                    
                return {
                    ...state,
                    itemsData:[
                           ...state.itemsData,
                           action.payload.items.results.rows
                    ]
                };   
            case actions.DELETE_ITEMS:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }