import { StatsCard } from "@/components/shared/StatsCard";
import { Calendar, Clock, Stethoscope, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/StatusPill";
import { hospitalKpis, hospitalAppointments, hospitalAppointmentsByDay } from "@/data/hospitalMockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const HospitalDashboard = () => {
  const { user } = useAuth();
  const pending = hospitalAppointments.filter(a => a.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bem-vindo, {user?.name || "Admin"} 👋</h1>
        <p className="text-muted-foreground">Visão geral da sua instituição.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Médicos" value={hospitalKpis.totalDoctors} icon={Stethoscope} />
        <StatsCard title="Pacientes" value={hospitalKpis.totalPatients} icon={Users} />
        <StatsCard title="Consultas Hoje" value={hospitalKpis.appointmentsToday} icon={Calendar} />
        <StatsCard title="Aprovações Pendentes" value={hospitalKpis.pendingApprovals} icon={Clock} change="+2" changeType="negative" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Consultas por Dia da Semana</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hospitalAppointmentsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Aprovações Pendentes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pending.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma aprovação pendente.</p> :
              pending.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium text-sm">{a.patient}</p>
                    <p className="text-xs text-muted-foreground">{a.doctor} • {a.date} às {a.time}</p>
                  </div>
                  <StatusPill status={a.status} />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;
