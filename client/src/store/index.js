import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userDataReducer from "./reducers/userDataReducer";
import typeNameReducer from "./reducers/typeNameReducer";
import clientDataReducer from "./reducers/clientDataReducer";
import typesDataReducer from "./reducers/typesDataReducer";
import logger from 'redux-logger';
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "typename", "client", "types"],
}
const rootReducer = combineReducers({
    user: userDataReducer,
    typename: typeNameReducer,
    client: clientDataReducer,
    types: typesDataReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
  
export const persistor = persistStore(store);
export default store;