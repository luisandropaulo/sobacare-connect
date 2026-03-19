import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { webhooks, MockWebhook } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const columns: Column<MockWebhook>[] = [
  { key: "url", header: "URL", render: (row) => <code className="text-xs bg-muted px-2 py-1 rounded break-all">{row.url}</code> },
  { key: "events", header: "Eventos", render: (row) => <div className="flex flex-wrap gap-1">{row.events.map((e) => <Badge key={e} variant="outline" className="text-[10px]">{e}</Badge>)}</div> },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
  { key: "lastTriggered", header: "Último trigger" },
];

const WebhooksPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Webhooks</h1>
        <p className="text-muted-foreground">Endpoints configurados para eventos</p>
      </div>
      <Button>Novo Webhook</Button>
    </div>
    <DataTable data={webhooks} columns={columns} searchKey="url" searchPlaceholder="Pesquisar webhooks..." />
  </div>
);

export default WebhooksPage;
