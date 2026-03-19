import { patientConsultations } from "@/data/patientMockData";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

const PatientConsultations = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Histórico de Consultas</h1>
      <p className="text-muted-foreground">Todas as suas consultas anteriores.</p>
    </div>
    <div className="grid gap-4">
      {patientConsultations.map(c => (
        <Card key={c.id}>
          <CardContent className="flex items-start gap-4 p-4">
            <div className="rounded-lg bg-primary/10 p-2 mt-1"><Stethoscope className="h-5 w-5 text-primary" /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{c.doctor}</p>
                <span className="text-sm text-muted-foreground">{c.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.specialty} • {c.hospital}</p>
              <p className="text-sm mt-2">{c.summary}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default PatientConsultations;
