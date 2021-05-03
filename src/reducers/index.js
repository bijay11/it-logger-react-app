import { combineReducers } from "redux";
import logReducer from "./logReducer";

const rootReducers = combineReducers({
  log: logReducer,
});

export default rootReducers;
