import React, { createContext, useContext, useState } from "react";

const UserGroupContext = createContext();

export const useUserGroup = () => useContext(UserGroupContext);

export const UserGroupProvider = ({ children }) => {
  const [userGroup, setUserGroup] = useState(
    JSON.parse(localStorage.getItem("user")) || "",
  );
  const handleUserGroup = (group) => {
    localStorage.setItem("user", JSON.stringify(group));
    setUserGroup(group);
  };
  return (
    <UserGroupContext.Provider
      value={{ userGroup, setUserGroup: handleUserGroup }}
    >
      {children}
    </UserGroupContext.Provider>
  );
};
