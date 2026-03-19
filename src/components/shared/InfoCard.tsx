import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface InfoItem {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
}

export const InfoCard = ({ title, items }: InfoCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        {title}
      </h3>
      <dl className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            {item.icon && (
              <item.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
            )}
            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground">{item.label}</dt>
              <dd className="text-sm font-medium">{item.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
);
