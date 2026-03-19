import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Configurações Avançadas</h1>
      <p className="text-muted-foreground">Configurações globais da plataforma</p>
    </div>

    <Card>
      <CardHeader><CardTitle className="text-base">Informações da Plataforma</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome da Plataforma</Label>
            <Input defaultValue="SobaCare" />
          </div>
          <div className="space-y-2">
            <Label>Email de Contacto</Label>
            <Input defaultValue="admin@sobacare.ao" />
          </div>
          <div className="space-y-2">
            <Label>URL do Sistema</Label>
            <Input defaultValue="https://app.sobacare.ao" />
          </div>
          <div className="space-y-2">
            <Label>Fuso Horário</Label>
            <Input defaultValue="Africa/Luanda (WAT)" />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="text-base">Funcionalidades</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {[
          ["Modo Manutenção", "Ativar modo de manutenção para todos os utilizadores", false],
          ["Registo Aberto", "Permitir novos registos na plataforma", true],
          ["Notificações por Email", "Enviar notificações por email automaticamente", true],
          ["Notificações por SMS", "Enviar notificações por SMS", false],
        ].map(([label, desc, checked]) => (
          <div key={label as string} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div>
              <p className="font-medium text-sm">{label as string}</p>
              <p className="text-xs text-muted-foreground">{desc as string}</p>
            </div>
            <Switch defaultChecked={checked as boolean} />
          </div>
        ))}
      </CardContent>
    </Card>

    <div className="flex justify-end">
      <Button onClick={() => toast.success("Configurações guardadas!")}>Guardar Alterações</Button>
    </div>
  </div>
);

export default SettingsPage;
