import { prescriptions } from "@/data/patientMockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Download, Pill } from "lucide-react";
import { toast } from "sonner";

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
              <Button variant="outline" size="sm" onClick={() => toast.success("Download iniciado")}><Download className="h-4 w-4" /></Button>
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
