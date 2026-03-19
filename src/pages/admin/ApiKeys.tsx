import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { apiKeys, MockApiKey } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const columns: Column<MockApiKey>[] = [
  { key: "name", header: "Nome" },
  {
    key: "key", header: "Chave", render: (row) => (
      <div className="flex items-center gap-2">
        <code className="text-xs bg-muted px-2 py-1 rounded">{row.key}</code>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { navigator.clipboard.writeText(row.key); toast.success("Chave copiada!"); }}>
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    ),
  },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
  { key: "createdAt", header: "Criado" },
  { key: "lastUsed", header: "Último uso" },
];

const ApiKeysPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">Gestão de chaves de acesso à API</p>
      </div>
      <Button>Nova Chave</Button>
    </div>
    <DataTable data={apiKeys} columns={columns} searchKey="name" searchPlaceholder="Pesquisar chaves..." />
  </div>
);

export default ApiKeysPage;
