import { useState } from "react";
import { patientAppointments } from "@/data/patientMockData";
import { StatusPill } from "@/components/shared/StatusPill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { toast } from "sonner";

const specialties = ["Cardiologia", "Pediatria", "Ortopedia", "Dermatologia", "Neurologia", "Ginecologia"];
const hospitals = ["Hospital Américo Boavida", "Clínica Sagrada Esperança", "Hospital Josina Machel", "Clínica Multiperfil", "Clínica Girassol"];

const PatientAppointments = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? patientAppointments : patientAppointments.filter(a => a.status === filter);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Consulta agendada com sucesso!");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Consultas</h1>
          <p className="text-muted-foreground">Gerir as suas marcações.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Agendar Consulta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Agendar Nova Consulta</DialogTitle></DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="space-y-2">
                <Label>Especialidade</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                  <SelectContent>{specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Hospital/Clínica</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                  <SelectContent>{hospitals.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Data</Label><Input type="date" required /></div>
                <div className="space-y-2"><Label>Hora</Label><Input type="time" required /></div>
              </div>
              <Button type="submit" className="w-full">Confirmar Agendamento</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        {["all", "confirmed", "pending", "completed", "cancelled"].map(s => (
          <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>
            {s === "all" ? "Todas" : s === "confirmed" ? "Confirmadas" : s === "pending" ? "Pendentes" : s === "completed" ? "Concluídas" : "Canceladas"}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map(apt => (
          <Card key={apt.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2"><Calendar className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="font-medium">{apt.doctor}</p>
                  <p className="text-sm text-muted-foreground">{apt.specialty} • {apt.hospital}</p>
                  <p className="text-sm text-muted-foreground">{apt.date} às {apt.time}</p>
                  {apt.notes && <p className="text-sm mt-1">{apt.notes}</p>}
                </div>
              </div>
              <StatusPill status={apt.status} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
