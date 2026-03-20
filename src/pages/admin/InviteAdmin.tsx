import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Send, Clock, Check } from "lucide-react";
import { toast } from "sonner";

interface Invite {
  id: string;
  email: string;
  token: string;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
}

const initialInvites: Invite[] = [
  { id: "inv1", email: "joao.admin@sobacare.ao", token: "abc123xyz", status: "accepted", createdAt: "2025-03-01", expiresAt: "2025-03-08" },
  { id: "inv2", email: "maria.admin@sobacare.ao", token: "def456uvw", status: "pending", createdAt: "2025-03-15", expiresAt: "2025-03-22" },
];

const InviteAdminPage = () => {
  const [invites, setInvites] = useState<Invite[]>(initialInvites);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = () => {
    if (!email) { toast.error("Insira um email."); return; }
    setLoading(true);
    setTimeout(() => {
      const token = Math.random().toString(36).slice(2, 12);
      const now = new Date();
      const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const newInvite: Invite = {
        id: `inv${invites.length + 1}`,
        email,
        token,
        status: "pending",
        createdAt: now.toISOString().split("T")[0],
        expiresAt: expires.toISOString().split("T")[0],
      };
      setInvites([newInvite, ...invites]);
      setEmail("");
      setLoading(false);
      toast.success(`Convite enviado para ${newInvite.email}`);
    }, 800);
  };

  const copyLink = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/invite/admin?token=${token}`);
    toast.success("Link copiado!");
  };

  const statusColor = { pending: "bg-warning/10 text-warning", accepted: "bg-success/10 text-success", expired: "bg-muted text-muted-foreground" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Convidar Admin Master</h1>
        <p className="text-muted-foreground">Envie convites para novos administradores da plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enviar Convite</CardTitle>
          <CardDescription>O utilizador receberá um link para configurar a sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="email@sobacare.ao" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <Button onClick={handleInvite} disabled={loading}>
              {loading ? "A enviar..." : <><Send className="h-4 w-4 mr-2" />Enviar Convite</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Convites Enviados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invites.map(inv => (
              <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{inv.email}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Enviado: {inv.createdAt} · Expira: {inv.expiresAt}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={statusColor[inv.status]}>
                    {inv.status === "pending" ? "Pendente" : inv.status === "accepted" ? "Aceite" : "Expirado"}
                  </Badge>
                  {inv.status === "pending" && (
                    <Button variant="ghost" size="icon" onClick={() => copyLink(inv.token)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteAdminPage;
