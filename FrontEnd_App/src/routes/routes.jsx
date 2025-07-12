import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import ProtectedRoute from "./protectedRoute";
import LoginComponent from "../pages/login";
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
import EvidenceDetail from "../pages/evidenceDetail";
import InitialResponse from "../components/initialResponse";

import ImageAndVideo from "../components/imageAndVideo";
import Dashboard from "../pages/dashboard";
import QAList from '../pages/qaList';
import NavbarPhase2 from '../components/navbarphase2.jsx';
//sample medical support
import Medical from "../samples/medical";
import CaseDetailStep2 from "../pages/caseDetailStep2";

//sample nitial statement
import ViewStatement from "../samples/viewInitialStatement";



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
    { path: "/interviewslist", element: <InterviewsList /> },
    { path: "/image-and-video", element: <ImageAndVideo /> },
    { path: "/qa-list", element: <QAList /> },
    { path: "/report-suspect", element: <ReportSuspect/>},
    { path: "/navbarphase2", element: <NavbarPhase2/>},
      { path: "/PatrolOfficerManagement", element: <PatrolOfficerManagement /> },
      { path: "/sceneProtectionForm", element: <SceneProtectionForm /> },
      { path: "/caseDetailStep2", element: <CaseDetailStep2 /> },
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
          path: "admin/cases",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <CaseList /> }],
        },
        {
          path: "admin/initial-response/:caseId",
          element: <ProtectedRoute allowedRoles={["Admin"]} />,
          children: [{ index: true, element: <InitialResponse /> }],
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
        {
          path: "medical",
          element: <ProtectedRoute allowedRoles={["Admin", "Patrol Officer", "Investigator"]} />,
          children: [{ index: true, element: <Medical /> }],
        },
        {
          path: "initialstatement",
          element: <ProtectedRoute allowedRoles={["Admin", "Patrol Officer", "Investigator"]} />,
          children: [{ index: true, element: <ViewStatement /> }],
        },
        { path: "logout", element: <div>Logging out...</div> },
        
      ],
    },

    { path: "/unauthorized", element: <div>Unauthorized</div> },
    { path: "/CaseList", element: <CaseList /> },
    { path: "/evidence/:id", element: <EvidenceDetail /> },
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return <RouterProvider router={router} />;
};


export default AppRoutes;