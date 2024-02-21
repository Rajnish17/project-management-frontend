import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/SignupPage/Signup";
import Dashboardpage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboardpage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />


    </Routes>
  );
}

export default App;
