import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { invoices, MockInvoice } from "@/data/mockData";
import { StatsCard } from "@/components/shared/StatsCard";
import { CreditCard, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const columns: Column<MockInvoice>[] = [
  { key: "hospital", header: "Hospital" },
  { key: "plan", header: "Plano" },
  { key: "amount", header: "Valor", render: (row) => `${row.amount.toLocaleString()} Kz` },
  { key: "date", header: "Data" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
];

const BillingPage = () => {
  const totalRevenue = invoices.reduce((sum, i) => sum + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "paid").length;
  const pending = invoices.filter((i) => i.status === "pending").length;
  const overdue = invoices.filter((i) => i.status === "overdue").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Faturação</h1>
        <p className="text-muted-foreground">Resumo de faturação e faturas</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Receita Total" value={`${(totalRevenue / 1000).toLocaleString()}K Kz`} icon={CreditCard} />
        <StatsCard title="Pagas" value={paid} icon={CheckCircle} changeType="positive" change="Em dia" />
        <StatsCard title="Pendentes" value={pending} icon={Clock} changeType="neutral" change="Aguardando" />
        <StatsCard title="Atrasadas" value={overdue} icon={AlertTriangle} changeType="negative" change="Requer ação" />
      </div>
      <DataTable data={invoices} columns={columns} searchKey="hospital" searchPlaceholder="Pesquisar faturas..." />
    </div>
  );
};

export default BillingPage;
