import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
