import { useState } from "react";
import {
  LayoutDashboard,
  CalendarClock,
  AlertTriangle,
  GraduationCap,
  Users,
  ChevronDown,
  Users2,
  BookOpen,
  DoorOpen,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const NAV_SECTIONS = [
  {
    groupLabel: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { label: "Routines", icon: CalendarClock, path: "/admin/routines" },
      { label: "Issues", icon: AlertTriangle, path: "/admin/issues" },
    ],
  },
  {
    groupLabel: "People",
    items: [
      { label: "Teachers", icon: GraduationCap, path: "/admin/teachers" },
      { label: "Users", icon: Users, path: "/admin/users" },
    ],
  },
  {
    groupLabel: "Resources",
    collapsible: true,
    icon: Layers,
    items: [
      { label: "Groups", icon: Users2, path: "/admin/groups" },
      { label: "Modules", icon: BookOpen, path: "/admin/modules" },
      { label: "Rooms", icon: DoorOpen, path: "/admin/rooms" },
    ],
  },
];

function SideBar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({ Resources: true });

  const toggleSection = (label) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600 shadow-sm">
            <ShieldCheck size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-sidebar-foreground">
              Admin Panel
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-pink-500">
              DevSphere
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.groupLabel} className="mb-1">
            {/* Group label */}
            {section.collapsible ? (
              <button
                type="button"
                onClick={() => toggleSection(section.groupLabel)}
                className="flex w-full items-center justify-between px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                <span>{section.groupLabel}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${openSections[section.groupLabel] ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            ) : (
              <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {section.groupLabel}
              </p>
            )}

            {/* Nav items */}
            {(!section.collapsible || openSections[section.groupLabel]) && (
              <SidebarMenu className="gap-0.5 px-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        className={`group h-9 rounded-md px-3 text-sm font-medium transition-all duration-150 ${
                          active
                            ? "bg-pink-50 text-pink-600 shadow-sm"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }`}
                      >
                        <Link to={item.path} className="flex items-center gap-3">
                          <Icon
                            size={16}
                            className={active ? "text-pink-600" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"}
                          />
                          <span>{item.label}</span>
                          {active && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-pink-500" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </div>
        ))}
      </SidebarContent>
    </>
  );
}

export default SideBar;
