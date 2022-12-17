import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { LatestPage } from "./components/pages/Latest";
import { ErrorPage } from "./components/pages/Error";
import { LibraryPage } from "./components/pages/Library";
import { CamerasPage } from "./components/pages/Cameras";
import { SessionPage } from "./components/pages/Session";

const container = document.getElementById("root")!;
const root = createRoot(container);

setTimeout(() => {
  // hack to show different icons in page title for localhost vs. homelab
  const title = document.title;
  const hostname = document.location.hostname.toLowerCase();
  if (hostname.endsWith(`homelab.local`)) {
    document.title = `🏠 ${title}`;
  } else if (hostname.startsWith(`localhost`)) {
    document.title = `💻 ${title}`;
  }
}, 0);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
      },
      {
        index: true,
        element: <LatestPage />
      },
      {
        path: "latest",
        element: <LatestPage />
      },
      {
        path: "cameras",
        element: <CamerasPage />
      },
      {
        path: "library",
        element: <LibraryPage />
      },
      {
        path: "library/:cameraName/:sessionId",
        element: <SessionPage />
      }
    ]
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
        {/* <App /> */}
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
