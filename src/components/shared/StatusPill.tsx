import { cn } from "@/lib/utils";

export type StatusVariant = "active" | "inactive" | "confirmed" | "pending" | "cancelled" | "completed" | "expired" | "paid" | "overdue" | "open" | "in_progress" | "closed" | "operational" | "degraded" | "down" | "revoked" | "high" | "medium" | "low";

const variantStyles: Record<StatusVariant, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  cancelled: "bg-destructive/10 text-destructive",
  paid: "bg-success/10 text-success",
  overdue: "bg-destructive/10 text-destructive",
  open: "bg-primary/10 text-primary",
  in_progress: "bg-warning/10 text-warning",
  closed: "bg-muted text-muted-foreground",
  operational: "bg-success/10 text-success",
  degraded: "bg-warning/10 text-warning",
  down: "bg-destructive/10 text-destructive",
  revoked: "bg-destructive/10 text-destructive",
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-primary/10 text-primary",
};

const labels: Record<StatusVariant, string> = {
  active: "Ativo",
  inactive: "Inativo",
  confirmed: "Confirmado",
  pending: "Pendente",
  cancelled: "Cancelado",
  paid: "Pago",
  overdue: "Atrasado",
  open: "Aberto",
  in_progress: "Em Progresso",
  closed: "Fechado",
  operational: "Operacional",
  degraded: "Degradado",
  down: "Fora do Ar",
  revoked: "Revogado",
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

export const StatusPill = ({ status }: { status: StatusVariant }) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variantStyles[status])}>
    {labels[status]}
  </span>
);
