import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const roleRedirects: Record<UserRole, string> = {
  patient: "/dashboard/patient",
  hospital: "/hospital-setup",
  "admin-master": "/admin/master",
};

const provinces = [
  "Bengo", "Benguela", "Bié", "Cabinda", "Cunene", "Huambo", "Huíla",
  "Kwando Kubango", "Kwanza Norte", "Kwanza Sul", "Luanda", "Lunda Norte",
  "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire",
];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("patient");

  // Patient fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Hospital fields
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalNif, setHospitalNif] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalProvince, setHospitalProvince] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

  const validatePhone = (p: string) => /^\+?244\s?\d{3}\s?\d{3}\s?\d{3}$/.test(p.replace(/\s/g, "")) || /^\d{9,}$/.test(p.replace(/\s/g, ""));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As palavras-passe não coincidem.");
      return;
    }

    if (role === "patient") {
      if (!validatePhone(phone)) {
        toast.error("Formato de telefone inválido. Use +244 XXX XXX XXX.");
        return;
      }
      register(`${firstName} ${lastName}`, email, password, role);
    } else if (role === "hospital") {
      if (!validatePhone(hospitalPhone) || !validatePhone(adminPhone)) {
        toast.error("Formato de telefone inválido.");
        return;
      }
      register(hospitalName, adminEmail || hospitalEmail, password, role);
    } else {
      toast.error("Registo de Admin Master não é permitido publicamente.");
      return;
    }

    toast.success("Conta criada com sucesso!");
    navigate(roleRedirects[role]);
  };

  const isHospital = role === "hospital";

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
            Conectando pacientes e hospitais com eficiência
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Junte-se à plataforma líder de gestão de saúde em Angola. Agende consultas, gerencie pacientes e acompanhe o atendimento.
          </p>
          <div className="flex gap-6 pt-4">
            <div><p className="text-2xl font-bold">2.5K+</p><p className="text-xs text-primary-foreground/70">Pacientes Ativos</p></div>
            <div><p className="text-2xl font-bold">50+</p><p className="text-xs text-primary-foreground/70">Profissionais</p></div>
            <div><p className="text-2xl font-bold">47</p><p className="text-xs text-primary-foreground/70">Hospitais</p></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-start justify-center bg-muted/30 px-4 py-8 overflow-y-auto">
        <Card className="w-full max-w-xl my-4">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2 lg:hidden">
              <div className="rounded-lg bg-primary p-2"><Heart className="h-5 w-5 text-primary-foreground" /></div>
              <span className="text-xl font-bold">SobaCare</span>
            </div>
            <CardTitle className="text-2xl">Criar Conta</CardTitle>
            <CardDescription>Registe-se na plataforma SobaCare</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role selector - hide admin-master */}
              <div className="space-y-2">
                <Label>Perfil</Label>
                <div className="grid grid-cols-2 gap-2">
                  {([["patient", "Paciente"], ["hospital", "Hospital / Clínica"]] as [UserRole, string][]).map(([value, label]) => (
                    <Button key={value} type="button" variant={role === value ? "default" : "outline"} size="sm" onClick={() => setRole(value)}>
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {isHospital ? (
                <>
                  {/* Section A: Clinic Information */}
                  <div className="pt-2 pb-1">
                    <p className="text-sm font-semibold text-foreground">Informação da Instituição</p>
                    <p className="text-xs text-muted-foreground">Dados da clínica ou hospital</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Nome da Instituição *</Label>
                      <Input placeholder="Ex: Hospital Central" value={hospitalName} onChange={e => setHospitalName(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>NIF</Label>
                      <Input placeholder="0000000000" value={hospitalNif} onChange={e => setHospitalNif(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Endereço Completo</Label>
                    <Input placeholder="Rua, Bairro, Município" value={hospitalAddress} onChange={e => setHospitalAddress(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Província / Cidade</Label>
                      <Select value={hospitalProvince} onValueChange={setHospitalProvince}>
                        <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                        <SelectContent>
                          {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Tipo</Label>
                      <Select value={hospitalType} onValueChange={setHospitalType}>
                        <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clinic">Clínica</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="laboratory">Laboratório</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Telefone *</Label>
                      <Input placeholder="+244 222 000 000" value={hospitalPhone} onChange={e => setHospitalPhone(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Email *</Label>
                      <Input type="email" placeholder="hospital@email.com" value={hospitalEmail} onChange={e => setHospitalEmail(e.target.value)} required />
                    </div>
                  </div>

                  {/* Section B: Admin Account */}
                  <div className="pt-4 pb-1 border-t">
                    <p className="text-sm font-semibold text-foreground">Conta do Administrador</p>
                    <p className="text-xs text-muted-foreground">Responsável pela gestão da instituição</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nome Completo *</Label>
                    <Input placeholder="Nome do responsável" value={adminName} onChange={e => setAdminName(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Email *</Label>
                      <Input type="email" placeholder="admin@hospital.com" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Telefone *</Label>
                      <Input placeholder="+244 923 000 000" value={adminPhone} onChange={e => setAdminPhone(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Palavra-passe *</Label>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Confirmar Palavra-passe *</Label>
                      <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Patient Form */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Primeiro Nome *</Label>
                      <Input placeholder="Primeiro nome" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Último Nome *</Label>
                      <Input placeholder="Último nome" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Data de Nascimento *</Label>
                      <Input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Género</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Feminino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Nacionalidade</Label>
                      <Input placeholder="Angolana" value={nationality} onChange={e => setNationality(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Nº Identificação (BI/Passaporte)</Label>
                      <Input placeholder="000000000LA000" value={idNumber} onChange={e => setIdNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Telefone *</Label>
                    <Input placeholder="+244 923 000 000" value={phone} onChange={e => setPhone(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Palavra-passe *</Label>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Confirmar *</Label>
                      <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full mt-2">Criar Conta</Button>
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
