import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patientAppointments, patientConsultations } from "@/data/patientMockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", consultas: 1 },
  { month: "Fev", consultas: 2 },
  { month: "Mar", consultas: 3 },
  { month: "Abr", consultas: 0 },
  { month: "Mai", consultas: 0 },
  { month: "Jun", consultas: 0 },
];

const PatientReports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <p className="text-muted-foreground">Resumo da sua atividade médica.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">{patientConsultations.length}</p><p className="text-sm text-muted-foreground">Total de Consultas</p></CardContent></Card>
      <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">{patientAppointments.filter(a => a.status === "pending").length}</p><p className="text-sm text-muted-foreground">Consultas Pendentes</p></CardContent></Card>
      <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">2</p><p className="text-sm text-muted-foreground">Prescrições Ativas</p></CardContent></Card>
    </div>
    <Card>
      <CardHeader><CardTitle className="text-base">Consultas por Mês</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="consultas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

export default PatientReports;
