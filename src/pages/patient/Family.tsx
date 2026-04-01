import { useState } from "react";
import { familyMembers, FamilyMember } from "@/data/patientMockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusPill } from "@/components/shared/StatusPill";
import { Plus, Users, Trash2, Eye, CalendarPlus, ShieldCheck, AlertCircle, Droplets, Phone, UserCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PatientFamily = () => {
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = useState(false);
  const [viewMember, setViewMember] = useState<FamilyMember | null>(null);
  const [addStep, setAddStep] = useState<"question" | "registered" | "new">("question");

  const openAdd = () => { setAddStep("question"); setAddOpen(true); };

  const handleAddRegistered = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Convite enviado ao familiar! Será vinculado após confirmação.");
    setAddOpen(false);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Convite de registo enviado! Após o registo, será automaticamente vinculado.");
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Família</h1>
          <p className="text-muted-foreground">Gerir familiares associados à sua conta.</p>
        </div>
        <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Adicionar Familiar</Button>
      </div>

      {/* Add Family Member Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {addStep === "question" && "Adicionar Familiar"}
              {addStep === "registered" && "Vincular Familiar Registado"}
              {addStep === "new" && "Registar Novo Familiar"}
            </DialogTitle>
          </DialogHeader>

          {addStep === "question" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Este familiar já está registado na plataforma SobaCare?</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => setAddStep("registered")}>
                  <UserCheck className="h-6 w-6 text-primary" />
                  <span className="font-medium">Sim, já tem conta</span>
                  <span className="text-xs text-muted-foreground">Enviar convite de vínculo</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => setAddStep("new")}>
                  <UserPlus className="h-6 w-6 text-primary" />
                  <span className="font-medium">Não, é novo</span>
                  <span className="text-xs text-muted-foreground">Convidar para registar-se</span>
                </Button>
              </div>
            </div>
          )}

          {addStep === "registered" && (
            <form onSubmit={handleAddRegistered} className="space-y-4">
              <p className="text-xs text-muted-foreground">Indique os dados do familiar para enviar um convite de vinculação.</p>
              <div className="space-y-2"><Label>Nome Completo</Label><Input placeholder="Nome do familiar" required /></div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@exemplo.com" required /></div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setAddStep("question")}>Voltar</Button>
                <Button type="submit" className="flex-1">Enviar Convite</Button>
              </div>
            </form>
          )}

          {addStep === "new" && (
            <form onSubmit={handleAddNew} className="space-y-4">
              <p className="text-xs text-muted-foreground">Preencha os dados para convidar o familiar a registar-se na plataforma.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Primeiro Nome</Label><Input placeholder="Nome" required /></div>
                <div className="space-y-2"><Label>Último Nome</Label><Input placeholder="Apelido" required /></div>
              </div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@exemplo.com" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Parentesco</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                    <SelectContent>
                      {["Pai","Mãe","Filho(a)","Cônjuge","Irmão(ã)","Outro"].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Telefone</Label><Input placeholder="+244 9XX XXX XXX" /></div>
              </div>
              <div className="space-y-2"><Label>Alergias (opcional)</Label><Input placeholder="Ex: Penicilina, Pólen" /></div>
              <div className="space-y-2"><Label>Condições Crónicas (opcional)</Label><Input placeholder="Ex: Diabetes, Asma" /></div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setAddStep("question")}>Voltar</Button>
                <Button type="submit" className="flex-1">Enviar Convite</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">Conta Principal (Titular)</p>
            <p className="text-xs text-muted-foreground">Tem controlo administrativo total sobre os perfis familiares, incluindo informações de contacto e métodos de pagamento.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {familyMembers.map(fm => (
          <Card key={fm.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2"><Users className="h-5 w-5 text-primary" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{fm.name}</p>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{fm.relationship}</Badge>
                    {fm.bloodGroup && <Badge variant="secondary" className="text-[10px] px-1.5 py-0"><Droplets className="h-3 w-3 mr-0.5" />{fm.bloodGroup}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{fm.email} • {fm.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => setViewMember(fm)}><Eye className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/patient/appointments/create")}><CalendarPlus className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => toast.info("Familiar removido")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Member Dialog */}
      <Dialog open={!!viewMember} onOpenChange={open => { if (!open) setViewMember(null); }}>
        <DialogContent className="max-w-lg">
          {viewMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {viewMember.name}
                  <Badge variant="outline">{viewMember.relationship}</Badge>
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="info" className="mt-2">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="health">Saúde</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                  <TabsTrigger value="appointments">Consultas</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-3 mt-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Primeiro Nome</p><p className="font-medium">{viewMember.firstName}</p></div>
                    <div><p className="text-muted-foreground text-xs">Último Nome</p><p className="font-medium">{viewMember.lastName}</p></div>
                    <div><p className="text-muted-foreground text-xs">Data de Nascimento</p><p className="font-medium">{viewMember.dob}</p></div>
                    <div><p className="text-muted-foreground text-xs">Género</p><p className="font-medium">{viewMember.gender}</p></div>
                    <div><p className="text-muted-foreground text-xs">Email</p><p className="font-medium">{viewMember.email}</p></div>
                    <div><p className="text-muted-foreground text-xs">Telefone</p><p className="font-medium">{viewMember.phone}</p></div>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-3 mt-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-destructive" />
                    <div><p className="text-muted-foreground text-xs">Grupo Sanguíneo</p><p className="font-medium text-sm">{viewMember.bloodGroup || "Não informado"}</p></div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Alergias</p>
                    {viewMember.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-1">{viewMember.allergies.map((a, i) => <Badge key={i} variant="destructive" className="text-xs">{a}</Badge>)}</div>
                    ) : <p className="text-sm text-muted-foreground">Nenhuma alergia registada</p>}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Condições Crónicas</p>
                    {viewMember.chronicConditions.length > 0 ? (
                      <div className="flex flex-wrap gap-1">{viewMember.chronicConditions.map((c, i) => <Badge key={i} variant="secondary" className="text-xs">{c}</Badge>)}</div>
                    ) : <p className="text-sm text-muted-foreground">Nenhuma condição registada</p>}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contacto de Emergência</p>
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="font-medium">{viewMember.emergencyContact.name}</p>
                        <p className="text-xs text-muted-foreground">{viewMember.emergencyContact.phone} • {viewMember.emergencyContact.relationship}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-3">
                  {viewMember.medicalHistory.length > 0 ? (
                    <div className="space-y-2">
                      {viewMember.medicalHistory.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm">
                          <AlertCircle className="h-4 w-4 text-warning shrink-0" />{h}
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground text-center py-4">Sem histórico médico registado.</p>}
                </TabsContent>

                <TabsContent value="appointments" className="mt-3">
                  {viewMember.appointments.length > 0 ? (
                    <div className="space-y-2">
                      {viewMember.appointments.map((a, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                          <div>
                            <p className="font-medium">{a.doctor}</p>
                            <p className="text-xs text-muted-foreground">{a.specialty} • {a.date}</p>
                          </div>
                          <StatusPill status={a.status as any} />
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground text-center py-4">Sem consultas agendadas.</p>}
                  <Button className="w-full mt-3" variant="outline" onClick={() => { setViewMember(null); navigate("/dashboard/patient/appointments/create"); }}>
                    <CalendarPlus className="h-4 w-4 mr-2" />Agendar Consulta para {viewMember.firstName}
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientFamily;
