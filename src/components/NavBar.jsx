import { Bell, House, ListCheck, Moon, Sun, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import { Link } from "react-router-dom";

const navItems = [
  { icon: <House />, path: "/", label: "routine" },
  { icon: <ListCheck />, path: "/todo", label: "todo" },
  { icon: <User />, path: "/about", label: "about us" },
];
const NavItem = () => {
  const [activeItem, setActiveItem] = useState("routine");

  return (
    <ul className="flex gap-6">
      {navItems.map((item) => (
        <Link to={item.path} key={item.label}>
          <li
            className={`group relative cursor-pointer select-none overflow-hidden rounded-full px-4 py-2 font-medium transition-all duration-300 hover:bg-[#fdf2f8] hover:shadow-sm ${
              activeItem === item.label
                ? "bg-[#fdf2f8] text-[#ec4899] shadow-sm"
                : "hover:text-[#ec4899]"
            }`}
            key={item.label}
            onClick={() => setActiveItem(item.label)}
          >
            <span className="relative z-10 capitalize">{item.label}</span>
            {/* <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent to-blue opacity-0 transition-opacity duration-300 group-hover:opacity-10" /> */}
          </li>
        </Link>
      ))}
    </ul>
  );
};

// NavItemMobile Component for Mobile Navigation
const NavItemMobile = ({ activeItem, setActiveItem }) => {
  return (
    <div className="fixed bottom-6 z-10 w-full px-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-lg">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <Link to={item.path} key={item.label}>
                <li
                  onClick={() => setActiveItem(item.label)}
                  className={`group relative cursor-pointer rounded-xl p-3 transition-all duration-300 ${isActive ? "bg-accent/10" : "hover:bg-gray-50"}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {React.cloneElement(item.icon, {
                      size: 20,
                      color: isActive ? "#F84178" : "#252539",
                      className:
                        "transition-transform duration-300 group-hover:scale-110",
                    })}
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const NavBar = ({ activeItem, setActiveItem }) => {
  const [isLight, setisLight] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    setUser(userFromStorage);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };
  const handleDarkMode = () => {
    setisLight(!isLight);
    document.body.classList.toggle("dark");
  };
  return (
    <nav className="relative font-poppins lg:mx-auto lg:max-w-8xl">
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Left - User Details */}
        <div className="flex items-center gap-4">
          <div className="group relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 hover:scale-105">
            <div className="h-full w-full bg-card-2" />
            <div className="absolute inset-0 rounded-full shadow-sm transition-shadow duration-300 group-hover:shadow-md" />
          </div>
          <div className="space-y-0.5">
            <div className="font-semibold">Hi, {user?.name || "Student"}</div>
            <div className="text-sm">
              {user?.program || "Computer Science"}, {user || "L4CG3"}
            </div>
          </div>
        </div>

        {/* NavItems for Desktop */}
        <div className="flex-center gap-3 md:gap-7">
          {/* Light/Dark Mode */}
          <button
            onClick={handleDarkMode}
            className="rounded-full p-1.5 transition-all duration-300 active:bg-gray-200"
          >
            <div
              className={`transition-transform duration-500 ${isLight ? "rotate-180" : "rotate-0"}`}
            >
              {isLight ? <Sun size={28} /> : <Moon size={28} />}
            </div>
          </button>
          <div>
            {!isMobile && (
              <div className="flex-1 text-center">
                <NavItem
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
              </div>
            )}
          </div>
          {/* Right - Notifications */}
          <button
            className="group relative rounded-full bg-card-1/50 p-3 transition-all duration-300 hover:scale-105 hover:bg-card-1 hover:shadow-md active:scale-95"
            aria-label="Notifications"
            onClick={toggleNotifications}
          >
            <Bell className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Notification Component */}
      <Notification
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="flex-1 text-center">
          <NavItemMobile
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
