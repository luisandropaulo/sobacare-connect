import { useState } from "react";
import { Link } from "react-router-dom";
import { patientAppointments } from "@/data/patientMockData";
import { StatusPill } from "@/components/shared/StatusPill";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

const PatientAppointments = () => {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? patientAppointments : patientAppointments.filter(a => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Consultas</h1>
          <p className="text-muted-foreground">Gerir as suas marcações.</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/patient/appointments/create">
            <Plus className="h-4 w-4 mr-2" />Agendar Consulta
          </Link>
        </Button>
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
