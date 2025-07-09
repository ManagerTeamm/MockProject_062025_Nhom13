import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import ProtectedRoute from "./protectedRoute";
import LoginComponent from "../pages/login";
import Main from "../samples/pages/admin/main";
import InmateAdmissions from "../samples/pages/inmateadmission";
import CaseFile from "../samples/pages/casefile";
import Home from "../pages/home";
import Investigation from "../pages/investigation";
import Suspect from "../pages/suspect";
import Evidence from "../pages/evidence";
import CaseList from "../pages/caseList";
import InterviewsList from "../pages/interviewsList";
import UserList from "../pages/admin/userList";
import ReportSuspect from "../pages/reportSuspect";
import ReportDetail from "../pages/reportDetail";
import ReportPage from "../pages/report";
import PatrolOfficerManagement from '../components/PatrolOfficerManagement'; 
import SceneProtectionForm from "../components/sceneProtectionForm";

//sample dashboard
import Dashboard from "../samples/dashboard";


const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter([

    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginComponent /> },
    { path: "/service", element: <div>Service Page</div> },
    { path: "/about-us", element: <div>About Us</div> },
    { path: "/suspect", element: <Suspect /> },
    { path: "/investigation", element: <Investigation /> },
    { path: "/evidence", element: <Evidence /> },
    { path: "/caselist", element: <CaseList /> },
    { path: "/interviewslist", element: <InterviewsList /> },
    { path: "/report-suspect", element: <ReportSuspect/>},
      { path: "/PatrolOfficerManagement", element: <PatrolOfficerManagement /> },
      { path: "/sceneProtectionForm", element: <SceneProtectionForm /> },
    {
      path: "/secure",
      element: <ProtectedRoute allowedRoles={["Admin", "Patrol Officer", "Investigator"]} />,
      children: [

        {
          path: "admin/dashboard",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <Dashboard /> }],
        },
        {
          path: "admin/userList",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <UserList /> }],
        },
        {
          path: "admin/reports",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <ReportPage /> }],
        },
        {
          path: "admin/report-detail/:reportId",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <ReportDetail /> }],
          },
          {
              path: "admin/investigation",
              element: <ProtectedRoute allowedRoles={["Admin"]} />,
              children: [{ index: true, element: <Investigation /> }],
          },
          {
              path: "admin/evidence",
              element: <ProtectedRoute allowedRoles={["Admin"]} />,
              children: [{ index: true, element: <Evidence /> }],
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
    { path: "/CaseList", element: <CaseList /> },
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return <RouterProvider router={router} />;
};


export default AppRoutes;