import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import HospitalsPage from "./pages/admin/Hospitals";
import AdminDoctorDetail from "./pages/admin/DoctorDetail";
import AdminPatientDetail from "./pages/admin/PatientDetail";
import AdminHospitalDetail from "./pages/admin/HospitalDetail";
import AdminDoctorsPage from "./pages/admin/Doctors";
import AdminPatientsPage from "./pages/admin/Patients";
import AdminAppointmentsPage from "./pages/admin/Appointments";
import DepartmentsPage from "./pages/admin/Departments";
import BillingPage from "./pages/admin/Billing";
import PaymentsPage from "./pages/admin/Payments";
import AdminPlansPage from "./pages/admin/Plans";
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

import PatientLayout from "./layouts/PatientLayout";
import PatientDashboard from "./pages/patient/Dashboard";
import PatientAppointments from "./pages/patient/Appointments";
import PatientConsultations from "./pages/patient/Consultations";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import PatientDocuments from "./pages/patient/Documents";
import PatientFamily from "./pages/patient/Family";
import PatientReports from "./pages/patient/Reports";
import PatientSettings from "./pages/patient/Settings";

import HospitalLayout from "./layouts/HospitalLayout";
import HospitalDashboard from "./pages/hospital/Dashboard";
import HospitalDoctors from "./pages/hospital/Doctors";
import HospitalDoctorDetail from "./pages/hospital/DoctorDetail";
import HospitalPatientDetail from "./pages/hospital/PatientDetail";
import HospitalPatients from "./pages/hospital/Patients";
import HospitalAppointments from "./pages/hospital/Appointments";
import HospitalCalendar from "./pages/hospital/Calendar";
import HospitalPrescriptions from "./pages/hospital/Prescriptions";
import HospitalActivity from "./pages/hospital/Activity";
import HospitalUnits from "./pages/hospital/Units";
import HospitalPlans from "./pages/hospital/Plans";

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
              <Route path="doctors" element={<AdminDoctorsPage />} />
              <Route path="patients" element={<AdminPatientsPage />} />
              <Route path="appointments" element={<AdminAppointmentsPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="billing" element={<BillingPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="plans" element={<AdminPlansPage />} />
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

            <Route path="/dashboard/patient" element={<PatientLayout />}>
              <Route index element={<PatientDashboard />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="consultations" element={<PatientConsultations />} />
              <Route path="prescriptions" element={<PatientPrescriptions />} />
              <Route path="documents" element={<PatientDocuments />} />
              <Route path="family" element={<PatientFamily />} />
              <Route path="reports" element={<PatientReports />} />
              <Route path="settings" element={<PatientSettings />} />
            </Route>

            <Route path="/dashboard/admin-hospital" element={<HospitalLayout />}>
              <Route index element={<HospitalDashboard />} />
              <Route path="doctors" element={<HospitalDoctors />} />
              <Route path="patients" element={<HospitalPatients />} />
              <Route path="appointments" element={<HospitalAppointments />} />
              <Route path="calendar" element={<HospitalCalendar />} />
              <Route path="prescriptions" element={<HospitalPrescriptions />} />
              <Route path="activity" element={<HospitalActivity />} />
              <Route path="units" element={<HospitalUnits />} />
              <Route path="plans" element={<HospitalPlans />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
