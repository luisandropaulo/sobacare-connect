import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { hospitals, MockHospital } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const columns: Column<MockHospital>[] = [
  { key: "name", header: "Hospital", render: (row) => <Link to={`/admin/master/hospitals/${row.id}`} className="text-primary hover:underline cursor-pointer font-medium">{row.name}</Link> },
  { key: "location", header: "Localização" },
  { key: "plan", header: "Plano", render: (row) => <Badge variant="outline">{row.plan}</Badge> },
  { key: "doctors", header: "Médicos" },
  { key: "patients", header: "Pacientes" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const HospitalsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Hospitais</h1>
      <p className="text-muted-foreground">Gestão de hospitais e clínicas registados</p>
    </div>
    <DataTable data={hospitals} columns={columns} searchKey="name" searchPlaceholder="Pesquisar hospitais..." />
  </div>
);

export default HospitalsPage;
