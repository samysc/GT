// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AppBorne  from "./App.js";
import AppCaisse from "./AppCaisse.js";

// on lit l'env au démarrage (défini par cross-env)
const mode = process.env.REACT_APP_MODE;

const RootApp = mode === "caisse" 
  ? AppCaisse 
  : AppBorne;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
