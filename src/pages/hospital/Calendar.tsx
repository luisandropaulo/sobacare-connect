import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hospitalAppointments } from "@/data/hospitalMockData";
import { StatusPill } from "@/components/shared/StatusPill";
import { Calendar as CalendarIcon } from "lucide-react";

const days = ["Seg 17", "Ter 18", "Qua 19", "Qui 20", "Sex 21"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

const HospitalCalendar = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">Calendário</h1><p className="text-muted-foreground">Agenda visual da semana.</p></div>
    <Card>
      <CardContent className="p-4 overflow-x-auto">
        <div className="grid grid-cols-6 gap-px bg-border min-w-[700px]">
          <div className="bg-background p-2" />
          {days.map(d => <div key={d} className="bg-background p-2 text-center font-medium text-sm">{d}</div>)}
          {hours.map(h => (
            <>
              <div key={h} className="bg-background p-2 text-xs text-muted-foreground font-medium">{h}</div>
              {days.map(d => {
                const apt = hospitalAppointments.find(a => a.time === h && d.includes(a.date.slice(-2)));
                return (
                  <div key={d+h} className="bg-background p-1 min-h-[60px]">
                    {apt && (
                      <div className="rounded bg-primary/5 border border-primary/20 p-1.5 text-xs space-y-0.5">
                        <p className="font-medium truncate">{apt.patient}</p>
                        <p className="text-muted-foreground truncate">{apt.doctor}</p>
                        <StatusPill status={apt.status} />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default HospitalCalendar;
