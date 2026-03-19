import { useState } from "react";
import { notifications as mockNotifications } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";

const NotificationsPage = () => {
  const [items, setItems] = useState(mockNotifications);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

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
        {items.map((n) => (
          <Card key={n.id} className={cn(!n.read && "border-primary/30 bg-primary/5")}>
            <CardContent className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0", !n.read ? "bg-primary" : "bg-transparent")} />
                <div>
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
              {!n.read && (
                <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}>Marcar lida</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
