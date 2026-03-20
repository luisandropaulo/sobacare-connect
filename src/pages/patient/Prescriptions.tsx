import { prescriptions } from "@/data/patientMockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Download, Pill } from "lucide-react";
import { toast } from "sonner";

const generatePrescriptionText = (rx: typeof prescriptions[0]) => {
  const lines = [
    `PRESCRIÇÃO MÉDICA — SobaCare`,
    `Diagnóstico: ${rx.diagnosis}`,
    `Médico: ${rx.doctor}`,
    `Data: ${rx.date}`,
    `Estado: ${rx.status === "active" ? "Activa" : "Expirada"}`,
    ``,
    `MEDICAMENTOS:`,
    ...rx.medications.map((m, i) => `${i + 1}. ${m.name} — ${m.dosage}, ${m.frequency}`),
  ];
  return lines.join("\n");
};

const handleDownload = (rx: typeof prescriptions[0]) => {
  const text = generatePrescriptionText(rx);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prescricao_${rx.id}_${rx.date}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Prescrição descarregada com sucesso");
};

const PatientPrescriptions = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Prescrições</h1>
      <p className="text-muted-foreground">As suas receitas médicas.</p>
    </div>
    <div className="grid gap-4">
      {prescriptions.map(rx => (
        <Card key={rx.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2"><Pill className="h-5 w-5 text-primary" /></div>
              <div>
                <CardTitle className="text-base">{rx.diagnosis}</CardTitle>
                <p className="text-sm text-muted-foreground">{rx.doctor} • {rx.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={rx.status} />
              <Button variant="outline" size="sm" onClick={() => handleDownload(rx)}>
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {rx.medications.map((med, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm font-medium">{med.name}</span>
                  <span className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default PatientPrescriptions;
