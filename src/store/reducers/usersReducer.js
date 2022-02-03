import * as actions from "../actions/types";

    const initialState = {
        usersisLoading: false,
        usersData:[]
    };

    
    export default function(state = initialState, action){
        switch (action.type) {
            case  actions.USERS_LOADING:
               return {
                   ...state,
                   usersisLoading: true
               };
            case actions.USERS_LOADED:
                return {
                    ...state,
                    usersData: action.payload,
                    usersisLoading: false
                };
            case actions.ADD_USERS:                    
                return {
                    ...state,
                    usersData:[
                           ...state.users,
                           action.payload
                    ]
                };   
            case actions.DELETE_USERS:
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }