import * as actions from "../actions/types";

    const initialState = {
        companyisLoading: false,
        companyData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.COMPANIES_LOADING:
               return {
                   ...state,
                   companyisLoading: true
               };
            case actions.COMPANIES_LOADED:
                return {
                    ...state,
                    companyData: action.payload.companies,
                    companyisLoading: false
                };
            case actions.ADD_COMPANIES:    
                return {
                    ...state,
                    companyData:[
                           ...state.companyData,
                           ...action.payload.companies
                    ]
                };   
            case actions.DELETE_COMPANIES:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }