import * as actions from "../actions/types";

    const initialState = {
        providerisLoading: false,
        providerData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.PROVIDER_LOADING:
               return {
                   ...state,
                   providerisLoading: true
               };
            case actions.PROVIDER_LOADED:
                return {
                    ...state,
                    providerData: action.payload,
                    providerisLoading: false
                };
            case actions.ADD_PROVIDER:                    
                return {
                    ...state,
                    providerData:[
                           ...state.provider,
                           action.payload
                    ]
                };   
            case actions.DELETE_PROVIDER:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }