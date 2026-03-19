import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart } from "lucide-react";

const roleRedirects: Record<UserRole, string> = {
  patient: "/dashboard/patient",
  hospital: "/dashboard/admin-hospital",
  "admin-master": "/admin/master",
};

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");

  // Hospital-specific fields
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalNif, setHospitalNif] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = role === "hospital" ? hospitalName || name : name;
    register(finalName, email, password, role);
    navigate(roleRedirects[role]);
  };

  const isHospital = role === "hospital";

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground space-y-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-foreground/20 p-2">
              <Heart className="h-8 w-8" />
            </div>
            <span className="text-3xl font-bold">SobaCare</span>
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            Conectando pacientes e hospitais com eficiência
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Junte-se à plataforma líder de gestão de saúde em Angola. Agende consultas, gerencie pacientes e acompanhe o atendimento com tecnologia moderna.
          </p>
          <div className="flex gap-6 pt-4">
            <div>
              <p className="text-2xl font-bold">2.5K+</p>
              <p className="text-xs text-primary-foreground/70">Pacientes Ativos</p>
            </div>
            <div>
              <p className="text-2xl font-bold">50+</p>
              <p className="text-xs text-primary-foreground/70">Profissionais</p>
            </div>
            <div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs text-primary-foreground/70">Hospitais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-muted/30 px-4 py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2 lg:hidden">
              <div className="rounded-lg bg-primary p-2">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SobaCare</span>
            </div>
            <CardTitle className="text-2xl">Criar Conta</CardTitle>
            <CardDescription>Registe-se na plataforma SobaCare</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Perfil</Label>
                <div className="grid grid-cols-3 gap-2">
                  {([["patient", "Paciente"], ["hospital", "Hospital"], ["admin-master", "Admin Master"]] as [UserRole, string][]).map(([value, label]) => (
                    <Button key={value} type="button" variant={role === value ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setRole(value)}>
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {isHospital ? (
                <>
                  <div className="space-y-2">
                    <Label>Nome da Instituição</Label>
                    <Input placeholder="Ex: Hospital Central" value={hospitalName} onChange={e => setHospitalName(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Localização</Label>
                      <Input placeholder="Luanda, Angola" value={hospitalLocation} onChange={e => setHospitalLocation(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label>NIF</Label>
                      <Input placeholder="0000000000" value={hospitalNif} onChange={e => setHospitalNif(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone da Instituição</Label>
                    <Input placeholder="+244 222 000 000" value={hospitalPhone} onChange={e => setHospitalPhone(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome do Responsável</Label>
                    <Input placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Palavra-passe</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              <Button type="submit" className="w-full">Criar Conta</Button>
              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">Iniciar Sessão</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
