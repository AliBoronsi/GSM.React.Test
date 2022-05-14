/** @format */

import React from "react";
import ReactDOM from "react-dom";
import CarTypes from "./components/car-type";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CarTypesUpsert from "./components/car-type-upsert";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<CarTypes />} />
            <Route path="upsert" element={<CarTypesUpsert />} />
            <Route path="upsert/:id" element={<CarTypesUpsert />} />
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
          {/* <Route path="contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
