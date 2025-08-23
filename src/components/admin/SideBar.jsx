import React, { useState } from "react";
import { LayoutDashboard, User, Calendar, BookCopy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function SideBar() {
  const location = useLocation();
  const sideBarItems = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
    { label: "Users", icon: <User />, path: "/admin/users" },
    { label: "Events", icon: <Calendar />, path: "/admin/events" },
    // { label: "Assignment", icon: <BookCopy />, path: "/admin/assignment" },
  ];

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="py-2 text-center text-lg font-semibold text-sidebar-foreground">
          Admin Panel
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-2 p-2">
          {sideBarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`h-16 text-lg ${
                    isActive
                      ? "bg-pink-50 text-pink-600 hover:bg-pink-50 hover:text-pink-600"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}

export default SideBar;
