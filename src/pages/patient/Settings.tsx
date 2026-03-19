import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PatientSettings = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Definições</h1>
      <p className="text-muted-foreground">Gerir a sua conta e preferências.</p>
    </div>
    <div className="grid gap-6 max-w-2xl">
      <Card>
        <CardHeader><CardTitle className="text-base">Dados Pessoais</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nome</Label><Input defaultValue="Ana Silva" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="ana@gmail.com" type="email" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="+244 912 345 678" /></div>
            <div className="space-y-2"><Label>Data de Nascimento</Label><Input type="date" defaultValue="1990-05-14" /></div>
          </div>
          <Button onClick={() => toast.success("Dados atualizados!")}>Guardar Alterações</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Notificações</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><Label>Email de consultas</Label><Switch defaultChecked /></div>
          <Separator />
          <div className="flex items-center justify-between"><Label>SMS de lembretes</Label><Switch defaultChecked /></div>
          <Separator />
          <div className="flex items-center justify-between"><Label>Novas prescrições</Label><Switch defaultChecked /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Segurança</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Palavra-passe atual</Label><Input type="password" /></div>
          <div className="space-y-2"><Label>Nova palavra-passe</Label><Input type="password" /></div>
          <Button onClick={() => toast.success("Palavra-passe alterada!")}>Alterar Palavra-passe</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default PatientSettings;
