import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hospitals } from "@/data/mockData";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const PatientSupport = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso!");
      setSubject("");
      setMessage("");
      setTarget("");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Suporte & Contacto</h1>
        <p className="text-muted-foreground">Envie uma mensagem para uma clínica ou para a equipa SobaCare.</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />Enviar Mensagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Destinatário</Label>
                <Select value={target} onValueChange={setTarget}>
                  <SelectTrigger><SelectValue placeholder="Selecionar destinatário" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform">Equipa SobaCare (Suporte)</SelectItem>
                    {hospitals.filter(h => h.status === "active").map(h => (
                      <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assunto *</Label>
                <Input placeholder="Ex: Pedido de informação sobre consulta" value={subject} onChange={e => setSubject(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Mensagem *</Label>
                <Textarea placeholder="Escreva a sua mensagem..." className="min-h-[120px]" value={message} onChange={e => setMessage(e.target.value)} required />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                <Send className="h-4 w-4 mr-2" />{loading ? "A enviar..." : "Enviar Mensagem"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientSupport;
