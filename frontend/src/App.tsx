import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminEmployeesPage from "./pages/admin/Employees";
import AdminJobsPage from "./pages/admin/Jobs";
import AdminResumesPage from "./pages/admin/Resumes";
import AdminLeavePage from "./pages/admin/Leave";
import AdminAttendancePage from "./pages/admin/Attendance";
import AdminSettingsPage from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/hr-dashboard" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminDashboardPage />
            </DashboardLayout>
          } />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Admin routes with sidebar layout */}
          <Route path="/admin/dashboard" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminDashboardPage />
            </DashboardLayout>
          } />
          <Route path="/admin/employees" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminEmployeesPage />
            </DashboardLayout>
          } />
          <Route path="/admin/jobs" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminJobsPage />
            </DashboardLayout>
          } />
          <Route path="/admin/resumes" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminResumesPage />
            </DashboardLayout>
          } />
          <Route path="/admin/leave" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminLeavePage />
            </DashboardLayout>
          } />
          <Route path="/admin/attendance" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminAttendancePage />
            </DashboardLayout>
          } />
          <Route path="/admin/settings" element={
            <DashboardLayout role="admin" userEmail="admin@company.com">
              <AdminSettingsPage />
            </DashboardLayout>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
