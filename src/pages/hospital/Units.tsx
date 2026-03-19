import { hospitalUnits, HospitalUnit } from "@/data/hospitalMockData";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const columns: Column<HospitalUnit>[] = [
  { key: "name", header: "Nome", render: (row) => (
    <div className="flex items-center gap-2">
      <span className="font-medium">{row.name}</span>
      <Badge variant={row.id === "hu1" ? "default" : "outline"} className="text-[10px]">
        {row.id === "hu1" ? "Sede" : "Unidade"}
      </Badge>
    </div>
  )},
  { key: "address", header: "Endereço" },
  { key: "phone", header: "Telefone" },
  { key: "doctors", header: "Médicos" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const HospitalUnits = () => {
  const navigate = useNavigate();
  const plan: string = "Professional";
  const maxUnits = plan === "Essential" ? 1 : plan === "Professional" ? 5 : 999;
  const canCreate = hospitalUnits.length < maxUnits;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Unidades</h1>
          <p className="text-muted-foreground">Gerir as unidades da instituição. Plano: <strong>{plan}</strong> ({hospitalUnits.length}/{maxUnits} unidades)</p>
          <p className="text-xs text-muted-foreground mt-1">A sede controla a visão global. Unidades têm autonomia operacional.</p>
        </div>
        <Button onClick={() => navigate("/dashboard/admin-hospital/units/create")} disabled={!canCreate}>
          <Plus className="h-4 w-4 mr-2" />Nova Unidade
        </Button>
      </div>
      {!canCreate && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Limite de unidades atingido para o plano {plan}. Faça upgrade para adicionar mais.</AlertDescription>
        </Alert>
      )}
      <DataTable data={hospitalUnits} columns={columns} searchKey="name" />
    </div>
  );
};

export default HospitalUnits;
