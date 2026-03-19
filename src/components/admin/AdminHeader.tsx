import { useAuth } from "@/contexts/AuthContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationDropdown } from "@/components/shared/NotificationDropdown";
import { Button } from "@/components/ui/button";
import { LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pesquisar..." className="pl-9 w-64 h-9 bg-muted/50 border-0" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <div className="flex items-center gap-2 ml-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <span className="text-sm font-medium hidden md:block">{user?.name || "Admin"}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
