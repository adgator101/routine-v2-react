import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Onboarding from "@/components/Onboarding.jsx";
import { useUserGroup } from "@/context/UserGroupContext.jsx";

const MainLayout = () => {
  const { userGroup, setUserGroup } = useUserGroup();

  const handleUserGroup = (group) => {
    localStorage.setItem("user", group);
    setUserGroup(group);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserGroup("");
  };
  return (
    <>
      {/*Forces user to set their group if it's not available in localStorage*/}
      {!userGroup ? (
        <Onboarding setUserGroup={handleUserGroup} />
      ) : (
        <>
          <header className="border-b-2 dark:border-dark-border dark:bg-dark-card">
            <NavBar handleLogout={handleLogout} />
          </header>
          <div className="mt-10 lg:mx-auto lg:max-w-8xl">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default MainLayout;
