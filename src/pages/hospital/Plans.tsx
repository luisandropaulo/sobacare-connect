import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { toast } from "sonner";

const plans = [
  { name: "Essential", price: "35.000 Kz", period: "/mês", units: "1 unidade", features: ["Até 10 médicos", "Gestão básica de consultas", "Relatórios simples", "Suporte por email"], current: false },
  { name: "Professional", price: "85.000 Kz", period: "/mês", units: "Até 5 unidades", features: ["Até 50 médicos", "Gestão completa", "Relatórios avançados", "Importação CSV", "Suporte prioritário", "API access"], current: true },
  { name: "Enterprise", price: "150.000 Kz", period: "/mês", units: "Ilimitado", features: ["Médicos ilimitados", "Multi-unidade premium", "Relatórios personalizados", "Integração API completa", "Gestor de conta dedicado", "SLA garantido", "Webhooks"], current: false },
];

const HospitalPlans = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Planos</h1><p className="text-muted-foreground">O seu plano e opções de upgrade.</p></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map(plan => (
        <Card key={plan.name} className={plan.current ? "border-primary shadow-md" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{plan.name}</CardTitle>
              {plan.current && <Badge>Atual</Badge>}
            </div>
            <p className="text-2xl font-bold">{plan.price}<span className="text-sm text-muted-foreground font-normal">{plan.period}</span></p>
            <p className="text-sm text-muted-foreground">{plan.units}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{f}</li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.current ? "outline" : "default"} disabled={plan.current}
              onClick={() => toast.success(`Plano ${plan.name} selecionado!`)}>
              {plan.current ? "Plano Atual" : "Selecionar"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default HospitalPlans;
