import { hospitalUnits } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";

const columns = [
  { key: "name", header: "Nome" },
  { key: "address", header: "Endereço" },
  { key: "phone", header: "Telefone" },
  { key: "doctors", header: "Médicos" },
  { key: "status", header: "Estado", render: (row: any) => <StatusPill status={row.status} /> },
];

const HospitalUnits = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Unidades</h1><p className="text-muted-foreground">Gerir as unidades da instituição.</p></div>
    <DataTable data={hospitalUnits} columns={columns} searchKey="name" />
  </div>
);

export default HospitalUnits;
