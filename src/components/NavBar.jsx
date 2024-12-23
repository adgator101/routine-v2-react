import { Bell, House, ListCheck, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const NavItem = ({ activeItem, setActiveItem }) => {
  const navItem = ["Routine", "Todo", "About Us"];
  return (
    <ul className="flex gap-6">
      {navItem.map((item, index) => (
        <li
          className={`select-none rounded-2xl px-6 py-3 ${activeItem === item ? "border border-gray-600 bg-[#F84178] text-white" : ""} cursor-pointer transition duration-300`}
          key={index}
          onClick={() => setActiveItem(item)}
        >
          <a className="px-4 py-2">{item}</a>
        </li>
      ))}
    </ul>
  );
};
const NavItemMobile = ({ activeItem, setActiveItem }) => {
  const navItem = [
    { icon: <House />, label: "Routine" },
    { icon: <ListCheck />, label: "Todo" },
    { icon: <User />, label: "About Us" },
  ];
  return (
    <>
      <div className="shadow-xs mx-auto w-2/3 rounded-md bg-gray-100">
        <ul className="flex h-full w-full items-center justify-around p-4">
          {navItem.map((item, index) => (
            <li
              className={`rounded-xs cursor-pointer px-4 py-2 transition duration-300 ${activeItem === item.label ? "border-b border-[#F84178]" : ""}`}
              key={index}
              onClick={() => setActiveItem(item.label)}
            >
              <a>
                {React.cloneElement(item.icon, {
                  color: activeItem === item.label ? "#F84178" : "currentColor",
                })}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeItem, setActiveItem] = useState("Routine");
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <nav className="flex flex-col-reverse p-4 px-6 font-poppins md:flex-row md:items-center md:justify-between md:px-4">
        <div className="nav-profile mt-4 flex items-center justify-between gap-4 p-2">
          <div className="nav-profile-left">
            {/* <img src="" alt="" /> */}
            <div className="h-16 w-16 rounded-full bg-gray-400"></div>
          </div>
          <div className="nav-profile-right">
            <div className="nav-profile-user font-bold">Hi, Ganesh</div>
            <div className="nav-profile-faculty">Computer Science, L4CG3</div>
          </div>
        </div>
        {!isMobile && (
          <div className="nav-options">
            <NavItem activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        )}
        <div className="nav-right self-end md:self-center">
          <button className="rounded-full bg-pink-100 p-3">
            <Bell color="#fe5c73" />
          </button>
        </div>
      </nav>
      {isMobile && (
        <div className="nav-item-floating fixed bottom-6 w-full">
          <NavItemMobile
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
