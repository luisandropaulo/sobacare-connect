import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusPill } from "@/components/shared/StatusPill";
import { hospitalAppointments } from "@/data/hospitalMockData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HospitalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedApt, setSelectedApt] = useState<typeof hospitalAppointments[0] | null>(null);

  // Simple March 2026 calendar
  const year = 2026;
  const month = 2; // March (0-indexed)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon start

  const days: (number | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const getAptsForDay = (day: number) => {
    const dateStr = `2026-03-${String(day).padStart(2, "0")}`;
    return hospitalAppointments.filter(a => a.date === dateStr);
  };

  const selectedDayApts = selectedDate
    ? hospitalAppointments.filter(a => a.date === selectedDate)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendário</h1>
        <p className="text-muted-foreground">Agenda visual do mês.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <h2 className="font-semibold text-lg">Março 2026</h2>
            <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {dayNames.map(d => (
              <div key={d} className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
            ))}
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="bg-background p-2 min-h-[80px]" />;
              const apts = getAptsForDay(day);
              const dateStr = `2026-03-${String(day).padStart(2, "0")}`;
              const isSelected = selectedDate === dateStr;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`bg-background p-2 min-h-[80px] cursor-pointer hover:bg-muted/50 transition-colors ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {apts.slice(0, 2).map(a => (
                    <div
                      key={a.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedApt(a); }}
                      className="mt-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] truncate cursor-pointer hover:bg-primary/20"
                    >
                      {a.time} {a.patient}
                    </div>
                  ))}
                  {apts.length > 2 && <span className="text-[10px] text-muted-foreground mt-0.5 block">+{apts.length - 2} mais</span>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Day panel */}
      {selectedDate && selectedDayApts.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Consultas em {selectedDate}</h3>
            <div className="space-y-2">
              {selectedDayApts.map(a => (
                <div
                  key={a.id}
                  onClick={() => setSelectedApt(a)}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm">{a.patient}</p>
                    <p className="text-xs text-muted-foreground">{a.doctor} • {a.specialty} • {a.time}</p>
                  </div>
                  <StatusPill status={a.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointment detail modal */}
      <Dialog open={!!selectedApt} onOpenChange={() => setSelectedApt(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detalhes da Consulta</DialogTitle></DialogHeader>
          {selectedApt && (
            <div className="space-y-3">
              {[
                ["Paciente", selectedApt.patient],
                ["Médico", selectedApt.doctor],
                ["Departamento", selectedApt.specialty],
                ["Data", selectedApt.date],
                ["Hora", selectedApt.time],
                ["Observações", selectedApt.notes || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                  <span className="text-sm text-muted-foreground">{k}</span>
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado</span>
                <StatusPill status={selectedApt.status} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalCalendar;
