import React from "react";
import "../../styles/dashboard.css";
import { User, Users, FileText, Shield, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <div className="nav-section">
      <div className="profile-section">
        <div className="avatar">
          <User size={32} color="#fff" />
        </div>
        <div className="profile-info">
          <div className="profile-name">Admin</div>
          <div className="profile-role">Administrator</div>
        </div>
      </div>

      <div className="nav-item">
        <div className="icon-box">
          <Users size={24} color="#fff" />
        </div>
        <div className="nav-link-text">User Manager</div>
      </div>

      <div className="nav-item">
        <div className="icon-box">
          <FileText size={24} color="#fff" />
        </div>
        <div className="nav-link-text">Crime Report</div>
      </div>

      <div className="nav-item">
        <div className="icon-box">
          <Shield size={24} color="#fff" />
        </div>
        <div className="nav-link-text">Crime Management</div>
      </div>
    </div>
  );
};

export default Navbar;