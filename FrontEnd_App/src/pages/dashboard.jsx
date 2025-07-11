import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import WelcomeBanner from "../components/dashboard/banner";
import ChartOne from "../components/dashboard/chartOne";
import ChartTwo from "../components/dashboard/chartTwo";
import UserTable from "../components/dashboard/userTable";
import sampleCases from "../samples/case";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [cases] = useState(sampleCases);

  return (
    <div className="investigation-container">
          <div className="bg-light border-end min-vh-100" style={{ width: "250px" }}>
              <Sidebar />
          </div>
      <div className="investigation-main">
        <div className="dashboard-grid">
            <WelcomeBanner/>
          <div className="section-box">
            <ChartOne cases={cases} />
          </div>
          <div className="section-box">
            <ChartTwo cases={cases} />
          </div>
          <div className="section-box" style={{ width: "100%" }}>
            <UserTable cases={cases} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;