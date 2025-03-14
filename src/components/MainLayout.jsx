import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <>
      <header className="border-b-2 dark:border-dark-border dark:bg-dark-card">
        <NavBar />
      </header>
      <div className="mt-10 lg:mx-auto lg:max-w-8xl">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
