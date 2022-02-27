import * as actions from "../actions/types";

    const initialState = {
        sizeisLoading: false,
        sizeData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.SIZE_LOADING:
               return {
                   ...state,
                   sizeisLoading: true
               };
            case actions.SIZE_LOADED:
                return {
                    ...state,
                    sizeData: action.payload.sizes,
                    sizeisLoading: false
                };
            case actions.ADD_SIZE:                    
                return {
                    ...state,
                    sizeData:[
                           ...state.sizeData,
                           action.payload.sizes
                    ]
                };   
            case actions.DELETE_SIZE:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }