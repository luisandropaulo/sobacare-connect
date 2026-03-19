import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { doctors, MockDoctor } from "@/data/mockData";
import { Link } from "react-router-dom";

const columns: Column<MockDoctor>[] = [
  { key: "name", header: "Nome", render: (row) => <Link to={`/admin/master/doctors/${row.id}`} className="text-primary hover:underline cursor-pointer font-medium">{row.name}</Link> },
  { key: "specialty", header: "Especialidade" },
  { key: "hospital", header: "Hospital" },
  { key: "patients", header: "Pacientes" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const DoctorsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Médicos</h1>
      <p className="text-muted-foreground">Gestão de médicos registados na plataforma</p>
    </div>
    <DataTable data={doctors} columns={columns} searchKey="name" searchPlaceholder="Pesquisar médicos..." />
  </div>
);

export default DoctorsPage;
