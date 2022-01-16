//RETURN ERRORS
// export const returnErrors = (msg, status, id=null) => {
//     return {
//         type: "error",
//         //GET_ERRORS,
//         payload:{msg, status, id}
//     };
// };


export const returnErrors = (msg, status, id=null) => {
    return dispatch({
        type: onSuccess,
        payload: resJson.items
        })
};


export const returnErrors = (msg, status, id=null) => {
    return {
        type: "error",
        //GET_ERRORS,
        payload:{msg, status, id}
    };
};
