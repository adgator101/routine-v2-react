import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <>
      <header className="bg-white border-b-2 border-gray-100">
        <NavBar />
      </header>
      <div className="lg:max-w-8xl mt-6 lg:mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
