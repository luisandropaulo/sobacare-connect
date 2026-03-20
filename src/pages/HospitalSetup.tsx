import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ArrowRight, ArrowLeft, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";

const specialties = [
  "Cardiologia", "Pediatria", "Ortopedia", "Dermatologia", "Neurologia",
  "Ginecologia", "Oftalmologia", "Urologia", "Pneumologia", "Endocrinologia",
  "Gastroenterologia", "Psiquiatria", "Medicina Geral",
];

const servicesList = [
  "Consultas Presenciais", "Telemedicina", "Exames Laboratoriais",
  "Imagiologia", "Fisioterapia", "Vacinação", "Cirurgia Ambulatória",
  "Urgências", "Internamento", "Farmácia",
];

const HospitalSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [workStart, setWorkStart] = useState("08:00");
  const [workEnd, setWorkEnd] = useState("18:00");
  const [doctorCount, setDoctorCount] = useState("");

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleFinish = () => {
    if (selectedSpecialties.length === 0) {
      toast.error("Selecione pelo menos uma especialidade.");
      return;
    }
    toast.success("Configuração concluída!");
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="rounded-lg bg-primary p-2"><Heart className="h-5 w-5 text-primary-foreground" /></div>
          <span className="text-xl font-bold">SobaCare</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Configuração Inicial</CardTitle>
              <CardDescription>Configure as especialidades, horários e serviços da sua instituição</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Especialidades Médicas *</Label>
                <div className="flex flex-wrap gap-2">
                  {specialties.map(s => (
                    <Badge
                      key={s}
                      variant={selectedSpecialties.includes(s) ? "default" : "outline"}
                      className="cursor-pointer transition-colors"
                      onClick={() => toggleItem(s, selectedSpecialties, setSelectedSpecialties)}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Horário de Abertura</Label>
                  <Input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Horário de Encerramento</Label>
                  <Input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Número Estimado de Médicos</Label>
                <Input type="number" placeholder="Ex: 15" value={doctorCount} onChange={e => setDoctorCount(e.target.value)} />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Serviços Disponíveis</Label>
                <div className="grid grid-cols-2 gap-2">
                  {servicesList.map(s => (
                    <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={selectedServices.includes(s)}
                        onCheckedChange={() => toggleItem(s, selectedServices, setSelectedServices)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={handleFinish}>
                Continuar <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-warning/30">
            <CardContent className="pt-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Subscrição Necessária</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Para continuar a utilizar a SobaCare, é necessário subscrever um plano. Escolha o plano mais adequado à sua instituição.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate("/dashboard/admin-hospital/plans")}>
                  Ver Planos
                </Button>
                <Button onClick={() => {
                  toast.success("Bem-vindo à SobaCare!");
                  navigate("/dashboard/admin-hospital");
                }}>
                  Continuar para o Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HospitalSetup;
