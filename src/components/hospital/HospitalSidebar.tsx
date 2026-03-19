import { Building2, Calendar, ClipboardList, Heart, Home, Settings, Stethoscope, Users, Activity, LayoutGrid, CreditCard } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const management = [
  { title: "Dashboard", url: "/dashboard/admin-hospital", icon: Home },
  { title: "Médicos", url: "/dashboard/admin-hospital/doctors", icon: Stethoscope },
  { title: "Pacientes", url: "/dashboard/admin-hospital/patients", icon: Users },
  { title: "Consultas", url: "/dashboard/admin-hospital/appointments", icon: ClipboardList },
  { title: "Calendário", url: "/dashboard/admin-hospital/calendar", icon: Calendar },
  { title: "Prescrições", url: "/dashboard/admin-hospital/prescriptions", icon: ClipboardList },
];

const system = [
  { title: "Atividade", url: "/dashboard/admin-hospital/activity", icon: Activity },
  { title: "Unidades", url: "/dashboard/admin-hospital/units", icon: Building2 },
  { title: "Planos", url: "/dashboard/admin-hospital/plans", icon: CreditCard },
];

export function HospitalSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

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
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {management.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/dashboard/admin-hospital"} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {system.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-primary font-medium">
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
