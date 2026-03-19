import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { appointments, MockAppointment } from "@/data/mockData";

const columns: Column<MockAppointment>[] = [
  { key: "patient", header: "Paciente" },
  { key: "doctor", header: "Médico" },
  { key: "hospital", header: "Hospital" },
  { key: "specialty", header: "Especialidade" },
  { key: "date", header: "Data" },
  { key: "time", header: "Hora" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const AppointmentsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Consultas</h1>
      <p className="text-muted-foreground">Gestão de todas as consultas da plataforma</p>
    </div>
    <DataTable data={appointments} columns={columns} searchKey="patient" searchPlaceholder="Pesquisar por paciente..." />
  </div>
);

export default AppointmentsPage;
