import { useState } from "react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { hospitalDoctors } from "@/data/hospitalMockData";

interface HospitalDepartment {
  id: string;
  name: string;
  description: string;
  head: string;
  doctorCount: number;
  patientCount: number;
  status: "active" | "inactive";
}

const initialDepts: HospitalDepartment[] = [
  { id: "hd1", name: "Cardiologia", description: "Cuidados cardiovasculares", head: "Dr. João Pedro", doctorCount: 5, patientCount: 120, status: "active" },
  { id: "hd2", name: "Pediatria", description: "Cuidados infantis", head: "Dra. Luísa Costa", doctorCount: 8, patientCount: 200, status: "active" },
  { id: "hd3", name: "Ortopedia", description: "Sistema músculo-esquelético", head: "Dr. Manuel Sousa", doctorCount: 3, patientCount: 80, status: "active" },
  { id: "hd4", name: "Dermatologia", description: "Cuidados de pele", head: "Dra. Teresa Lima", doctorCount: 4, patientCount: 95, status: "active" },
  { id: "hd5", name: "Neurologia", description: "Sistema nervoso", head: "Dr. Francisco Gomes", doctorCount: 2, patientCount: 45, status: "inactive" },
];

const columns: Column<HospitalDepartment>[] = [
  { key: "name", header: "Departamento" },
  { key: "description", header: "Descrição" },
  { key: "head", header: "Responsável" },
  { key: "doctorCount", header: "Médicos" },
  { key: "patientCount", header: "Pacientes" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const HospitalDepartments = () => {
  const [open, setOpen] = useState(false);
  const [depts, setDepts] = useState(initialDepts);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDept: HospitalDepartment = {
      id: `hd${Date.now()}`, name, description, head: "A definir", doctorCount: selectedDoctors.length, patientCount: 0, status,
    };
    setDepts([newDept, ...depts]);
    setName(""); setDescription(""); setSelectedDoctors([]);
    setOpen(false);
    toast.success(`Departamento "${name}" criado com ${selectedDoctors.length} médico(s)!`);
  };

  const toggleDoctor = (id: string) => {
    setSelectedDoctors(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
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
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Departamento</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Cardiologia" required />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição do departamento" />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select value={status} onValueChange={(v: "active" | "inactive") => setStatus(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Selecionar Médicos</Label>
                <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                  {hospitalDoctors.map(doc => (
                    <label key={doc.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={selectedDoctors.includes(doc.id)} onChange={() => toggleDoctor(doc.id)} className="rounded" />
                      <span>{doc.name}</span>
                      <span className="text-muted-foreground text-xs">({doc.specialty})</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{selectedDoctors.length} médico(s) selecionado(s)</p>
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
