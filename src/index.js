import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import Seed from "./Seed";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path=":seed" element={<Seed />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
