import { useState } from "react";
import { hospitalDoctors } from "@/data/hospitalMockData";
import { DataTable } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";

const columns = [
  { key: "name" as const, label: "Nome" },
  { key: "specialty" as const, label: "Especialidade" },
  { key: "email" as const, label: "Email" },
  { key: "patients" as const, label: "Pacientes" },
  { key: "status" as const, label: "Estado", render: (v: string) => <StatusPill status={v as any} /> },
];

const HospitalDoctors = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Médicos</h1><p className="text-muted-foreground">Gerir o corpo clínico.</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Importação CSV em desenvolvimento")}><Upload className="h-4 w-4 mr-2" />Importar CSV</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Adicionar Médico</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Novo Médico</DialogTitle></DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); toast.success("Médico adicionado!"); setOpen(false); }} className="space-y-4">
                <div className="space-y-2"><Label>Nome</Label><Input required /></div>
                <div className="space-y-2"><Label>Especialidade</Label><Input required /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" required /></div>
                <div className="space-y-2"><Label>Telefone</Label><Input required /></div>
                <Button type="submit" className="w-full">Adicionar</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable data={hospitalDoctors} columns={columns} searchKey="name" />
    </div>
  );
};

export default HospitalDoctors;
