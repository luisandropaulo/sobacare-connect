import { useState } from "react";
import { patientDocuments } from "@/data/patientMockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Image, Upload } from "lucide-react";
import { toast } from "sonner";

const typeIcons: Record<string, typeof FileText> = { exam: FileText, report: FileText, image: Image, other: FileText };

const PatientDocuments = () => {
  const [open, setOpen] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Documento enviado com sucesso!");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documentos</h1>
          <p className="text-muted-foreground">Os seus exames e relatórios médicos.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Upload className="h-4 w-4 mr-2" />Enviar Documento</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Enviar Documento</DialogTitle></DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2"><Label>Nome</Label><Input placeholder="Nome do documento" required /></div>
              <div className="space-y-2"><Label>Ficheiro</Label><Input type="file" required /></div>
              <Button type="submit" className="w-full">Enviar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-3">
        {patientDocuments.map(doc => {
          const Icon = typeIcons[doc.type] || FileText;
          return (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2"><Icon className="h-5 w-5 text-primary" /></div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.success("Download iniciado")}><Download className="h-4 w-4" /></Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PatientDocuments;
