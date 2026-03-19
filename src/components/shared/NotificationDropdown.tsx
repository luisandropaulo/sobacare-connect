import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications as mockNotifications, MockNotification } from "@/data/mockData";
import { cn } from "@/lib/utils";

const typeIcon: Record<MockNotification["type"], string> = {
  info: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  error: "bg-destructive/10 text-destructive",
};

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(mockNotifications);
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

  return (
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
          <div className="border-b px-4 py-3 font-semibold text-sm">Notificações</div>
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">Não há notificações por enquanto</p>
            ) : (
              items.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
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
  );
};
