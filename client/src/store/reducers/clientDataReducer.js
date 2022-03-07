import * as actionTypes from "../actionTypes";

const defaultClientData= {
    client: {}
}

const clientDataReducer = (state = defaultClientData, action) => {
    const client = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_CLIENT_DATA:{
            return{
                client: client ? client : {},
            }
        }
        case actionTypes.CLEAR_CLIENT_DATA:{
            return defaultClientData;
        }
        default: {
            return state;
        }
    }

}

export default clientDataReducer;