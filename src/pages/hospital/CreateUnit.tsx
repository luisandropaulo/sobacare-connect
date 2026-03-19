import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CreateUnit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [responsible, setResponsible] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Unidade "${name}" criada com sucesso!`);
    navigate("/dashboard/admin-hospital/units");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-bold">Nova Unidade</h1>
          <p className="text-muted-foreground">Adicionar uma nova unidade hospitalar.</p>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label>Nome da Unidade</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Endereço</Label><Input value={address} onChange={e => setAddress(e.target.value)} required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Telefone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} required /></div>
              <div className="space-y-2"><Label>Responsável</Label><Input value={responsible} onChange={e => setResponsible(e.target.value)} required /></div>
            </div>
            <Button type="submit" className="w-full">Criar Unidade</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUnit;
