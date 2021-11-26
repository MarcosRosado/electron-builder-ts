import { combineReducers } from "redux";
import * as allReducers from "./reducers";

const reducers = combineReducers(allReducers);

export default reducers;
