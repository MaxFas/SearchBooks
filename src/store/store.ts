import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "../reducers/appReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;