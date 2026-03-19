import { StatsCard } from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kpis, appointmentsByMonth, departmentDistribution } from "@/data/mockData";
import { Users, Building2, Stethoscope, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(213,94%,45%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)", "hsl(262,80%,50%)", "hsl(180,70%,45%)"];

const StatisticsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Estatísticas</h1>
      <p className="text-muted-foreground">Métricas globais da plataforma</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Total Utilizadores" value={kpis.activeUsers.toLocaleString()} icon={Users} />
      <StatsCard title="Hospitais" value={kpis.totalHospitals} icon={Building2} />
      <StatsCard title="Médicos" value={kpis.totalDoctors} icon={Stethoscope} />
      <StatsCard title="Consultas/Mês" value={kpis.appointmentsThisMonth.toLocaleString()} icon={CalendarDays} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Consultas por Mês</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={appointmentsByMonth}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(213,94%,45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Por Departamento</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {departmentDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default StatisticsPage;
