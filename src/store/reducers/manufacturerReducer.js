import * as actions from "../actions/types";

    const initialState = {
        manufacturerisLoading: false,
        manufacturerData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.MANUFACTURER_LOADING:
               return {
                   ...state,
                   manufacturerisLoading: true
               };
            case actions.MANUFACTURER_LOADED:
                return {
                    ...state,
                    manufacturerData: action.payload.manufacturers,
                    manufacturerisLoading: false
                };
            case actions.ADD_MANUFACTURER:                    
                return {
                    ...state,
                    manufacturerData:[
                           ...state.manufacturer,
                           action.payload
                    ]
                };   
            case actions.DELETE_MANUFACTURER:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }