import * as action from '../actions/types'


export const apiCallBegan = (data) => {
    return {
                    type: action.API_CALL_BEGAN,
                    payload: data
            }
};

export const apiCallSuccess = (data) => {
    return ({
                        type: action.API_CALL_SUCCESS,
                        payload: data
                    })
};

export const apiCallFailed =(error)=>{
    return {
                type: action.API_CALL_FAILED,
                payload: error
            }
}