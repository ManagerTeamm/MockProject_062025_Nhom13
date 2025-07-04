import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import ProtectedRoute from "./protectedroute";
import LoginComponent from "../pages/login";
import Main from "../samples/pages/admin/main";
import AdminPage from "../samples/pages/admin/admin";
import InmateAdmissions from "../samples/pages/inmateadmission";
import CaseFile from "../samples/pages/casefile";
import Home from "../pages/home";
import UserList from "../pages/admin/userList";
import ReportSuspect from "../pages/reportSuspect";

const AppRoutes = () => {
  const {loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([

    { path: "/", element: <Main /> },
    { path: "/login", element: <LoginComponent /> },
    { path: "/service", element: <div>Service Page</div> },
    { path: "/about-us", element: <div>About Us</div> },
    { path: "/home", element: <Home /> },
    { path: "/report-suspect", element: <ReportSuspect/>},
    {
      path: "/secure",
      element: <ProtectedRoute allowedRoles={["Admin", "Patrol Officer", "Investigator"]} />,
      children: [
        
        {
          path: "admin",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <AdminPage /> }],
          },
        {
          path: "admin/userList",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <UserList /> }],
        },
        {
          path: "inmateadmission",
          element: <ProtectedRoute allowedRoles={["Patrol Officer"]} />,
          children: [{ index: true, element: <InmateAdmissions /> }],
        },
        {
          path: "casefile",
          element: <ProtectedRoute allowedRoles={["Investigator"]} />,
          children: [{ index: true, element: <CaseFile /> }],
        },
        { path: "logout", element: <div>Logging out...</div> },
      ],
    },

    { path: "/unauthorized", element: <div>Unauthorized</div> },
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return <RouterProvider router={router} />;
};


export default AppRoutes;