import { useParams, useNavigate } from "react-router-dom";
import { hospitalPatients, hospitalAppointments, hospitalPrescriptions } from "@/data/hospitalMockData";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { InfoCard } from "@/components/shared/InfoCard";
import { TabsSection } from "@/components/shared/TabsSection";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusPill } from "@/components/shared/StatusPill";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Mail, Phone, Calendar, CalendarPlus, Users, Edit } from "lucide-react";
import { toast } from "sonner";

const HospitalPatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = hospitalPatients.find((p) => p.id === id);

  if (!patient) return <EmptyState title="Paciente não encontrado" />;

  const patAppts = hospitalAppointments.filter((a) => a.patient === patient.name);
  const patPrescriptions = hospitalPrescriptions.filter((p) => p.patient === patient.name);

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={patient.name}
        subtitle={patient.email}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/admin-hospital" },
          { label: "Pacientes", href: "/dashboard/admin-hospital/patients" },
          { label: patient.name },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.info("Página de edição em desenvolvimento")}>
              <Edit className="h-4 w-4 mr-2" />Editar
            </Button>
            <Button onClick={() => toast.info("Agendar consulta")}>
              <CalendarPlus className="h-4 w-4 mr-2" />Agendar
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Visitas" value={patient.totalVisits} icon={Calendar} />
        <StatsCard title="Última Visita" value={patient.lastVisit} icon={Calendar} />
        <StatsCard title="Prescrições" value={patPrescriptions.length} icon={Users} />
      </div>

      <TabsSection
        tabs={[
          {
            value: "info",
            label: "Informações",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InfoCard title="Dados Pessoais" items={[
                  { label: "Email", value: patient.email, icon: Mail },
                  { label: "Telefone", value: patient.phone, icon: Phone },
                  { label: "Data de Nascimento", value: patient.birthDate, icon: Calendar },
                ]} />
              </div>
            ),
          },
          {
            value: "history",
            label: "Histórico",
            content: (
              <div className="mt-4">
                <DataTable
                  data={patAppts}
                  columns={[
                    { key: "doctor", header: "Médico" },
                    { key: "specialty", header: "Especialidade" },
                    { key: "date", header: "Data" },
                    { key: "status", header: "Estado", render: (r) => <StatusPill status={r.status} /> },
                  ]}
                />
              </div>
            ),
          },
          {
            value: "prescriptions",
            label: "Prescrições",
            content: (
              <div className="mt-4">
                {patPrescriptions.length === 0 ? (
                  <EmptyState title="Sem prescrições" />
                ) : (
                  <DataTable
                    data={patPrescriptions}
                    columns={[
                      { key: "doctor", header: "Médico" },
                      { key: "diagnosis", header: "Diagnóstico" },
                      { key: "date", header: "Data" },
                      { key: "status", header: "Estado", render: (r) => <StatusPill status={r.status} /> },
                    ]}
                  />
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default HospitalPatientDetail;
