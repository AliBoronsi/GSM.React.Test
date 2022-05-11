/** @format */

import React from "react";
import ReactDOM from "react-dom";
import CarTypes from "./components/car-type";
import Todos from "./components/todos";

import "./index.css";

const App = () => (
  <div className='container'>
    {/* <Todos></Todos> */}
    <CarTypes></CarTypes>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
