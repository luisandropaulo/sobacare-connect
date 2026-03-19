import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { tickets, MockTicket } from "@/data/mockData";

const columns: Column<MockTicket>[] = [
  { key: "id", header: "ID" },
  { key: "subject", header: "Assunto" },
  { key: "hospital", header: "Hospital" },
  { key: "priority", header: "Prioridade", render: (row) => <StatusPill status={row.priority} /> },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
  { key: "createdAt", header: "Criado em" },
];

const SupportPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Suporte / Tickets</h1>
      <p className="text-muted-foreground">Gestão de tickets de suporte</p>
    </div>
    <DataTable data={tickets} columns={columns} searchKey="subject" searchPlaceholder="Pesquisar tickets..." />
  </div>
);

export default SupportPage;
