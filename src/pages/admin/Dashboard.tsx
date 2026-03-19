import { Building2, Stethoscope, UserRound, CalendarDays, DollarSign, TrendingUp, AlertCircle, Activity } from "lucide-react";
import { StatsCard } from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kpis, appointmentsByMonth, revenueByMonth, departmentDistribution } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const COLORS = ["hsl(213,94%,45%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)", "hsl(262,80%,50%)", "hsl(180,70%,45%)"];

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bem-vindo, {user?.name || "Admin"} 👋</h1>
        <p className="text-muted-foreground">Visão geral da plataforma SobaCare</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Hospitais" value={kpis.totalHospitals} change="+3 este mês" changeType="positive" icon={Building2} />
        <StatsCard title="Médicos" value={kpis.totalDoctors} change="+12 este mês" changeType="positive" icon={Stethoscope} />
        <StatsCard title="Pacientes" value={kpis.totalPatients.toLocaleString()} change="+245 este mês" changeType="positive" icon={UserRound} />
        <StatsCard title="Consultas (mês)" value={kpis.appointmentsThisMonth.toLocaleString()} change="+8.5% vs mês anterior" changeType="positive" icon={CalendarDays} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Receita Total" value={`${(kpis.revenue / 1000000).toFixed(1)}M Kz`} change="+12% vs mês anterior" changeType="positive" icon={DollarSign} />
        <StatsCard title="Utilizadores Ativos" value={kpis.activeUsers.toLocaleString()} icon={TrendingUp} />
        <StatsCard title="Aprovações Pendentes" value={kpis.pendingApprovals} changeType="negative" change="Requer atenção" icon={AlertCircle} />
        <StatsCard title="Uptime" value={`${kpis.systemUptime}%`} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Consultas por Mês</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={appointmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(213,94%,45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Receita Mensal (Kz)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} Kz`} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Distribuição por Departamento</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {departmentDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
