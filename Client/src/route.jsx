import { createBrowserRouter } from "react-router";
import { Index } from "./Pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

