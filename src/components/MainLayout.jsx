import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-6 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
