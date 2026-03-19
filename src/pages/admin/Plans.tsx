import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "35.000",
    description: "Para clínicas pequenas",
    features: ["1 unidade", "Até 5 médicos", "100 consultas/mês", "Suporte por email", "Dashboard básico"],
    highlight: false,
  },
  {
    name: "Professional",
    price: "85.000",
    description: "Para hospitais em crescimento",
    features: ["Até 5 unidades", "Até 25 médicos", "500 consultas/mês", "Suporte prioritário", "Dashboard avançado", "Relatórios detalhados", "API access"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "150.000",
    description: "Para grandes redes hospitalares",
    features: ["Unidades ilimitadas", "Médicos ilimitados", "Consultas ilimitadas", "Suporte 24/7", "Dashboard completo", "Relatórios customizados", "API completa", "Webhooks", "SLA garantido"],
    highlight: false,
  },
];

const PlansPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Planos SaaS</h1>
      <p className="text-muted-foreground">Gestão dos planos disponíveis na plataforma</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.name} className={plan.highlight ? "border-primary shadow-md relative" : ""}>
          {plan.highlight && (
            <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Mais Popular</Badge>
          )}
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm"> Kz/mês</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
              Selecionar
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default PlansPage;
