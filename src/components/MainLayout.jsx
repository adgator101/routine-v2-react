import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <>
      <header className="dark:bg-dark-card dark:border-dark-border border-b-2">
        <NavBar />
      </header>
      <div className="lg:max-w-8xl mt-6 lg:mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
