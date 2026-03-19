import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patientAppointments, patientConsultations } from "@/data/patientMockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";

const monthlyData = [
  { month: "Jan", consultas: 1 },
  { month: "Fev", consultas: 2 },
  { month: "Mar", consultas: 3 },
  { month: "Abr", consultas: 0 },
  { month: "Mai", consultas: 0 },
  { month: "Jun", consultas: 0 },
];

const PatientReports = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Resumo da sua atividade médica.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pesquisar..." className="pl-9 w-56" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="consultation">Consultas</SelectItem>
            <SelectItem value="prescription">Prescrições</SelectItem>
            <SelectItem value="exam">Exames</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" className="w-44" />
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
};

export default PatientReports;
