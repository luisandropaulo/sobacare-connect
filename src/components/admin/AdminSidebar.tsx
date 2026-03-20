import {
  LayoutDashboard, Users, Building2, Stethoscope, UserRound, CalendarDays, Layers,
  CreditCard, Receipt, Crown, FileBarChart, BarChart3, Plug, Key, Webhook,
  ScrollText, Server, LifeBuoy, Bell, Settings, Heart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Principal",
    items: [
      { title: "Dashboard", url: "/admin/master", icon: LayoutDashboard },
    ],
  },
  {
    label: "Gestão",
    items: [
      { title: "Utilizadores", url: "/admin/master/users", icon: Users },
      { title: "Hospitais", url: "/admin/master/hospitals", icon: Building2 },
      { title: "Médicos", url: "/admin/master/doctors", icon: Stethoscope },
      { title: "Pacientes", url: "/admin/master/patients", icon: UserRound },
      { title: "Consultas", url: "/admin/master/appointments", icon: CalendarDays },
      { title: "Departamentos", url: "/admin/master/departments", icon: Layers },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { title: "Faturação", url: "/admin/master/billing", icon: CreditCard },
      { title: "Pagamentos", url: "/admin/master/payments", icon: Receipt },
      { title: "Planos", url: "/admin/master/plans", icon: Crown },
      { title: "Relatórios", url: "/admin/master/reports", icon: FileBarChart },
    ],
  },
  {
    label: "Sistema",
    items: [
      { title: "Estatísticas", url: "/admin/master/statistics", icon: BarChart3 },
      { title: "Integrações", url: "/admin/master/integrations", icon: Plug },
      { title: "API Keys", url: "/admin/master/api-keys", icon: Key },
      { title: "Webhooks", url: "/admin/master/webhooks", icon: Webhook },
      { title: "Logs", url: "/admin/master/logs", icon: ScrollText },
      { title: "Serviços", url: "/admin/master/services", icon: Server },
      { title: "Suporte", url: "/admin/master/support", icon: LifeBuoy },
      { title: "Notificações", url: "/admin/master/notifications", icon: Bell },
      { title: "Configurações", url: "/admin/master/settings", icon: Settings },
      { title: "Convidar Admin", url: "/admin/master/invite-admin", icon: Users },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-sidebar-primary p-1.5">
            <Heart className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-sidebar-foreground text-lg">SobaCare</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-[10px] tracking-wider">
              {!collapsed && group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin/master"}
                        className="hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
