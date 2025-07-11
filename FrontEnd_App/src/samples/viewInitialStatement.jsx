import React from "react";
import Sidebar from "../components/sidebar";
import StatementForm from "../components/panel/initialstatement";
import "../styles/initialstatement.css";

const ViewStatement = () => (
  <div className="statement-container">
    <Sidebar />
    <div className="statement-main">
    <StatementForm />
    </div>
  </div>
);

export default ViewStatement;
