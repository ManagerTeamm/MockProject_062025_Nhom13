import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../provider/authenprovider";
import ProtectedRoute from "./protectedroute";
import LoginComponent from "../pages/login";
import Main from "../pages/samples/main";
import AdminPage from "../pages/samples/admin/admin";
import InmateAdmissions from "../pages/samples/inmateadmission";
import CaseFile from "../pages/samples/casefile";
import Home from "../pages/samples/home";

const AppRoutes = () => {
  const {loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([

    { path: "/", element: <Main /> },
    { path: "/login", element: <LoginComponent /> },

    { path: "/service", element: <div>Service Page</div> },
    { path: "/about-us", element: <div>About Us</div> },

    {
      path: "/secure",
      element: <ProtectedRoute allowedRoles={["Admin", "Patrol Officer", "Investigator"]} />,
      children: [
        { path: "home", element: <Home /> },

        {
          path: "admin",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <AdminPage /> }],
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