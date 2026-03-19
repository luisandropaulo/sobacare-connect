import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { kpis } from "@/data/mockData";
import { StatsCard } from "@/components/shared/StatsCard";
import { Building2, Camera, Stethoscope, Users, CalendarDays } from "lucide-react";
import { toast } from "sonner";

const AdminProfile = () => {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "A";
  const [editing, setEditing] = useState(false);

  const handleSave = () => { setEditing(false); toast.success("Perfil atualizado!"); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Perfil do Administrador</h1>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full">
            <Camera className="h-3 w-3" />
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <span className="inline-block mt-1 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">Admin Master</span>
        </div>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas Globais</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Dados Pessoais</CardTitle>
              <Button variant="outline" size="sm" onClick={() => editing ? handleSave() : setEditing(true)}>
                {editing ? "Guardar" : "Editar"}
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Nome</Label><Input defaultValue={user?.name} disabled={!editing} /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} disabled={!editing} /></div>
              <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="+244 900 000 001" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Cargo</Label><Input defaultValue="Super Administrador" disabled /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Hospitais" value={kpis.totalHospitals} icon={Building2} />
            <StatsCard title="Médicos" value={kpis.totalDoctors} icon={Stethoscope} />
            <StatsCard title="Pacientes" value={kpis.totalPatients.toLocaleString()} icon={Users} />
            <StatsCard title="Consultas/Mês" value={kpis.appointmentsThisMonth.toLocaleString()} icon={CalendarDays} />
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Alterar Palavra-passe</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Palavra-passe atual</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Nova palavra-passe</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirmar</Label><Input type="password" /></div>
              <Button onClick={() => toast.success("Palavra-passe alterada!")}>Alterar</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfile;
