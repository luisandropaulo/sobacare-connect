import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/StatusPill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const integrations = [
  { name: "Stripe Payments", description: "Processamento de pagamentos online", status: "active" as const, category: "Pagamentos" },
  { name: "SendGrid", description: "Envio de emails transacionais", status: "active" as const, category: "Comunicação" },
  { name: "Twilio SMS", description: "Notificações por SMS", status: "active" as const, category: "Comunicação" },
  { name: "Google Calendar", description: "Sincronização de agenda", status: "inactive" as const, category: "Produtividade" },
  { name: "Slack", description: "Notificações para equipa", status: "inactive" as const, category: "Comunicação" },
];

const IntegrationsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Integrações</h1>
      <p className="text-muted-foreground">Serviços externos conectados à plataforma</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {integrations.map((i) => (
        <Card key={i.name}>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{i.name}</h3>
              <StatusPill status={i.status} />
            </div>
            <p className="text-sm text-muted-foreground">{i.description}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{i.category}</Badge>
              <Button size="sm" variant={i.status === "active" ? "outline" : "default"}>
                {i.status === "active" ? "Configurar" : "Ativar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default IntegrationsPage;
