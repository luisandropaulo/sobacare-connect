import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { patients, MockPatient } from "@/data/mockData";

const columns: Column<MockPatient>[] = [
  { key: "name", header: "Nome" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Telefone" },
  { key: "lastVisit", header: "Última Visita" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const PatientsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
      <p className="text-muted-foreground">Gestão de pacientes registados</p>
    </div>
    <DataTable data={patients} columns={columns} searchKey="name" searchPlaceholder="Pesquisar pacientes..." />
  </div>
);

export default PatientsPage;
