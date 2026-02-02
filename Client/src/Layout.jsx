import React from "react";
import { Nav } from "./Components/Nav";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div >
      <Nav />
      <Outlet/>
    </div>
  );
};
