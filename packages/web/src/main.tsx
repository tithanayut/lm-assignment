import "./globals.css";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const app = document.getElementById("root") as HTMLDivElement;

const root = createRoot(app);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
