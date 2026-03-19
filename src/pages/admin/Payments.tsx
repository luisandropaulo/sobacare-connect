import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { invoices, MockInvoice } from "@/data/mockData";

const columns: Column<MockInvoice>[] = [
  { key: "hospital", header: "Hospital" },
  { key: "plan", header: "Plano" },
  { key: "amount", header: "Valor", render: (row) => `${row.amount.toLocaleString()} Kz` },
  { key: "date", header: "Data" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const PaymentsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Pagamentos</h1>
      <p className="text-muted-foreground">Histórico de pagamentos por hospital</p>
    </div>
    <DataTable data={invoices} columns={columns} searchKey="hospital" searchPlaceholder="Pesquisar pagamentos..." />
  </div>
);

export default PaymentsPage;
