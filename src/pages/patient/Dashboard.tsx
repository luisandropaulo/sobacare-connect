import { StatsCard } from "@/components/shared/StatsCard";
import { Calendar, ClipboardList, FileText, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/StatusPill";
import { patientAppointments, patientConsultations } from "@/data/patientMockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const upcoming = patientAppointments.filter(a => a.status === "confirmed" || a.status === "pending").slice(0, 3);
  const recentConsultations = patientConsultations.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bem-vindo, {user?.name || "Paciente"} 👋</h1>
        <p className="text-muted-foreground">Aqui está um resumo da sua saúde.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Próximas Consultas" value={upcoming.length} icon={Calendar} />
        <StatsCard title="Consultas Realizadas" value={patientConsultations.length} icon={Stethoscope} />
        <StatsCard title="Prescrições Ativas" value={2} icon={ClipboardList} />
        <StatsCard title="Relatórios" value={3} icon={FileText} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Próximas Consultas</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/patient/appointments")}>Ver todas</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium text-sm">{apt.doctor}</p>
                  <p className="text-xs text-muted-foreground">{apt.specialty} • {apt.hospital}</p>
                  <p className="text-xs text-muted-foreground">{apt.date} às {apt.time}</p>
                </div>
                <StatusPill status={apt.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Consultas Recentes</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/patient/consultations")}>Ver todas</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentConsultations.map(c => (
              <div key={c.id} className="p-3 rounded-lg border space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{c.doctor}</p>
                  <span className="text-xs text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{c.specialty} • {c.hospital}</p>
                <p className="text-sm">{c.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
