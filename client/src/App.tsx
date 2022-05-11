/** @format */

import React from "react";
import ReactDOM from "react-dom";
import Todos from "./components/todos";

import "./index.css";

const App = () => (
  <div className='container'>
    <Todos></Todos>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
