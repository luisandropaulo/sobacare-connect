import { useParams, useNavigate } from "react-router-dom";
import { hospitals, doctors, patients } from "@/data/mockData";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { InfoCard } from "@/components/shared/InfoCard";
import { TabsSection } from "@/components/shared/TabsSection";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusPill } from "@/components/shared/StatusPill";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MapPin, Building, Users, Stethoscope, CreditCard, Edit, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hospital = hospitals.find((h) => h.id === id);

  if (!hospital) return <EmptyState title="Hospital não encontrado" description="O hospital solicitado não existe." />;

  const hospitalDoctors = doctors.filter((d) => d.hospital === hospital.name);

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={hospital.name}
        subtitle={hospital.location}
        status={hospital.status}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/master" },
          { label: "Hospitais", href: "/admin/master/hospitals" },
          { label: hospital.name },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.info("Página de edição em desenvolvimento")}><Edit className="h-4 w-4 mr-2" />Editar</Button>
            <Button onClick={() => toast.info("Ver estatísticas")}><BarChart3 className="h-4 w-4 mr-2" />Estatísticas</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Médicos" value={hospital.doctors} icon={Stethoscope} />
        <StatsCard title="Pacientes" value={hospital.patients} icon={Users} />
        <StatsCard title="Plano" value={hospital.plan} icon={CreditCard} />
        <StatsCard title="Localização" value={hospital.location} icon={MapPin} />
      </div>

      <TabsSection
        tabs={[
          {
            value: "info",
            label: "Informações",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InfoCard title="Dados da Instituição" items={[
                  { label: "Nome", value: hospital.name, icon: Building },
                  { label: "Localização", value: hospital.location, icon: MapPin },
                  { label: "Plano", value: <Badge variant="outline">{hospital.plan}</Badge>, icon: CreditCard },
                ]} />
                <InfoCard title="Estatísticas" items={[
                  { label: "Médicos", value: hospital.doctors, icon: Stethoscope },
                  { label: "Pacientes", value: hospital.patients, icon: Users },
                ]} />
              </div>
            ),
          },
          {
            value: "doctors",
            label: "Médicos",
            content: (
              <div className="mt-4">
                <DataTable data={hospitalDoctors} columns={[
                  { key: "name", header: "Nome" },
                  { key: "specialty", header: "Especialidade" },
                  { key: "patients", header: "Pacientes" },
                  { key: "status", header: "Estado", render: (r) => <StatusPill status={r.status} /> },
                ]} searchKey="name" />
              </div>
            ),
          },
          {
            value: "patients",
            label: "Pacientes",
            content: (
              <div className="mt-4">
                <EmptyState title="Lista de pacientes" description="Visualização de pacientes por hospital disponível com API." />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default HospitalDetail;
