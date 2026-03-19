// ---- KPIs ----
export const kpis = {
  totalHospitals: 47,
  totalDoctors: 312,
  totalPatients: 8_453,
  appointmentsThisMonth: 1_287,
  revenue: 2_450_000,
  activeUsers: 5_621,
  pendingApprovals: 14,
  systemUptime: 99.97,
};

// ---- Users ----
export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export const users: MockUser[] = [
  { id: "u1", name: "Carlos Mendes", email: "carlos@hospital.ao", role: "Hospital Admin", status: "active", createdAt: "2025-01-15" },
  { id: "u2", name: "Ana Silva", email: "ana@gmail.com", role: "Paciente", status: "active", createdAt: "2025-02-10" },
  { id: "u3", name: "Dr. João Pedro", email: "joao@clinica.ao", role: "Médico", status: "active", createdAt: "2025-03-01" },
  { id: "u4", name: "Maria Fernanda", email: "maria@hospital.ao", role: "Hospital Admin", status: "inactive", createdAt: "2024-11-20" },
  { id: "u5", name: "Pedro Santos", email: "pedro@gmail.com", role: "Paciente", status: "active", createdAt: "2025-04-05" },
  { id: "u6", name: "Dr. Luísa Costa", email: "luisa@clinica.ao", role: "Médico", status: "active", createdAt: "2025-01-22" },
  { id: "u7", name: "Ricardo Alves", email: "ricardo@email.com", role: "Paciente", status: "inactive", createdAt: "2024-09-14" },
  { id: "u8", name: "Beatriz Nunes", email: "beatriz@hospital.ao", role: "Hospital Admin", status: "active", createdAt: "2025-05-10" },
];

// ---- Hospitals ----
export interface MockHospital {
  id: string;
  name: string;
  location: string;
  plan: "Essential" | "Professional" | "Enterprise";
  status: "active" | "inactive";
  doctors: number;
  patients: number;
}

export const hospitals: MockHospital[] = [
  { id: "h1", name: "Hospital Américo Boavida", location: "Luanda", plan: "Enterprise", status: "active", doctors: 45, patients: 1200 },
  { id: "h2", name: "Clínica Sagrada Esperança", location: "Luanda", plan: "Professional", status: "active", doctors: 28, patients: 850 },
  { id: "h3", name: "Hospital Josina Machel", location: "Luanda", plan: "Enterprise", status: "active", doctors: 52, patients: 1500 },
  { id: "h4", name: "Clínica Multiperfil", location: "Luanda", plan: "Professional", status: "active", doctors: 35, patients: 920 },
  { id: "h5", name: "Hospital do Prenda", location: "Luanda", plan: "Essential", status: "inactive", doctors: 12, patients: 300 },
  { id: "h6", name: "Clínica Girassol", location: "Luanda", plan: "Enterprise", status: "active", doctors: 40, patients: 1100 },
];

// ---- Doctors ----
export interface MockDoctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  status: "active" | "inactive";
  patients: number;
}

export const doctors: MockDoctor[] = [
  { id: "d1", name: "Dr. João Pedro", specialty: "Cardiologia", hospital: "Hospital Américo Boavida", status: "active", patients: 120 },
  { id: "d2", name: "Dra. Luísa Costa", specialty: "Pediatria", hospital: "Clínica Sagrada Esperança", status: "active", patients: 95 },
  { id: "d3", name: "Dr. Manuel Sousa", specialty: "Ortopedia", hospital: "Hospital Josina Machel", status: "active", patients: 80 },
  { id: "d4", name: "Dra. Teresa Lima", specialty: "Dermatologia", hospital: "Clínica Multiperfil", status: "active", patients: 110 },
  { id: "d5", name: "Dr. Francisco Gomes", specialty: "Neurologia", hospital: "Hospital Américo Boavida", status: "inactive", patients: 45 },
  { id: "d6", name: "Dra. Isabel Martins", specialty: "Ginecologia", hospital: "Clínica Girassol", status: "active", patients: 130 },
];

// ---- Patients ----
export interface MockPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  lastVisit: string;
}

export const patients: MockPatient[] = [
  { id: "p1", name: "Ana Silva", email: "ana@gmail.com", phone: "+244 912 345 678", status: "active", lastVisit: "2025-03-12" },
  { id: "p2", name: "Pedro Santos", email: "pedro@gmail.com", phone: "+244 923 456 789", status: "active", lastVisit: "2025-03-10" },
  { id: "p3", name: "Maria Fernanda", email: "maria@email.com", phone: "+244 934 567 890", status: "active", lastVisit: "2025-02-28" },
  { id: "p4", name: "Ricardo Alves", email: "ricardo@email.com", phone: "+244 945 678 901", status: "inactive", lastVisit: "2024-12-15" },
  { id: "p5", name: "Beatriz Nunes", email: "beatriz@email.com", phone: "+244 956 789 012", status: "active", lastVisit: "2025-03-15" },
];

// ---- Appointments ----
export interface MockAppointment {
  id: string;
  patient: string;
  doctor: string;
  hospital: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  specialty: string;
}

export const appointments: MockAppointment[] = [
  { id: "a1", patient: "Ana Silva", doctor: "Dr. João Pedro", hospital: "Hospital Américo Boavida", date: "2025-03-20", time: "09:00", status: "confirmed", specialty: "Cardiologia" },
  { id: "a2", patient: "Pedro Santos", doctor: "Dra. Luísa Costa", hospital: "Clínica Sagrada Esperança", date: "2025-03-21", time: "10:30", status: "pending", specialty: "Pediatria" },
  { id: "a3", patient: "Maria Fernanda", doctor: "Dr. Manuel Sousa", hospital: "Hospital Josina Machel", date: "2025-03-22", time: "14:00", status: "confirmed", specialty: "Ortopedia" },
  { id: "a4", patient: "Ricardo Alves", doctor: "Dra. Teresa Lima", hospital: "Clínica Multiperfil", date: "2025-03-23", time: "11:00", status: "cancelled", specialty: "Dermatologia" },
  { id: "a5", patient: "Beatriz Nunes", doctor: "Dra. Isabel Martins", hospital: "Clínica Girassol", date: "2025-03-24", time: "15:30", status: "pending", specialty: "Ginecologia" },
];

// ---- Departments ----
export interface MockDepartment {
  id: string;
  name: string;
  doctorCount: number;
  patientCount: number;
  status: "active" | "inactive";
}

export const departments: MockDepartment[] = [
  { id: "dep1", name: "Cardiologia", doctorCount: 12, patientCount: 340, status: "active" },
  { id: "dep2", name: "Pediatria", doctorCount: 18, patientCount: 520, status: "active" },
  { id: "dep3", name: "Ortopedia", doctorCount: 8, patientCount: 210, status: "active" },
  { id: "dep4", name: "Dermatologia", doctorCount: 6, patientCount: 180, status: "active" },
  { id: "dep5", name: "Neurologia", doctorCount: 5, patientCount: 150, status: "active" },
  { id: "dep6", name: "Ginecologia", doctorCount: 10, patientCount: 380, status: "active" },
  { id: "dep7", name: "Oftalmologia", doctorCount: 4, patientCount: 120, status: "inactive" },
];

// ---- Billing/Invoices ----
export interface MockInvoice {
  id: string;
  hospital: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  plan: string;
}

export const invoices: MockInvoice[] = [
  { id: "inv1", hospital: "Hospital Américo Boavida", amount: 150000, status: "paid", date: "2025-03-01", plan: "Enterprise" },
  { id: "inv2", hospital: "Clínica Sagrada Esperança", amount: 85000, status: "paid", date: "2025-03-01", plan: "Professional" },
  { id: "inv3", hospital: "Hospital Josina Machel", amount: 150000, status: "pending", date: "2025-03-01", plan: "Enterprise" },
  { id: "inv4", hospital: "Clínica Multiperfil", amount: 85000, status: "overdue", date: "2025-02-01", plan: "Professional" },
  { id: "inv5", hospital: "Hospital do Prenda", amount: 35000, status: "paid", date: "2025-03-01", plan: "Essential" },
];

// ---- Notifications ----
export interface MockNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

export const notifications: MockNotification[] = [
  { id: "n1", title: "Novo hospital registado", message: "Clínica Girassol completou o registo na plataforma.", time: "Há 5 min", read: false, type: "info" },
  { id: "n2", title: "Pagamento pendente", message: "Hospital Josina Machel tem fatura pendente há 15 dias.", time: "Há 1 hora", read: false, type: "warning" },
  { id: "n3", title: "Sistema atualizado", message: "Versão 2.4.1 implantada com sucesso.", time: "Há 3 horas", read: true, type: "success" },
  { id: "n4", title: "Erro no webhook", message: "Falha na entrega do webhook para endpoint /api/notify.", time: "Há 6 horas", read: false, type: "error" },
];

// ---- Tickets ----
export interface MockTicket {
  id: string;
  subject: string;
  hospital: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "closed";
  createdAt: string;
}

export const tickets: MockTicket[] = [
  { id: "t1", subject: "Erro ao agendar consulta", hospital: "Hospital Américo Boavida", priority: "high", status: "open", createdAt: "2025-03-18" },
  { id: "t2", subject: "Dúvida sobre faturação", hospital: "Clínica Sagrada Esperança", priority: "medium", status: "in_progress", createdAt: "2025-03-17" },
  { id: "t3", subject: "Pedido de nova funcionalidade", hospital: "Clínica Multiperfil", priority: "low", status: "closed", createdAt: "2025-03-10" },
];

// ---- Logs ----
export interface MockLog {
  id: string;
  type: "error" | "access" | "api";
  message: string;
  timestamp: string;
  source: string;
}

export const logs: MockLog[] = [
  { id: "l1", type: "error", message: "Failed to connect to payment gateway", timestamp: "2025-03-19 08:15:22", source: "billing-service" },
  { id: "l2", type: "access", message: "Admin login from IP 192.168.1.45", timestamp: "2025-03-19 07:30:00", source: "auth-service" },
  { id: "l3", type: "api", message: "GET /api/hospitals - 200 OK (45ms)", timestamp: "2025-03-19 08:10:15", source: "api-gateway" },
  { id: "l4", type: "error", message: "Timeout on webhook delivery to endpoint /notify", timestamp: "2025-03-19 06:45:30", source: "webhook-service" },
  { id: "l5", type: "api", message: "POST /api/appointments - 201 Created (120ms)", timestamp: "2025-03-19 08:05:00", source: "api-gateway" },
  { id: "l6", type: "access", message: "Hospital admin login from Clínica Girassol", timestamp: "2025-03-19 07:00:00", source: "auth-service" },
];

// ---- Chart Data ----
export const appointmentsByMonth = [
  { month: "Jan", count: 820 },
  { month: "Fev", count: 950 },
  { month: "Mar", count: 1100 },
  { month: "Abr", count: 980 },
  { month: "Mai", count: 1200 },
  { month: "Jun", count: 1150 },
  { month: "Jul", count: 1050 },
  { month: "Ago", count: 900 },
  { month: "Set", count: 1300 },
  { month: "Out", count: 1250 },
  { month: "Nov", count: 1180 },
  { month: "Dez", count: 1287 },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 1800000 },
  { month: "Fev", revenue: 2100000 },
  { month: "Mar", revenue: 2300000 },
  { month: "Abr", revenue: 2000000 },
  { month: "Mai", revenue: 2500000 },
  { month: "Jun", revenue: 2400000 },
  { month: "Jul", revenue: 2200000 },
  { month: "Ago", revenue: 1900000 },
  { month: "Set", revenue: 2600000 },
  { month: "Out", revenue: 2550000 },
  { month: "Nov", revenue: 2450000 },
  { month: "Dez", revenue: 2450000 },
];

export const departmentDistribution = [
  { name: "Cardiologia", value: 340 },
  { name: "Pediatria", value: 520 },
  { name: "Ortopedia", value: 210 },
  { name: "Dermatologia", value: 180 },
  { name: "Neurologia", value: 150 },
  { name: "Ginecologia", value: 380 },
];

// ---- API Keys ----
export interface MockApiKey {
  id: string;
  name: string;
  key: string;
  status: "active" | "revoked";
  createdAt: string;
  lastUsed: string;
}

export const apiKeys: MockApiKey[] = [
  { id: "ak1", name: "Production API", key: "sk_live_abc123...xyz789", status: "active", createdAt: "2025-01-10", lastUsed: "2025-03-19" },
  { id: "ak2", name: "Staging API", key: "sk_test_def456...uvw012", status: "active", createdAt: "2025-02-15", lastUsed: "2025-03-18" },
  { id: "ak3", name: "Legacy Integration", key: "sk_live_ghi789...rst345", status: "revoked", createdAt: "2024-06-01", lastUsed: "2024-12-31" },
];

// ---- Webhooks ----
export interface MockWebhook {
  id: string;
  url: string;
  events: string[];
  status: "active" | "inactive";
  lastTriggered: string;
}

export const webhooks: MockWebhook[] = [
  { id: "wh1", url: "https://api.hospital.ao/webhooks/appointments", events: ["appointment.created", "appointment.updated"], status: "active", lastTriggered: "2025-03-19 08:00" },
  { id: "wh2", url: "https://api.hospital.ao/webhooks/payments", events: ["payment.completed", "payment.failed"], status: "active", lastTriggered: "2025-03-18 14:30" },
  { id: "wh3", url: "https://legacy.system.ao/notify", events: ["appointment.created"], status: "inactive", lastTriggered: "2025-01-15 10:00" },
];

// ---- Services Health ----
export interface MockService {
  id: string;
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: number;
  latency: number;
  lastCheck: string;
}

export const services: MockService[] = [
  { id: "s1", name: "API Gateway", status: "operational", uptime: 99.99, latency: 45, lastCheck: "2025-03-19 08:15" },
  { id: "s2", name: "Auth Service", status: "operational", uptime: 99.98, latency: 32, lastCheck: "2025-03-19 08:15" },
  { id: "s3", name: "Database", status: "operational", uptime: 99.97, latency: 12, lastCheck: "2025-03-19 08:15" },
  { id: "s4", name: "Payment Gateway", status: "degraded", uptime: 98.50, latency: 350, lastCheck: "2025-03-19 08:15" },
  { id: "s5", name: "Email Service", status: "operational", uptime: 99.95, latency: 120, lastCheck: "2025-03-19 08:15" },
  { id: "s6", name: "File Storage", status: "operational", uptime: 99.99, latency: 28, lastCheck: "2025-03-19 08:15" },
];
