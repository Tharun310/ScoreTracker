import React from "react";

import { ToastContainer } from "react-toastify";
import { CheckAdminComponent } from "../../Service/AdminSecurity";
import { getTeams } from "../../Service/adminapi";


const loadData = async () => {
  let getTeamDetails = await getTeams();
  console.log(getTeamDetails);
  try {
    if (getTeamDetails.status === 200) {
      setOriginalEventsData(
        getEventDetails.data.upcomingEvent.filter((e) => e.isDelete === "0")
      );
      setEvents(
        getEventDetails.data.upcomingEvent.filter((e) => e.isDelete === "0")
      );
    } else {
      setOriginalEventsData("");
      setEvents("");
    }
  } catch (error) {
    console.log(error);
  }
};


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
