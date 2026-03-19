import { useState } from "react";
import { notifications as mockNotifications } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";

const typeColors = { info: "bg-primary/10 text-primary", warning: "bg-warning/10 text-warning", success: "bg-success/10 text-success", error: "bg-destructive/10 text-destructive" };

const NotificationsPage = () => {
  const [items, setItems] = useState(mockNotifications);
  const [selected, setSelected] = useState<typeof mockNotifications[0] | null>(null);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const openDetail = (n: typeof mockNotifications[0]) => {
    markRead(n.id);
    setSelected(n);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Centro de Notificações</h1>
          <p className="text-muted-foreground">Todas as notificações da plataforma</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead}>
          <CheckCheck className="h-4 w-4 mr-1" /> Marcar todas como lidas
        </Button>
      </div>
      <div className="space-y-2">
        {items.map(n => (
          <Card key={n.id} className={cn("cursor-pointer hover:shadow-md transition-shadow", !n.read && "border-primary/30 bg-primary/5")} onClick={() => openDetail(n)}>
            <CardContent className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0", !n.read ? "bg-primary" : "bg-transparent")} />
                <div>
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("text-[10px]", typeColors[n.type])}>{n.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detalhe da Notificação</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Mensagem</p>
                <p className="font-medium">{selected.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{selected.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Origem</p>
                  <p className="text-sm font-medium">Sistema SobaCare</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="text-sm font-medium">{selected.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <Badge variant="outline" className={cn("mt-1", typeColors[selected.type])}>{selected.type}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
