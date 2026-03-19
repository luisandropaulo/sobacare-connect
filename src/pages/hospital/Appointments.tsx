import { hospitalAppointments } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const HospitalAppointments = () => {
  const columns = [
    { key: "patient", header: "Paciente" },
    { key: "doctor", header: "Médico" },
    { key: "specialty", header: "Especialidade" },
    { key: "date", header: "Data" },
    { key: "time", header: "Hora" },
    { key: "status", header: "Estado", render: (row: any) => <StatusPill status={row.status} /> },
    { key: "id", header: "Ações", render: (row: any) => row.status === "pending" ? (
      <div className="flex gap-1">
        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => toast.success("Consulta aprovada!")}><Check className="h-3.5 w-3.5 text-success" /></Button>
        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => toast.info("Consulta rejeitada")}><X className="h-3.5 w-3.5 text-destructive" /></Button>
      </div>
    ) : null },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Consultas</h1><p className="text-muted-foreground">Gerir e aprovar consultas.</p></div>
      <DataTable data={hospitalAppointments} columns={columns} searchKey="patient" />
    </div>
  );
};

export default HospitalAppointments;
