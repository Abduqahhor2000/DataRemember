import * as actionTypes from "../actionTypes";

export const addUserData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_USER_DATA,
    }
}
export const clearUserData = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA,
    }
}