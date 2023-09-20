import React from "react";

import { ToastContainer } from "react-toastify";
import { CheckAdminComponent } from "../../Service/AdminSecurity";
function AdminDashboard() {
  return (
    <div className="sidebar-content-separation">
      
      <div className="content">
        <CheckAdminComponent />
        <p>Admin</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminDashboard;
