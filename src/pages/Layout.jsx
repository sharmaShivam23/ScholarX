import React from "react";
import Sidebar from "../components/ProfileCore/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
