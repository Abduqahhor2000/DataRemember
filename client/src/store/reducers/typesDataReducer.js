import * as actionTypes from "../actionTypes";

const defaultTypes= {
    types: {}
}

const typesReducer = (state = defaultTypes, action) => {
    const types = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_TYPES_DATA:{
            return{
                types: types ? types : {},
            }
        }
        case actionTypes.CLEAR_TYPES_DATA:{
            return defaultTypes;
        }
        default: {
            return state;
        }
    }

}

export default typesReducer;