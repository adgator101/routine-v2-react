import React from "react";
import SideBar from "@/components/admin/SideBar.jsx";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="flex h-screen font-poppins">
      <aside className="flex w-64 flex-col gap-40 bg-white px-6 py-9">
        <SideBar />
      </aside>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
