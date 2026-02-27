import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./components/auth/authContext.js";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/views/Home.jsx";
import Modules from "./components/views/Modules.jsx";
import Students from "./components/views/Students.jsx";
import PageNotFound from "./components/views/404.jsx";

function App() {
  // Initialisation
  const loggedInUser = {
    UserID: 369,
    UserFirstname: "Zoe",
    UserUsertypeID: 2,
  };
  // State
  // Handlers
  // View
  return (
    <AuthContext value={loggedInUser}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/students" element={<Students />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
