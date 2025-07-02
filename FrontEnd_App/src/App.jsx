import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import UserList from "./pages/admin/userList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/userlist" element={<UserList /> } />
      </Routes>
    </Router>
  );
}

export default App;
