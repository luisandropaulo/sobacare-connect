import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { patients, MockPatient } from "@/data/mockData";
import { Link } from "react-router-dom";

const columns: Column<MockPatient>[] = [
  { key: "name", header: "Nome", render: (row) => <Link to={`/admin/master/patients/${row.id}`} className="text-primary hover:underline cursor-pointer font-medium">{row.name}</Link> },
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
