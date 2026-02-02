import { createBrowserRouter } from "react-router";
import { Index } from "./Pages";
import { Layout } from "./Layout";
import { Products } from "./Pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
    ],
  },
]);
