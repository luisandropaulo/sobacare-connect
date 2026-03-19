import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/StatusPill";
import { services } from "@/data/mockData";

const ServicesPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Serviços / Health</h1>
      <p className="text-muted-foreground">Estado dos serviços da plataforma</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((s) => (
        <Card key={s.id}>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{s.name}</h3>
              <StatusPill status={s.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Uptime</p>
                <p className="font-medium">{s.uptime}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Latência</p>
                <p className="font-medium">{s.latency}ms</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Última verificação: {s.lastCheck}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ServicesPage;
