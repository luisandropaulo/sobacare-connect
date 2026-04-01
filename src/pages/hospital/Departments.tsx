import { useState } from "react";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil } from "lucide-react";
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

const HospitalDepartments = () => {
  const [open, setOpen] = useState(false);
  const [editDept, setEditDept] = useState<HospitalDepartment | null>(null);
  const [depts, setDepts] = useState(initialDepts);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);

  const resetForm = () => { setName(""); setDescription(""); setStatus("active"); setSelectedDoctors([]); };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDept: HospitalDepartment = {
      id: `hd${Date.now()}`, name, description, head: "A definir", doctorCount: selectedDoctors.length, patientCount: 0, status,
    };
    setDepts([newDept, ...depts]);
    resetForm();
    setOpen(false);
    toast.success(`Departamento "${name}" criado!`);
  };

  const openEdit = (dept: HospitalDepartment) => {
    setEditDept(dept);
    setName(dept.name);
    setDescription(dept.description);
    setStatus(dept.status);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDept) return;
    setDepts(prev => prev.map(d => d.id === editDept.id ? { ...d, name, description, status } : d));
    setEditDept(null);
    resetForm();
    toast.success(`Departamento "${name}" atualizado!`);
  };

  const toggleDoctor = (id: string) => {
    setSelectedDoctors(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const columns: Column<HospitalDepartment>[] = [
    { key: "name", header: "Departamento", render: (row) => (
      <button onClick={() => openEdit(row)} className="text-primary hover:underline font-medium text-left">{row.name}</button>
    )},
    { key: "description", header: "Descrição" },
    { key: "head", header: "Responsável" },
    { key: "doctorCount", header: "Médicos" },
    { key: "patientCount", header: "Pacientes" },
    { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
    { key: "id", header: "", render: (row) => (
      <Button variant="ghost" size="sm" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Departamentos</h1>
          <p className="text-muted-foreground">Gerir departamentos da instituição.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}><Plus className="h-4 w-4 mr-2" />Criar Departamento</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Departamento</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2"><Label>Nome</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Cardiologia" required /></div>
              <div className="space-y-2"><Label>Descrição</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição do departamento" /></div>
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

      {/* Edit Dialog */}
      <Dialog open={!!editDept} onOpenChange={open => { if (!open) { setEditDept(null); resetForm(); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Editar Departamento</DialogTitle></DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2"><Label>Nome</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Descrição</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} /></div>
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
            <Button type="submit" className="w-full">Guardar Alterações</Button>
          </form>
        </DialogContent>
      </Dialog>

      <DataTable data={depts} columns={columns} searchKey="name" searchPlaceholder="Pesquisar departamentos..." />
    </div>
  );
};

export default HospitalDepartments;
