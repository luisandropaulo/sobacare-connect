import { useState, useRef, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications as mockNotifications, MockNotification } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const typeBadge: Record<MockNotification["type"], { label: string; variant: "default" | "destructive" | "secondary" | "outline" }> = {
  info: { label: "Info", variant: "default" },
  warning: { label: "Aviso", variant: "secondary" },
  success: { label: "Sucesso", variant: "outline" },
  error: { label: "Erro", variant: "destructive" },
};

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(mockNotifications);
  const [selected, setSelected] = useState<MockNotification | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const handleClick = (n: MockNotification) => {
    markRead(n.id);
    setSelected(n);
    setOpen(false);
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unread}
            </span>
          )}
        </Button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-card shadow-lg z-50">
            <div className="border-b px-4 py-3 font-semibold text-sm flex items-center justify-between">
              <span>Notificações</span>
              {unread > 0 && (
                <Button variant="ghost" size="sm" className="text-xs h-auto py-1" onClick={() => setItems(prev => prev.map(n => ({ ...n, read: true })))}>
                  Marcar todas como lidas
                </Button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">Não há notificações por enquanto</p>
              ) : (
                items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className={cn("w-full text-left px-4 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("mt-0.5 h-2 w-2 rounded-full shrink-0", !n.read ? "bg-primary" : "bg-transparent")} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selected.title}
                  <Badge variant={typeBadge[selected.type].variant}>{typeBadge[selected.type].label}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <p className="text-sm text-foreground leading-relaxed">{selected.message}</p>
                <p className="text-xs text-muted-foreground">{selected.time}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
