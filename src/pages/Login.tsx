import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Eye, EyeOff } from "lucide-react";

const roleRedirects: Record<UserRole, string> = {
  patient: "/dashboard/patient",
  hospital: "/dashboard/admin-hospital",
  "admin-master": "/admin/master",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, role);
    navigate(roleRedirects[role]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[440px] bg-gradient-to-br from-primary to-primary/80 items-center justify-center p-12 shrink-0">
        <div className="max-w-sm text-primary-foreground space-y-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-foreground/20 p-2">
              <Heart className="h-8 w-8" />
            </div>
            <span className="text-3xl font-bold">SobaCare</span>
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            A sua saúde, a um clique de distância
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Aceda à plataforma líder de gestão de saúde em Angola. Agende consultas, acompanhe exames e gerencie a saúde da sua família.
          </p>
          <div className="flex gap-6 pt-4">
            <div><p className="text-2xl font-bold">2.5K+</p><p className="text-xs text-primary-foreground/70">Pacientes Ativos</p></div>
            <div><p className="text-2xl font-bold">50+</p><p className="text-xs text-primary-foreground/70">Profissionais</p></div>
            <div><p className="text-2xl font-bold">47</p><p className="text-xs text-primary-foreground/70">Hospitais</p></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2 lg:hidden">
              <div className="rounded-lg bg-primary p-2"><Heart className="h-5 w-5 text-primary-foreground" /></div>
              <span className="text-xl font-bold">SobaCare</span>
            </div>
            <CardTitle className="text-2xl">Iniciar Sessão</CardTitle>
            <CardDescription>Aceda à sua conta SobaCare</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Palavra-passe</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Perfil</Label>
                <div className="grid grid-cols-3 gap-2">
                  {([["patient", "Paciente"], ["hospital", "Hospital"], ["admin-master", "Admin"]] as [UserRole, string][]).map(([value, label]) => (
                    <Button key={value} type="button" variant={role === value ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setRole(value)}>
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">Registar-se</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
