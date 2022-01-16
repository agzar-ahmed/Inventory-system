import {
        //product types
        ADD_PRODUCT_TYPE,
        DELETE_PRODUCT_TYPE,
        CLEAR_PRODUCT_TYPE,
        PRODUCT_TYPE_ERROR,
        PRODUCT_TYPE_LOADED,
        PRODUCT_TYPE_LOADING
       //PRODUCT_ERROR
            } from "../actions/types";
          
        
        const initialState = {
            productTypeisLoading: false,
            productTypeData:null
        };
    
        
        export default function(state = initialState, action){
            switch (action.type) {
                case  PRODUCT_TYPE_LOADING:
                   return {
                       ...state,
                       productTypeisLoading: true
                   };
                case PRODUCT_TYPE_LOADED:
                    return {
                        ...state,
                        productTypeData: action.payload,
                        productTypeisLoading: false
                    };
                case ADD_PRODUCT_TYPE:                    
                    return {
                        ...state,
                        productTypeData:[
                               ...state.productType,
                               action.payload
                        ]
                    };   
                case DELETE_PRODUCT_TYPE:
                    return {
                        ...state,
                    }; 
                default:
                    return state;
        
            }
        }