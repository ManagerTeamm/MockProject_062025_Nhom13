import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/investigation.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" />
      <nav className="sidebar-nav">
        <div className="sidebar-item">Overview</div>
        <Link to="/investigation" className={"sidebar-item" + (location.pathname === "/investigation" ? " active" : "")}>List of cases</Link>
        <Link to="/evidence" className={"sidebar-item" + (location.pathname === "/evidence" ? " active" : "")}>List of evidence</Link>
      </nav>
    </aside>
  );
};

export default Sidebar; 