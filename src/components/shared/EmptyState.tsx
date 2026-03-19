import { InboxIcon, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

export const EmptyState = ({ icon: Icon = InboxIcon, title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="rounded-full bg-muted p-4 mb-4">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-medium">{title}</h3>
    {description && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>}
  </div>
);
