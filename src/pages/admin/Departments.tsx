import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { departments, MockDepartment } from "@/data/mockData";

const columns: Column<MockDepartment>[] = [
  { key: "name", header: "Departamento" },
  { key: "doctorCount", header: "Médicos" },
  { key: "patientCount", header: "Pacientes" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const DepartmentsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Departamentos</h1>
      <p className="text-muted-foreground">Gestão de especialidades médicas</p>
    </div>
    <DataTable data={departments} columns={columns} searchKey="name" searchPlaceholder="Pesquisar departamentos..." />
  </div>
);

export default DepartmentsPage;
