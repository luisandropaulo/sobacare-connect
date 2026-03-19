import { useParams } from "react-router-dom";
import { patients, appointments } from "@/data/mockData";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { InfoCard } from "@/components/shared/InfoCard";
import { TabsSection } from "@/components/shared/TabsSection";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusPill } from "@/components/shared/StatusPill";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Mail, Phone, Calendar, FileText, Users, Edit, CalendarPlus } from "lucide-react";
import { toast } from "sonner";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patient = patients.find((p) => p.id === id);

  if (!patient) return <EmptyState title="Paciente não encontrado" description="O paciente solicitado não existe." />;

  const patientAppointments = appointments.filter((a) => a.patient === patient.name);

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={patient.name}
        subtitle={patient.email}
        status={patient.status}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/master" },
          { label: "Pacientes", href: "/admin/master/patients" },
          { label: patient.name },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.info("Editar paciente")}><Edit className="h-4 w-4 mr-2" />Editar</Button>
            <Button onClick={() => toast.info("Agendar consulta")}><CalendarPlus className="h-4 w-4 mr-2" />Agendar Consulta</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Consultas" value={patientAppointments.length} icon={Calendar} />
        <StatsCard title="Última Visita" value={patient.lastVisit} icon={Calendar} />
        <StatsCard title="Documentos" value={0} icon={FileText} />
      </div>

      <TabsSection
        tabs={[
          {
            value: "info",
            label: "Informações",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InfoCard
                  title="Dados Pessoais"
                  items={[
                    { label: "Nome", value: patient.name, icon: Users },
                    { label: "Email", value: patient.email, icon: Mail },
                    { label: "Telefone", value: patient.phone, icon: Phone },
                    { label: "Última Visita", value: patient.lastVisit, icon: Calendar },
                  ]}
                />
              </div>
            ),
          },
          {
            value: "history",
            label: "Histórico",
            content: (
              <div className="mt-4">
                <DataTable
                  data={patientAppointments}
                  columns={[
                    { key: "doctor", header: "Médico" },
                    { key: "specialty", header: "Especialidade" },
                    { key: "date", header: "Data" },
                    { key: "time", header: "Hora" },
                    { key: "status", header: "Estado", render: (r) => <StatusPill status={r.status} /> },
                  ]}
                />
              </div>
            ),
          },
          {
            value: "documents",
            label: "Documentos",
            content: (
              <div className="mt-4">
                <EmptyState title="Sem documentos" description="Nenhum documento disponível para este paciente." />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PatientDetail;
