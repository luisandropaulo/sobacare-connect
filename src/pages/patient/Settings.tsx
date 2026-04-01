import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientAppointments, patientDocuments } from "@/data/patientMockData";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const PatientSettings = () => {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "P";
  const [editing, setEditing] = useState(false);

  const handleSave = () => { setEditing(false); toast.success("Dados atualizados com sucesso!"); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Definições</h1>
        <p className="text-muted-foreground">Gerir a sua conta, perfil e preferências.</p>
      </div>

      {/* Profile header */}
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
          <span className="inline-block mt-1 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">Paciente</span>
        </div>
      </div>

      <Tabs defaultValue="personal" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="health">Saúde</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Informações Pessoais</CardTitle>
              <Button variant="outline" size="sm" onClick={() => editing ? handleSave() : setEditing(true)}>
                {editing ? "Guardar" : "Editar"}
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Nome</Label><Input defaultValue={user?.name} disabled={!editing} /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} type="email" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="+244 912 345 678" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Data de Nascimento</Label><Input type="date" defaultValue="1990-05-14" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Género</Label><Input defaultValue="Feminino" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Nacionalidade</Label><Input defaultValue="Angolana" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Nº de Identificação (BI)</Label><Input defaultValue="006543210LA041" disabled={!editing} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Dados de Saúde</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Grupo Sanguíneo</Label><Input defaultValue="A+" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Alergias</Label><Input defaultValue="Nenhuma conhecida" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Condições Crónicas</Label><Input defaultValue="Nenhuma" disabled={!editing} /></div>
              <div className="space-y-2"><Label>Contacto de Emergência</Label><Input defaultValue="+244 923 333 444" disabled={!editing} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Preferências de Notificação</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><Label>Email de consultas</Label><Switch defaultChecked /></div>
              <Separator />
              <div className="flex items-center justify-between"><Label>SMS de lembretes</Label><Switch defaultChecked /></div>
              <Separator />
              <div className="flex items-center justify-between"><Label>Novas prescrições</Label><Switch defaultChecked /></div>
              <Separator />
              <div className="flex items-center justify-between"><Label>Alertas familiares</Label><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Alterar Palavra-passe</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Palavra-passe atual</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Nova palavra-passe</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirmar nova palavra-passe</Label><Input type="password" /></div>
              <Button onClick={() => toast.success("Palavra-passe alterada!")}>Alterar Palavra-passe</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Últimas Consultas</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patientAppointments.filter(a => a.status === "completed").map(a => (
                  <div key={a.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{a.doctor}</p>
                      <p className="text-xs text-muted-foreground">{a.specialty} • {a.hospital}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientSettings;
