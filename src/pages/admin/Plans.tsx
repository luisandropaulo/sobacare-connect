import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  features: string[];
  limits: { doctors: number; appointments: number; units: number };
  active: boolean;
  highlight: boolean;
}

const initialPlans: Plan[] = [
  {
    id: "p1", name: "Essential", priceMonthly: "35.000", priceYearly: "350.000",
    description: "Para clínicas pequenas",
    features: ["1 unidade", "Até 5 médicos", "100 consultas/mês", "Suporte por email", "Dashboard básico"],
    limits: { doctors: 5, appointments: 100, units: 1 },
    active: true, highlight: false,
  },
  {
    id: "p2", name: "Professional", priceMonthly: "85.000", priceYearly: "850.000",
    description: "Para hospitais em crescimento",
    features: ["Até 5 unidades", "Até 25 médicos", "500 consultas/mês", "Suporte prioritário", "Dashboard avançado", "Relatórios detalhados", "API access"],
    limits: { doctors: 25, appointments: 500, units: 5 },
    active: true, highlight: true,
  },
  {
    id: "p3", name: "Enterprise", priceMonthly: "150.000", priceYearly: "1.500.000",
    description: "Para grandes redes hospitalares",
    features: ["Unidades ilimitadas", "Médicos ilimitados", "Consultas ilimitadas", "Suporte 24/7", "Dashboard completo", "Relatórios customizados", "API completa", "Webhooks", "SLA garantido"],
    limits: { doctors: 999, appointments: 9999, units: 999 },
    active: true, highlight: false,
  },
];

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formPriceM, setFormPriceM] = useState("");
  const [formPriceY, setFormPriceY] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formFeatures, setFormFeatures] = useState("");
  const [formDoctors, setFormDoctors] = useState("");
  const [formAppts, setFormAppts] = useState("");
  const [formUnits, setFormUnits] = useState("");

  const openCreate = () => {
    setEditingPlan(null);
    setFormName(""); setFormPriceM(""); setFormPriceY(""); setFormDesc("");
    setFormFeatures(""); setFormDoctors(""); setFormAppts(""); setFormUnits("");
    setIsOpen(true);
  };

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormName(plan.name); setFormPriceM(plan.priceMonthly); setFormPriceY(plan.priceYearly);
    setFormDesc(plan.description); setFormFeatures(plan.features.join("\n"));
    setFormDoctors(String(plan.limits.doctors)); setFormAppts(String(plan.limits.appointments));
    setFormUnits(String(plan.limits.units));
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formName || !formPriceM) { toast.error("Nome e preço mensal são obrigatórios."); return; }
    const planData: Plan = {
      id: editingPlan?.id || `p${Date.now()}`,
      name: formName,
      priceMonthly: formPriceM,
      priceYearly: formPriceY,
      description: formDesc,
      features: formFeatures.split("\n").filter(Boolean),
      limits: { doctors: Number(formDoctors) || 5, appointments: Number(formAppts) || 100, units: Number(formUnits) || 1 },
      active: editingPlan?.active ?? true,
      highlight: editingPlan?.highlight ?? false,
    };
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? planData : p));
      toast.success("Plano atualizado!");
    } else {
      setPlans([...plans, planData]);
      toast.success("Plano criado!");
    }
    setIsOpen(false);
  };

  const toggleActive = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, active: !p.active } : p));
    toast.success("Estado do plano atualizado.");
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
    toast.success("Plano removido.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Planos</h1>
          <p className="text-muted-foreground">Criar, editar e gerir os planos SaaS da plataforma</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Criar Plano</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Editar Plano" : "Criar Plano"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5"><Label>Nome *</Label><Input value={formName} onChange={e => setFormName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Descrição</Label><Input value={formDesc} onChange={e => setFormDesc(e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Preço Mensal (Kz) *</Label><Input value={formPriceM} onChange={e => setFormPriceM(e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Preço Anual (Kz)</Label><Input value={formPriceY} onChange={e => setFormPriceY(e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5"><Label>Médicos</Label><Input type="number" value={formDoctors} onChange={e => setFormDoctors(e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Consultas</Label><Input type="number" value={formAppts} onChange={e => setFormAppts(e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Unidades</Label><Input type="number" value={formUnits} onChange={e => setFormUnits(e.target.value)} /></div>
              </div>
              <div className="space-y-1.5">
                <Label>Funcionalidades (uma por linha)</Label>
                <textarea className="w-full border rounded-md p-2 text-sm min-h-[100px] bg-background" value={formFeatures} onChange={e => setFormFeatures(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleSave}>{editingPlan ? "Guardar Alterações" : "Criar Plano"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <Card key={plan.id} className={`relative ${plan.highlight ? "border-primary shadow-md" : ""} ${!plan.active ? "opacity-60" : ""}`}>
            {plan.highlight && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Mais Popular</Badge>}
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {!plan.active && <Badge variant="outline" className="text-muted-foreground">Inativo</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.priceMonthly}</span>
                <span className="text-muted-foreground text-sm"> Kz/mês</span>
              </div>
              {plan.priceYearly && (
                <p className="text-xs text-muted-foreground">{plan.priceYearly} Kz/ano</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Até {plan.limits.doctors} médicos · {plan.limits.appointments} consultas · {plan.limits.units} unidade(s)</p>
              </div>
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Switch checked={plan.active} onCheckedChange={() => toggleActive(plan.id)} />
                  <span className="text-xs text-muted-foreground">{plan.active ? "Ativo" : "Inativo"}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(plan)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deletePlan(plan.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
