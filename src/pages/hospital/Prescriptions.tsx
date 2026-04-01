import { useState } from "react";
import { hospitalPrescriptions, hospitalAppointments, hospitalPatients } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// Only patients who have had a completed consultation
const patientsWithConsultations = Array.from(
  new Set(hospitalAppointments.filter(a => a.status === "completed").map(a => a.patient))
);

const columns = [
  { key: "patient", header: "Paciente" },
  { key: "doctor", header: "Médico" },
  { key: "diagnosis", header: "Diagnóstico" },
  { key: "date", header: "Data" },
  { key: "status", header: "Estado", render: (row: any) => <StatusPill status={row.status} /> },
];

const HospitalPrescriptions = () => {
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Prescrições</h1><p className="text-muted-foreground">Criar e gerir receitas médicas.</p></div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setSelectedPatient(""); }}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Nova Prescrição</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Criar Prescrição</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Prescrição criada!"); setOpen(false); setSelectedPatient(""); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Paciente</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient} required>
                  <SelectTrigger><SelectValue placeholder="Selecionar paciente" /></SelectTrigger>
                  <SelectContent>
                    {patientsWithConsultations.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Apenas pacientes com consultas realizadas neste hospital.</p>
              </div>
              <div className="space-y-2"><Label>Diagnóstico</Label><Textarea placeholder="Diagnóstico" required /></div>
              <div className="space-y-2"><Label>Medicamentos</Label><Textarea placeholder="Um por linha" required /></div>
              <Button type="submit" className="w-full" disabled={!selectedPatient}>Criar Prescrição</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={hospitalPrescriptions} columns={columns} searchKey="patient" />
    </div>
  );
};

export default HospitalPrescriptions;
