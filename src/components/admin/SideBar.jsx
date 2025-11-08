import React, { useState } from "react";
import { LayoutDashboard, User, Group, ChevronDown } from "lucide-react";
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
  const [openSections, setOpenSections] = useState({
    Overview: true,
    Management: true,
  });

  const sideBarSections = [
    {
      label: "Overview",
      icon: <LayoutDashboard />,
      items: [{ label: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" }],
    },
    {
      label: "Management",
      icon: <Group />,
      items: [
        { label: "Users", icon: <User />, path: "/admin/users" },
        { label: "Groups", icon: <Group />, path: "/admin/groups" },
      ],
    },
  ];

  const toggleSection = (label) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="py-2 text-center text-lg font-semibold text-sidebar-foreground">
          Admin Panel
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-2 p-2">
          {sideBarSections.map((section) => {
            const anyChildActive = section.items.some(
              (it) => location.pathname === it.path
            );
            const isOpen = !!openSections[section.label];

            return (
              <div key={section.label}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={`h-14 text-lg flex items-center justify-between px-3 ${
                      anyChildActive
                        ? "bg-pink-50 text-pink-600 hover:bg-pink-50 hover:text-pink-600"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(section.label)}
                      className="w-full flex items-center gap-3"
                    >
                      <span className="flex items-center gap-3">
                        {section.icon}
                        <span>{section.label}</span>
                      </span>
                      <ChevronDown
                        className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        size={16}
                      />
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isOpen &&
                  section.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          className={`h-12 text-base pl-8 ${
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
              </div>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}

export default SideBar;