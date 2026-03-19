import { useState } from "react";
import { hospitalPrescriptions } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const columns = [
  { key: "patient", header: "Paciente" },
  { key: "doctor", header: "Médico" },
  { key: "diagnosis", header: "Diagnóstico" },
  { key: "date", header: "Data" },
  { key: "status", header: "Estado", render: (row: any) => <StatusPill status={row.status} /> },
];

const HospitalPrescriptions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Prescrições</h1><p className="text-muted-foreground">Criar e gerir receitas médicas.</p></div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Nova Prescrição</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Criar Prescrição</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Prescrição criada!"); setOpen(false); }} className="space-y-4">
              <div className="space-y-2"><Label>Paciente</Label><Input required /></div>
              <div className="space-y-2"><Label>Diagnóstico</Label><Input required /></div>
              <div className="space-y-2"><Label>Medicamentos</Label><Textarea placeholder="Um por linha" required /></div>
              <Button type="submit" className="w-full">Criar Prescrição</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={hospitalPrescriptions} columns={columns} searchKey="patient" />
    </div>
  );
};

export default HospitalPrescriptions;
