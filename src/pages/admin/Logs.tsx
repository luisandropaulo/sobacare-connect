import { DataTable, Column } from "@/components/shared/DataTable";
import { logs, MockLog } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const typeBadge: Record<MockLog["type"], string> = {
  error: "bg-destructive/10 text-destructive",
  access: "bg-primary/10 text-primary",
  api: "bg-success/10 text-success",
};

const columns: Column<MockLog>[] = [
  { key: "type", header: "Tipo", render: (row) => <Badge className={typeBadge[row.type]} variant="outline">{row.type.toUpperCase()}</Badge> },
  { key: "message", header: "Mensagem", render: (row) => <code className="text-xs">{row.message}</code> },
  { key: "source", header: "Fonte" },
  { key: "timestamp", header: "Data/Hora" },
];

const LogsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Logs do Sistema</h1>
      <p className="text-muted-foreground">Logs de erros, acesso e chamadas API</p>
    </div>
    <DataTable data={logs} columns={columns} searchKey="message" searchPlaceholder="Pesquisar logs..." pageSize={10} />
  </div>
);

export default LogsPage;
