import SideBar from "@/components/admin/SideBar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const PAGE_TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/routines": "Routines",
  "/admin/issues": "Issue Management",
  "/admin/teachers": "Teachers",
  "/admin/users": "Users",
  "/admin/groups": "Groups",
  "/admin/modules": "Modules",
  "/admin/rooms": "Rooms",
};

function AdminHeader() {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "Admin";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-white/80 backdrop-blur-sm px-6">
      <SidebarTrigger className="shrink-0" />
      <div className="h-4 w-px bg-border" />
      <span className="text-sm font-semibold text-foreground">{title}</span>
    </header>
  );
}

function Admin() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full font-poppins">
        <Sidebar className="border-r border-sidebar-border">
          <SideBar />
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <div className="flex-1 overflow-y-auto bg-gray-50/60 p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default Admin;

