import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { AuthPage } from "../pages/AuthPage";
import { Home } from "../pages/Home";
import { Tutorial } from "../pages/Turorial";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export function RouterApp() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/mis-tareas"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>}
          />
        </Routes>
      </Layout>
    </Router>
  );
}
