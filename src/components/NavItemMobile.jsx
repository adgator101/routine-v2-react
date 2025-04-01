import React from "react";
import { Link } from "react-router-dom";

// NavItemMobile.jsx Component for Mobile Navigation
const NavItemMobile = ({ activeItem, setActiveItem, navItems }) => {
  return (
    <div className="fixed bottom-6 z-10 w-full px-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-lg dark:bg-dark">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <Link to={item.path} key={item.label}>
                <li
                  onClick={() => setActiveItem(item.label)}
                  className={`group relative cursor-pointer rounded-xl p-3 transition-all duration-300 ${isActive && "bg-accent/10"}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {React.cloneElement(item.icon, {
                      size: 20,
                      // color: isActive ? "#F84178" : "#252539",
                      className:
                        "transition-transform duration-300 group-hover:scale-110 text-[#252539] dark:text-white",
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

export default NavItemMobile;
