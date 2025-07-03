import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./styles/global.css";
import { store } from "./app/store.js";
import App from "./app/App.jsx";
import { Analytics } from "@vercel/analytics/next";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Analytics />
    </Provider>
  </StrictMode>,
);
