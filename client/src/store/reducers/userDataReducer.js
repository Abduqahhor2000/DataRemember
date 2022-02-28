import * as actionTypes from "../actionTypes";

const initialState = {
    user: {}
}

const userDataReducer = (state = initialState, action) => {
    const user = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_USER_DATA:{
            return{
                user: user ? user : {},
            }
        }
        case actionTypes.CLEAR_USER_DATA:{
            return initialState;
        }
        default: {
            return state;
        }
    }

}

export default userDataReducer;