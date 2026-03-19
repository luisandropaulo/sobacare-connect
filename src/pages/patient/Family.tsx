import { useState } from "react";
import { familyMembers } from "@/data/patientMockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PatientFamily = () => {
  const [open, setOpen] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Familiar adicionado com sucesso!");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Família</h1>
          <p className="text-muted-foreground">Gerir familiares associados à sua conta.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Adicionar Familiar</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Adicionar Familiar</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2"><Label>Email do familiar</Label><Input type="email" placeholder="email@exemplo.com" required /></div>
              <div className="space-y-2">
                <Label>Parentesco</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                  <SelectContent>
                    {["Pai", "Mãe", "Filho(a)", "Cônjuge", "Irmão(ã)", "Outro"].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Adicionar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-3">
        {familyMembers.map(fm => (
          <Card key={fm.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2"><Users className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="font-medium text-sm">{fm.name}</p>
                  <p className="text-xs text-muted-foreground">{fm.relationship} • {fm.email} • {fm.phone}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => toast.info("Familiar removido")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientFamily;
