import { createStore } from "redux";
import rootReducer from "./rootReducer";

// SETTING THE DEFAULT REDUX STATE ON REBOUT
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

// STORE INIT
export const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// IF SOMETHING ARE CHANGES IN STORE, WE WRITE NEW STATE IN LOCALSTORAGE
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
