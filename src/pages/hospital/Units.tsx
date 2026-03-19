import { hospitalUnits } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";

const columns = [
  { key: "name" as const, label: "Nome" },
  { key: "address" as const, label: "Endereço" },
  { key: "phone" as const, label: "Telefone" },
  { key: "doctors" as const, label: "Médicos" },
  { key: "status" as const, label: "Estado", render: (v: string) => <StatusPill status={v as any} /> },
];

const HospitalUnits = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Unidades</h1><p className="text-muted-foreground">Gerir as unidades da instituição.</p></div>
    <DataTable data={hospitalUnits} columns={columns} searchKey="name" />
  </div>
);

export default HospitalUnits;
