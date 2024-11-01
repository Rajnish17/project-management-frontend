import React from "react";
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Login from "../Components/LoginPage/Login";
import Signup from "../Components/SignupPage/Signup";
import Dashboardpage from "../pages/DashboardPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";
import ShareTodo from "../Components/Share/ShareTodo";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/share/:id" element={<ShareTodo />} />
      <Route element={<PrivateRoute />} >
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default Index