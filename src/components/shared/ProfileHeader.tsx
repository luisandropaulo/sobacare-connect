import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusPill } from "./StatusPill";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface ProfileHeaderProps {
  name: string;
  subtitle?: string;
  status?: "active" | "inactive" | "pending";
  avatar?: string;
  breadcrumbs: BreadcrumbEntry[];
  actions?: React.ReactNode;
}

export const ProfileHeader = ({
  name,
  subtitle,
  status,
  breadcrumbs,
  actions,
}: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((bc, i) => (
            <BreadcrumbItem key={i}>
              {i > 0 && <BreadcrumbSeparator />}
              {i < breadcrumbs.length - 1 ? (
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => bc.href && navigate(bc.href)}
                >
                  {bc.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{bc.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
              {status && <StatusPill status={status} />}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
};
