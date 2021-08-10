import { combineReducers } from "redux";
import { roomsReducer } from "./rooms/reducers";
import { projectReducer } from "./project/reducers";
import { appReducer } from "./app/reducers";

export default combineReducers({
  app: appReducer,
  project: projectReducer,
  rooms: roomsReducer,
});
