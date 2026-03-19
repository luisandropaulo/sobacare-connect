import { useState } from "react";
import { activityLogs } from "@/data/hospitalMockData";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Stethoscope, Users, Settings } from "lucide-react";

const typeIcons = { appointment: Calendar, patient: Users, doctor: Stethoscope, system: Settings };
const typeLabels = { appointment: "Consulta", patient: "Paciente", doctor: "Médico", system: "Sistema" };

const HospitalActivity = () => {
  const [selected, setSelected] = useState<typeof activityLogs[0] | null>(null);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Atividade</h1><p className="text-muted-foreground">Registo de atividades recentes.</p></div>
      <div className="space-y-3">
        {activityLogs.map(log => {
          const Icon = typeIcons[log.type];
          return (
            <Card key={log.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(log)}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-primary/10 p-2"><Icon className="h-5 w-5 text-primary" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.user} • {log.timestamp}</p>
                </div>
                <Badge variant="outline">{typeLabels[log.type]}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detalhe da Atividade</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="font-medium">{selected.action}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data/Hora</p>
                  <p className="text-sm font-medium">{selected.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Utilizador</p>
                  <p className="text-sm font-medium">{selected.user}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Ação</p>
                <Badge variant="outline" className="mt-1">{typeLabels[selected.type]}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalActivity;
