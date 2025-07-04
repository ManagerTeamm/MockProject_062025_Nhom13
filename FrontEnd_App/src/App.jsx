import React from "react";
import AppRoutes from "./routes/routes";
import { AuthProvider } from "./providers/authProvider";


function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;