import * as actionTypes from "../actionTypes";

const defaultTypeName= {
    typename: {}
}

const typeNameReducer = (state = defaultTypeName, action) => {
    const type = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_TYPE_NAME:{
            return{
                typename: type ? type : {},
            }
        }
        case actionTypes.CLEAR_TYPE_NAME:{
            return defaultTypeName;
        }
        default: {
            return state;
        }
    }

}

export default typeNameReducer;