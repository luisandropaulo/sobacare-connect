export interface HospitalDoctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  patients: number;
  consultations: number;
}

export const hospitalDoctors: HospitalDoctor[] = [
  { id: "hd1", name: "Dr. João Pedro", specialty: "Cardiologia", email: "joao@hospital.ao", phone: "+244 912 100 001", status: "active", patients: 120, consultations: 45 },
  { id: "hd2", name: "Dra. Luísa Costa", specialty: "Pediatria", email: "luisa@hospital.ao", phone: "+244 912 100 002", status: "active", patients: 95, consultations: 38 },
  { id: "hd3", name: "Dr. Manuel Sousa", specialty: "Ortopedia", email: "manuel@hospital.ao", phone: "+244 912 100 003", status: "active", patients: 80, consultations: 32 },
  { id: "hd4", name: "Dra. Teresa Lima", specialty: "Dermatologia", email: "teresa@hospital.ao", phone: "+244 912 100 004", status: "active", patients: 110, consultations: 41 },
  { id: "hd5", name: "Dr. Francisco Gomes", specialty: "Neurologia", email: "francisco@hospital.ao", phone: "+244 912 100 005", status: "inactive", patients: 45, consultations: 15 },
];

export interface HospitalPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  lastVisit: string;
  totalVisits: number;
}

export const hospitalPatients: HospitalPatient[] = [
  { id: "hp1", name: "Ana Silva", email: "ana@gmail.com", phone: "+244 912 345 678", birthDate: "1990-05-14", lastVisit: "2026-03-15", totalVisits: 8 },
  { id: "hp2", name: "Pedro Santos", email: "pedro@gmail.com", phone: "+244 923 456 789", birthDate: "1985-11-22", lastVisit: "2026-03-12", totalVisits: 5 },
  { id: "hp3", name: "Maria Fernanda", email: "maria@email.com", phone: "+244 934 567 890", birthDate: "1978-03-08", lastVisit: "2026-03-10", totalVisits: 12 },
  { id: "hp4", name: "Ricardo Alves", email: "ricardo@email.com", phone: "+244 945 678 901", birthDate: "1995-07-30", lastVisit: "2026-02-28", totalVisits: 3 },
];

export interface HospitalAppointment {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  specialty: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
}

export const hospitalAppointments: HospitalAppointment[] = [
  { id: "ha1", patient: "Ana Silva", doctor: "Dr. João Pedro", date: "2026-03-20", time: "09:00", specialty: "Cardiologia", status: "pending" },
  { id: "ha2", patient: "Pedro Santos", doctor: "Dra. Luísa Costa", date: "2026-03-20", time: "10:30", specialty: "Pediatria", status: "confirmed" },
  { id: "ha3", patient: "Maria Fernanda", doctor: "Dr. Manuel Sousa", date: "2026-03-21", time: "14:00", specialty: "Ortopedia", status: "pending" },
  { id: "ha4", patient: "Ricardo Alves", doctor: "Dra. Teresa Lima", date: "2026-03-22", time: "11:00", specialty: "Dermatologia", status: "confirmed" },
  { id: "ha5", patient: "Ana Silva", doctor: "Dr. João Pedro", date: "2026-03-15", time: "09:00", specialty: "Cardiologia", status: "completed", notes: "Pressão controlada" },
  { id: "ha6", patient: "Pedro Santos", doctor: "Dr. Manuel Sousa", date: "2026-03-10", time: "15:00", specialty: "Ortopedia", status: "cancelled" },
];

export interface HospitalPrescription {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  diagnosis: string;
  medications: string[];
  status: "active" | "expired";
}

export const hospitalPrescriptions: HospitalPrescription[] = [
  { id: "hrx1", patient: "Ana Silva", doctor: "Dr. João Pedro", date: "2026-03-15", diagnosis: "Hipertensão", medications: ["Losartan 50mg", "Aspirina 100mg"], status: "active" },
  { id: "hrx2", patient: "Maria Fernanda", doctor: "Dr. Manuel Sousa", date: "2026-03-10", diagnosis: "Lombalgia", medications: ["Ibuprofeno 400mg"], status: "active" },
  { id: "hrx3", patient: "Ricardo Alves", doctor: "Dra. Teresa Lima", date: "2026-02-20", diagnosis: "Dermatite", medications: ["Cetirizina 10mg", "Hidrocortisona 1%"], status: "expired" },
];

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "appointment" | "patient" | "doctor" | "system";
}

export const activityLogs: ActivityLog[] = [
  { id: "al1", action: "Consulta agendada para Ana Silva", user: "Dr. João Pedro", timestamp: "2026-03-19 08:30", type: "appointment" },
  { id: "al2", action: "Novo paciente registado: Ricardo Alves", user: "Recepção", timestamp: "2026-03-19 08:15", type: "patient" },
  { id: "al3", action: "Prescrição criada para Maria Fernanda", user: "Dr. Manuel Sousa", timestamp: "2026-03-19 07:45", type: "doctor" },
  { id: "al4", action: "Consulta cancelada por Pedro Santos", user: "Sistema", timestamp: "2026-03-18 16:30", type: "system" },
  { id: "al5", action: "Dr. Francisco Gomes marcado como inativo", user: "Admin", timestamp: "2026-03-18 14:00", type: "doctor" },
];

export interface HospitalUnit {
  id: string;
  name: string;
  address: string;
  phone: string;
  doctors: number;
  status: "active" | "inactive";
}

export const hospitalUnits: HospitalUnit[] = [
  { id: "hu1", name: "Unidade Central", address: "Rua Major Kanhangulo, 45, Luanda", phone: "+244 222 300 100", doctors: 25, status: "active" },
  { id: "hu2", name: "Unidade Talatona", address: "Via S8, Talatona, Luanda", phone: "+244 222 300 200", doctors: 15, status: "active" },
  { id: "hu3", name: "Unidade Viana", address: "Estrada de Viana, Km 12", phone: "+244 222 300 300", doctors: 8, status: "inactive" },
];

export const hospitalKpis = {
  totalDoctors: 28,
  totalPatients: 850,
  appointmentsToday: 24,
  appointmentsWeek: 142,
  pendingApprovals: 5,
  completedToday: 12,
  revenue: 8500000,
  satisfactionRate: 94.2,
};

export const hospitalAppointmentsByDay = [
  { day: "Seg", count: 28 },
  { day: "Ter", count: 32 },
  { day: "Qua", count: 35 },
  { day: "Qui", count: 30 },
  { day: "Sex", count: 25 },
  { day: "Sáb", count: 12 },
  { day: "Dom", count: 5 },
];
