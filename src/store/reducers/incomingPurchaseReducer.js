import * as actions from "../actions/types";

    const initialState = {
        incomingPurchaseisLoading: false,
        incomingPurchaseData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.INCOMING_PURCHASES_LOADING:
               return {
                   ...state,
                   incomingPurchaseisLoading: true
               };
            case actions.INCOMING_PURCHASES_LOADED:
                return {
                    ...state,
                    incomingPurchaseData: action.payload.IncomingPurchase,
                    incomingPurchaseisLoading: false
                };
            case actions.ADD_INCOMING_PURCHASES:    
                return {
                    ...state,
                    incomingPurchaseData:[
                           ...state.incomingPurchaseData,
                           ...action.payload.IncomingPurchase
                    ]
                };   
            case actions.DELETE_INCOMING_PURCHASES:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }