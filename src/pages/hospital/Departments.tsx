import { useState } from "react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface HospitalDepartment {
  id: string;
  name: string;
  head: string;
  doctorCount: number;
  patientCount: number;
  status: "active" | "inactive";
}

const initialDepts: HospitalDepartment[] = [
  { id: "hd1", name: "Cardiologia", head: "Dr. João Pedro", doctorCount: 5, patientCount: 120, status: "active" },
  { id: "hd2", name: "Pediatria", head: "Dra. Luísa Costa", doctorCount: 8, patientCount: 200, status: "active" },
  { id: "hd3", name: "Ortopedia", head: "Dr. Manuel Sousa", doctorCount: 3, patientCount: 80, status: "active" },
  { id: "hd4", name: "Dermatologia", head: "Dra. Teresa Lima", doctorCount: 4, patientCount: 95, status: "active" },
  { id: "hd5", name: "Neurologia", head: "Dr. Francisco Gomes", doctorCount: 2, patientCount: 45, status: "inactive" },
];

const columns: Column<HospitalDepartment>[] = [
  { key: "name", header: "Departamento" },
  { key: "head", header: "Responsável" },
  { key: "doctorCount", header: "Médicos" },
  { key: "patientCount", header: "Pacientes" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const HospitalDepartments = () => {
  const [open, setOpen] = useState(false);
  const [depts, setDepts] = useState(initialDepts);
  const [name, setName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDept: HospitalDepartment = {
      id: `hd${Date.now()}`, name, head: "A definir", doctorCount: 0, patientCount: 0, status: "active",
    };
    setDepts([newDept, ...depts]);
    setName("");
    setOpen(false);
    toast.success(`Departamento "${name}" criado!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Departamentos</h1>
          <p className="text-muted-foreground">Gerir departamentos da instituição.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Criar Departamento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Novo Departamento</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome do Departamento</Label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Cardiologia" required />
              </div>
              <Button type="submit" className="w-full">Criar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={depts} columns={columns} searchKey="name" searchPlaceholder="Pesquisar departamentos..." />
    </div>
  );
};

export default HospitalDepartments;
