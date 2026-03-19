import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const hospitalData: Record<string, { departments: string[]; doctors: Record<string, string[]> }> = {
  "Hospital Américo Boavida": {
    departments: ["Cardiologia", "Neurologia"],
    doctors: { Cardiologia: ["Dr. João Pedro"], Neurologia: ["Dr. Francisco Gomes"] },
  },
  "Clínica Sagrada Esperança": {
    departments: ["Pediatria"],
    doctors: { Pediatria: ["Dra. Luísa Costa"] },
  },
  "Hospital Josina Machel": {
    departments: ["Ortopedia"],
    doctors: { Ortopedia: ["Dr. Manuel Sousa"] },
  },
  "Clínica Multiperfil": {
    departments: ["Dermatologia"],
    doctors: { Dermatologia: ["Dra. Teresa Lima"] },
  },
  "Clínica Girassol": {
    departments: ["Ginecologia"],
    doctors: { Ginecologia: ["Dra. Isabel Martins"] },
  },
};

const steps = ["Hospital & Departamento", "Médico & Data", "Confirmação"];

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [hospital, setHospital] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const departments = hospital ? hospitalData[hospital]?.departments || [] : [];
  const doctors = hospital && department ? hospitalData[hospital]?.doctors[department] || [] : [];

  const canNext = step === 0 ? hospital && department : step === 1 ? doctor && date && time : true;

  const handleSubmit = () => {
    toast.success("Consulta agendada com sucesso!");
    navigate("/dashboard/patient/appointments");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-bold">Agendar Consulta</h1>
          <p className="text-muted-foreground">Preencha os dados para marcar a sua consulta.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold shrink-0 ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i <= step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label>Hospital / Clínica *</Label>
                <Select value={hospital} onValueChange={(v) => { setHospital(v); setDepartment(""); setDoctor(""); }}>
                  <SelectTrigger><SelectValue placeholder="Selecionar hospital" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(hospitalData).map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Departamento *</Label>
                <Select value={department} onValueChange={(v) => { setDepartment(v); setDoctor(""); }} disabled={!hospital}>
                  <SelectTrigger><SelectValue placeholder="Selecionar departamento" /></SelectTrigger>
                  <SelectContent>
                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label>Médico *</Label>
                <Select value={doctor} onValueChange={setDoctor}>
                  <SelectTrigger><SelectValue placeholder="Selecionar médico" /></SelectTrigger>
                  <SelectContent>
                    {doctors.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Data *</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} required /></div>
                <div className="space-y-2"><Label>Hora *</Label><Input type="time" value={time} onChange={e => setTime(e.target.value)} required /></div>
              </div>
              <div className="space-y-2"><Label>Observações</Label><Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas adicionais..." /></div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Resumo da Consulta</h3>
              {[
                ["Hospital", hospital],
                ["Departamento", department],
                ["Médico", doctor],
                ["Data", date],
                ["Hora", time],
                ["Observações", notes || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                  <span className="text-sm text-muted-foreground">{k}</span>
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4 mr-2" />Anterior
        </Button>
        {step < 2 ? (
          <Button onClick={() => setStep(s => s + 1)} disabled={!canNext}>
            Seguinte<ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <CheckCircle2 className="h-4 w-4 mr-2" />Confirmar Agendamento
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateAppointment;
