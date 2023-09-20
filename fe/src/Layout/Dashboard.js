import React, { useEffect } from "react";

import "./Dashboard.css";
// import { checkLogin } from "../Service/SecurityService";

import { CheckLoginComponent } from "../Service/SecurityService";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  return (
    <div className="sidebar-content-separation">
      <div className="content">
        <CheckLoginComponent />
        <p>I am user</p>
    
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
