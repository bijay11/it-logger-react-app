import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";

const rootReducers = combineReducers({
  log: logReducer,
  tech: techReducer,
});

export default rootReducers;
