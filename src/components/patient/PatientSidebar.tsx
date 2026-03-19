import { Calendar, ClipboardList, FileText, FolderOpen, Heart, Home, Settings, Stethoscope, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Início", url: "/dashboard/patient", icon: Home },
  { title: "Consultas", url: "/dashboard/patient/appointments", icon: Calendar },
  { title: "Histórico", url: "/dashboard/patient/consultations", icon: Stethoscope },
  { title: "Prescrições", url: "/dashboard/patient/prescriptions", icon: ClipboardList },
  { title: "Documentos", url: "/dashboard/patient/documents", icon: FolderOpen },
  { title: "Família", url: "/dashboard/patient/family", icon: Users },
  { title: "Relatórios", url: "/dashboard/patient/reports", icon: FileText },
  { title: "Definições", url: "/dashboard/patient/settings", icon: Settings },
];

export function PatientSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-base text-sidebar-foreground">SobaCare</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/dashboard/patient"} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
