import { useState } from "react";
import { hospitalAppointments } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Eye, CalendarClock } from "lucide-react";
import { toast } from "sonner";

const HospitalAppointments = () => {
  const [selected, setSelected] = useState<typeof hospitalAppointments[0] | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);

  const columns = [
    { key: "patient", header: "Paciente" },
    { key: "doctor", header: "Médico" },
    { key: "specialty", header: "Especialidade" },
    { key: "date", header: "Data" },
    { key: "time", header: "Hora" },
    { key: "status", header: "Estado", render: (row: any) => <StatusPill status={row.status} /> },
    { key: "id", header: "Ações", render: (row: any) => (
      <div className="flex gap-1">
        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setSelected(row)}>
          <Eye className="h-3.5 w-3.5 text-primary" />
        </Button>
        {row.status === "pending" && (
          <>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => toast.success("Consulta aprovada!")}>
              <Check className="h-3.5 w-3.5 text-success" />
            </Button>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => toast.info("Consulta rejeitada")}>
              <X className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </>
        )}
        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setRescheduleId(row.id)}>
          <CalendarClock className="h-3.5 w-3.5" />
        </Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Consultas</h1><p className="text-muted-foreground">Gerir e aprovar consultas.</p></div>
      <DataTable data={hospitalAppointments} columns={columns} searchKey="patient" />

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detalhe da Consulta</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Paciente</p><p className="font-medium">{selected.patient}</p></div>
                <div><p className="text-sm text-muted-foreground">Médico</p><p className="font-medium">{selected.doctor}</p></div>
                <div><p className="text-sm text-muted-foreground">Departamento</p><p className="font-medium">{selected.specialty}</p></div>
                <div><p className="text-sm text-muted-foreground">Data e Hora</p><p className="font-medium">{selected.date} às {selected.time}</p></div>
                <div><p className="text-sm text-muted-foreground">Estado</p><StatusPill status={selected.status} /></div>
                {selected.notes && <div className="col-span-2"><p className="text-sm text-muted-foreground">Observações</p><p className="font-medium">{selected.notes}</p></div>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reschedule modal */}
      <Dialog open={!!rescheduleId} onOpenChange={() => setRescheduleId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reagendar Consulta</DialogTitle></DialogHeader>
          <form onSubmit={e => { e.preventDefault(); toast.success("Consulta reagendada!"); setRescheduleId(null); }} className="space-y-4">
            <div className="space-y-2"><Label>Nova Data</Label><Input type="date" required /></div>
            <div className="space-y-2"><Label>Nova Hora</Label><Input type="time" required /></div>
            <div className="space-y-2"><Label>Motivo</Label><Input placeholder="Motivo do reagendamento" /></div>
            <Button type="submit" className="w-full">Reagendar</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalAppointments;
