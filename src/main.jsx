import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./layouts/RootLayout";
import UseHook from "./components/react19/useHook/Starter";
import FormAction from "./components/formAction/FormAction";
import FormStatus from "./components/formStatus/FormStatus";
import FormState from "./components/formState/FormState";
import UseOptimisticBasic from "./components/useOptimistic/UseOptimisticAdvanced";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/react-19/use-hook",
        element: <UseHook />,
      },
      {
        path: "/react-19/form-action",
        element: <FormAction />,
      },
      {
        path: "/react-19/form-status",
        element: <FormStatus />,
      },
      {
        path: "/react-19/form-state",
        element: <FormState />,
      },
      {
        path: "/react-19/use-optimistic",
        element: <UseOptimisticBasic />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
