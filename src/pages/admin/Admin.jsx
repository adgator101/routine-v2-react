import React from "react";
import SideBar from "@/components/admin/SideBar.jsx";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function Admin() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full font-poppins">
        <Sidebar className="border-r border-sidebar-border">
          <SideBar />
        </Sidebar>
        <SidebarInset className="flex-1">
          <header className="flex h-14 items-center gap-2 border-b border-sidebar-border px-6">
            <SidebarTrigger />
            <div className="flex-1" />
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default Admin;
