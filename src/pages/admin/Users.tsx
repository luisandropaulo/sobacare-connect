import { DataTable, Column } from "@/components/shared/DataTable";
import { StatusPill } from "@/components/shared/StatusPill";
import { users, MockUser } from "@/data/mockData";

const columns: Column<MockUser>[] = [
  { key: "name", header: "Nome" },
  { key: "email", header: "Email" },
  { key: "role", header: "Perfil" },
  { key: "status", header: "Estado", render: (row) => <StatusPill status={row.status} /> },
  { key: "createdAt", header: "Criado em" },
];

const UsersPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Utilizadores</h1>
      <p className="text-muted-foreground">Gestão de todos os utilizadores da plataforma</p>
    </div>
    <DataTable data={users} columns={columns} searchKey="name" searchPlaceholder="Pesquisar utilizadores..." />
  </div>
);

export default UsersPage;
