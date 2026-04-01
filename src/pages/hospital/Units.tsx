import { useState } from "react";
import { hospitalUnits, HospitalUnit } from "@/data/hospitalMockData";
import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, AlertCircle, Eye, Building2, MapPin, Phone, Users, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const unitDepartments: Record<string, string[]> = {
  hu1: ["Cardiologia", "Pediatria", "Ortopedia", "Dermatologia", "Neurologia"],
  hu2: ["Pediatria", "Dermatologia"],
  hu3: ["Ortopedia"],
};

const HospitalUnits = () => {
  const navigate = useNavigate();
  const [viewUnit, setViewUnit] = useState<HospitalUnit | null>(null);
  const plan: string = "Professional";
  const maxUnits = plan === "Essential" ? 1 : plan === "Professional" ? 5 : 999;
  const canCreate = hospitalUnits.length < maxUnits;

  const columns: Column<HospitalUnit>[] = [
    { key: "name", header: "Nome", render: (row) => (
      <div className="flex items-center gap-2">
        <button onClick={() => setViewUnit(row)} className="text-primary hover:underline font-medium">{row.name}</button>
        <Badge variant={row.id === "hu1" ? "default" : "outline"} className="text-[10px]">
          {row.id === "hu1" ? "Sede" : "Unidade"}
        </Badge>
      </div>
    )},
    { key: "address", header: "Endereço" },
    { key: "phone", header: "Telefone" },
    { key: "doctors", header: "Médicos" },
    { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
    { key: "id", header: "", render: (row) => (
      <Button variant="ghost" size="sm" onClick={() => setViewUnit(row)}><Eye className="h-4 w-4" /></Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Unidades</h1>
          <p className="text-muted-foreground">Gerir as unidades da instituição. Plano: <strong>{plan}</strong> ({hospitalUnits.length}/{maxUnits} unidades)</p>
          <p className="text-xs text-muted-foreground mt-1">A sede controla a visão global. Unidades têm autonomia operacional.</p>
        </div>
        <Button onClick={() => navigate("/dashboard/admin-hospital/units/create")} disabled={!canCreate}>
          <Plus className="h-4 w-4 mr-2" />Nova Unidade
        </Button>
      </div>

      {!canCreate && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Limite de unidades atingido para o plano {plan}. Faça upgrade para adicionar mais.</AlertDescription>
        </Alert>
      )}

      <DataTable data={hospitalUnits} columns={columns} searchKey="name" />

      {/* Unit Detail Dialog */}
      <Dialog open={!!viewUnit} onOpenChange={open => { if (!open) setViewUnit(null); }}>
        <DialogContent className="max-w-lg">
          {viewUnit && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {viewUnit.name}
                  <Badge variant={viewUnit.id === "hu1" ? "default" : "outline"} className="text-xs">
                    {viewUnit.id === "hu1" ? "Sede" : "Unidade"}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="info" className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="departments">Departamentos</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <div><p className="text-xs text-muted-foreground">Endereço</p><p className="text-sm font-medium">{viewUnit.address}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <div><p className="text-xs text-muted-foreground">Telefone</p><p className="text-sm font-medium">{viewUnit.phone}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="h-4 w-4 text-primary shrink-0" />
                      <div><p className="text-xs text-muted-foreground">Médicos</p><p className="text-sm font-medium">{viewUnit.doctors}</p></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <StatusPill status={viewUnit.status} />
                    </div>
                  </div>
                  {viewUnit.id !== "hu1" && (
                    <div className="p-3 rounded-lg border border-dashed border-muted-foreground/30 text-sm text-muted-foreground">
                      <p>Esta unidade opera com autonomia de gestão, mas depende da <strong>licença principal (Sede)</strong> para funcionalidades completas da plataforma.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="departments" className="mt-3">
                  <div className="space-y-2">
                    {(unitDepartments[viewUnit.id] || []).map(dept => (
                      <div key={dept} className="flex items-center gap-2 p-2 rounded bg-muted/50 text-sm">
                        <Layers className="h-4 w-4 text-primary" />
                        {dept}
                      </div>
                    ))}
                    {!(unitDepartments[viewUnit.id]?.length) && (
                      <p className="text-sm text-muted-foreground text-center py-4">Nenhum departamento associado.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalUnits;
