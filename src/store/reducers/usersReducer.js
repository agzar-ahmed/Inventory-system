import * as actions from "../actions/types";
import groupBy from "../../utils/groupBy";

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
                    usersData: {
                        byIds:groupBy(action.payload.users,'id'),
                        allIds: action.payload.users.map(purchase=>purchase.id)
                },
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