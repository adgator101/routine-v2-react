import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <div className="lg:px-48 mx-auto">
      <NavBar />
      <div className="mt-6 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
