import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import HospitalsPage from "./pages/admin/Hospitals";
import DoctorsPage from "./pages/admin/Doctors";
import PatientsPage from "./pages/admin/Patients";
import AppointmentsPage from "./pages/admin/Appointments";
import DepartmentsPage from "./pages/admin/Departments";
import BillingPage from "./pages/admin/Billing";
import PaymentsPage from "./pages/admin/Payments";
import PlansPage from "./pages/admin/Plans";
import ReportsPage from "./pages/admin/Reports";
import StatisticsPage from "./pages/admin/Statistics";
import IntegrationsPage from "./pages/admin/Integrations";
import ApiKeysPage from "./pages/admin/ApiKeys";
import WebhooksPage from "./pages/admin/Webhooks";
import LogsPage from "./pages/admin/Logs";
import ServicesPage from "./pages/admin/Services";
import SupportPage from "./pages/admin/Support";
import NotificationsPage from "./pages/admin/Notifications";
import SettingsPage from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin/master" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="hospitals" element={<HospitalsPage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="patients" element={<PatientsPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="plans" element={<PlansPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="api-keys" element={<ApiKeysPage />} />
              <Route path="webhooks" element={<WebhooksPage />} />
              <Route path="logs" element={<LogsPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
