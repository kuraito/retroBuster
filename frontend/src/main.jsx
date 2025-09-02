import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/*
v7_startTransition: true
Mantiene l'interfaccia più fluida durante navigazioni lente
Avvolge automaticamente le navigazioni in `React.startTransition()`

v7_relativeSplatPath: true
Cambia come vengono risolti i path relativi nelle route
*/