import React from "react";

const LogOutButton = ({ handleLogout }) => {
  return (
    <button
      className={
        "rounded-lg border bg-gray-200 px-4 py-1 font-medium transition duration-300 hover:bg-gray-300"
      }
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};
export default LogOutButton