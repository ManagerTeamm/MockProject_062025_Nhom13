import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./route/routes";
import { AuthProvider } from "./provider/authenprovider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;