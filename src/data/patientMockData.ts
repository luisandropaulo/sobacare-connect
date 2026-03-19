export interface PatientAppointment {
  id: string;
  doctor: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
}

export const patientAppointments: PatientAppointment[] = [
  { id: "pa1", doctor: "Dr. João Pedro", specialty: "Cardiologia", hospital: "Hospital Américo Boavida", date: "2026-03-20", time: "09:00", status: "confirmed" },
  { id: "pa2", doctor: "Dra. Luísa Costa", specialty: "Pediatria", hospital: "Clínica Sagrada Esperança", date: "2026-03-22", time: "10:30", status: "pending" },
  { id: "pa3", doctor: "Dr. Manuel Sousa", specialty: "Ortopedia", hospital: "Hospital Josina Machel", date: "2026-03-15", time: "14:00", status: "completed", notes: "Controlo de rotina" },
  { id: "pa4", doctor: "Dra. Teresa Lima", specialty: "Dermatologia", hospital: "Clínica Multiperfil", date: "2026-03-10", time: "11:00", status: "cancelled" },
  { id: "pa5", doctor: "Dra. Isabel Martins", specialty: "Ginecologia", hospital: "Clínica Girassol", date: "2026-03-25", time: "15:30", status: "pending" },
  { id: "pa6", doctor: "Dr. João Pedro", specialty: "Cardiologia", hospital: "Hospital Américo Boavida", date: "2026-02-18", time: "09:00", status: "completed" },
];

export interface Prescription {
  id: string;
  doctor: string;
  date: string;
  medications: { name: string; dosage: string; frequency: string }[];
  diagnosis: string;
  status: "active" | "expired";
}

export const prescriptions: Prescription[] = [
  { id: "rx1", doctor: "Dr. João Pedro", date: "2026-03-15", diagnosis: "Hipertensão arterial", status: "active", medications: [{ name: "Losartan 50mg", dosage: "1 comprimido", frequency: "1x ao dia" }, { name: "Aspirina 100mg", dosage: "1 comprimido", frequency: "1x ao dia" }] },
  { id: "rx2", doctor: "Dra. Teresa Lima", date: "2026-02-20", diagnosis: "Dermatite alérgica", status: "expired", medications: [{ name: "Cetirizina 10mg", dosage: "1 comprimido", frequency: "1x ao dia" }, { name: "Hidrocortisona creme 1%", dosage: "Aplicar na área", frequency: "2x ao dia" }] },
  { id: "rx3", doctor: "Dr. Manuel Sousa", date: "2026-03-10", diagnosis: "Lombalgia", status: "active", medications: [{ name: "Ibuprofeno 400mg", dosage: "1 comprimido", frequency: "3x ao dia" }] },
];

export interface PatientDocument {
  id: string;
  name: string;
  type: "exam" | "report" | "image" | "other";
  date: string;
  size: string;
}

export const patientDocuments: PatientDocument[] = [
  { id: "doc1", name: "Análises de sangue - Março 2026", type: "exam", date: "2026-03-12", size: "1.2 MB" },
  { id: "doc2", name: "Raio-X Coluna Lombar", type: "image", date: "2026-03-10", size: "3.5 MB" },
  { id: "doc3", name: "Relatório Cardiológico", type: "report", date: "2026-02-18", size: "450 KB" },
  { id: "doc4", name: "ECG - Electrocardiograma", type: "exam", date: "2026-02-18", size: "800 KB" },
];

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
}

export const familyMembers: FamilyMember[] = [
  { id: "fm1", name: "Maria Silva", relationship: "Mãe", email: "maria.silva@email.com", phone: "+244 912 111 222" },
  { id: "fm2", name: "Carlos Silva", relationship: "Pai", email: "carlos.silva@email.com", phone: "+244 923 333 444" },
];

export const patientConsultations = [
  { id: "c1", doctor: "Dr. João Pedro", specialty: "Cardiologia", date: "2026-03-15", hospital: "Hospital Américo Boavida", summary: "Pressão arterial controlada. Manter medicação.", status: "completed" as const },
  { id: "c2", doctor: "Dr. Manuel Sousa", specialty: "Ortopedia", date: "2026-03-10", hospital: "Hospital Josina Machel", summary: "Dor lombar em melhoria. Fisioterapia recomendada.", status: "completed" as const },
  { id: "c3", doctor: "Dr. João Pedro", specialty: "Cardiologia", date: "2026-02-18", hospital: "Hospital Américo Boavida", summary: "Exames de rotina. Tudo normal.", status: "completed" as const },
];
