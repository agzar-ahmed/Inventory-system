import * as actions from "../actions/types";
import groupBy from "../../utils/groupBy"

    const initialState = {
        incomingPurchaseisLoading: false,
        incomingPurchaseDetailsisLoading:false,
        incomingPurchaseData:[],
        incomingPurchaseDetails:[]
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
                    incomingPurchaseData: {
                        byIds:groupBy(action.payload.IncomingPurchase,'id'),
                        allIds: action.payload.IncomingPurchase.map(purchase=>purchase.id)
                    },
                    incomingPurchaseisLoading: false
                };
            case actions.ADD_INCOMING_PURCHASES:    
                return {
                    ...state,
                    incomingPurchaseData:{
                        byIds:{
                            ...state.incomingPurchaseData.byIds,
                            [action.payload.IncomingPurchase.id]: action.payload.IncomingPurchase
                            },
                        allIds:[...state.incomingPurchaseData.allIds,action.payload.IncomingPurchase.id]    
                        },
                };   
            case actions.DELETE_INCOMING_PURCHASES:
                return {
                    ...state,
                };

           /*************************************incomingPurchaseDetailsis********************************/

            case  actions.INCOMING_PURCHASES_DETAILS_LOADING:
                return {
                    ...state,
                    incomingPurchaseDetailsisLoading: true
                };

            case actions.INCOMING_PURCHASES_DETAILS_LOADED:
                return {
                    ...state,
                    incomingPurchaseDetails: {
                        byIds:groupBy(action.payload.incomingPurchaseDetail,'id'),
                        allIds: action.payload.incomingPurchaseDetail.map(purchase=>purchase.id)
                    },
                    incomingPurchaseDetailsisLoading: false
                };

            case actions.ADD_INCOMING_PURCHASES_DETAILS:    
            const IncomingDetailsAdded = groupBy(action.payload.incomingPurchaseDetail)
            return {
                ...state,                    
                incomingPurchaseDetails: {
                    byIds:  {
                         ...state.incomingPurchaseDetails.byIds,
                         ...IncomingDetailsAdded
                    }
                    ,
                    allIds: [...state.incomingPurchaseDetails.allIds,action.payload.incomingPurchaseDetail.id]
                },
            };   

            case actions.UPDATE_INCOMING_PURCHASES_DETAILS:   
            // const { id } = action.payload               
               return {
                   ...state,
                   incomingPurchaseDetails: {
                    byIds:  {
                         ...state.incomingPurchaseDetails.byIds,
                         [action.payload.id]: {...action.payload},
                    }
                    ,
                    allIds: [...state.incomingPurchaseDetails.allIds]
                },
               };

            case actions.DELETE_INCOMING_PURCHASES_DETAILS:
            return {
                ...state,
            }; 

            default:
            return state;
    
        }
    }