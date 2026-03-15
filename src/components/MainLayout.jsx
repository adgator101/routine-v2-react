import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useUserGroup } from "@/context/UserGroupContext.jsx";
import { signOut } from "@/lib/auth";

const MainLayout = () => {
  const { setUserGroup } = useUserGroup();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (_error) {
      // ignore signOut errors — clear local state regardless
    } finally {
      localStorage.removeItem("user");
      setUserGroup(null);
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <>
      <header className="border-b-2 dark:border-dark-border dark:bg-dark-card">
        <NavBar handleLogout={handleLogout} />
      </header>
      <div className="mt-10 lg:mx-auto lg:max-w-8xl">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
