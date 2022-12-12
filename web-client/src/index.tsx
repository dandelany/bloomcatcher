import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

setTimeout(() => {
  const title = document.title;
  const hostname = document.location.hostname.toLowerCase();
  if (hostname.endsWith(`homelab.local`)) {
    document.title = `🏠 ${title}`;
  } else if (hostname.startsWith(`localhost`)) {
    document.title = `💻 ${title}`;
  }
}, 0);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
