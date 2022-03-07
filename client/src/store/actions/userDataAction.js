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
export const addTypeName = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_TYPE_NAME,
    }
}
export const clearTypeName = () => {
    return {
        type: actionTypes.CLEAR_TYPE_NAME,
    }
}
export const addClientData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_CLIENT_DATA,
    }
}
export const clearClientData = () => {
    return {
        type: actionTypes.CLEAR_CLIENT_DATA,
    }
}
export const addTypesData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_TYPES_DATA,
    }
}
export const clearTypesData = () => {
    return {
        type: actionTypes.CLEAR_TYPES_DATA,
    }
}