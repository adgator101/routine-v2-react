import React, { useState } from "react";
import { LayoutDashboard, User, Calendar, BookCopy } from "lucide-react";
import { Link } from "react-router-dom";

function SideBar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const sideBarItems = [
    { label: "DashBoard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
    { label: "Users", icon: <User />, path: "/admin/users" },
    { label: "Events", icon: <Calendar />, path: "/admin/events" },
    { label: "Assignment", icon: <BookCopy />, path: "/admin/assignment" },
  ];
  return (
    <>
      <div className="admin-heading text-center">Admin Panel</div>
      <div className="admin-body">
        <nav>
          <ul className="flex w-full flex-col gap-10 p-2">
            {sideBarItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`text-md rounded-lg px-4 py-3 ${item.label === activeItem ? "bg-pink-50 text-pink-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveItem(item.label)}
              >
                <li className={"flex items-center gap-2"}>
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
