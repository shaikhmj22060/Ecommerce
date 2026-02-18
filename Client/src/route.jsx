import { createBrowserRouter } from "react-router";
import { ProductForm } from "./Pages/ProductForm";
import { Layout } from "./Layout";
import { Products } from "./Pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductForm />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
      {
        path: "/updateProduct/",
        element: <Products />,
      },
    ],
  },
]);
