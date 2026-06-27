// npm install @reduxjs/toolkit react-redux
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import Counter from "./Counter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Counter />
  </Provider>
);