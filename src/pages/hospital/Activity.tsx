import { activityLogs } from "@/data/hospitalMockData";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Stethoscope, Users, Settings } from "lucide-react";

const typeIcons = { appointment: Calendar, patient: Users, doctor: Stethoscope, system: Settings };

const HospitalActivity = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Atividade</h1><p className="text-muted-foreground">Registo de atividades recentes.</p></div>
    <div className="space-y-3">
      {activityLogs.map(log => {
        const Icon = typeIcons[log.type];
        return (
          <Card key={log.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-2"><Icon className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{log.action}</p>
                <p className="text-xs text-muted-foreground">{log.user} • {log.timestamp}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default HospitalActivity;
