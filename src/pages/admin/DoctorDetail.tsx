import { useParams } from "react-router-dom";
import { doctors, appointments } from "@/data/mockData";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { InfoCard } from "@/components/shared/InfoCard";
import { TabsSection } from "@/components/shared/TabsSection";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusPill } from "@/components/shared/StatusPill";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Mail, Phone, Building, Stethoscope, Users, Calendar, Edit } from "lucide-react";
import { toast } from "sonner";

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) return <EmptyState title="Médico não encontrado" description="O médico solicitado não existe." />;

  const doctorAppointments = appointments.filter((a) => a.doctor === doctor.name);

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={doctor.name}
        subtitle={doctor.specialty}
        status={doctor.status}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/master" },
          { label: "Médicos", href: "/admin/master/doctors" },
          { label: doctor.name },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => toast.info("Editar médico")}><Edit className="h-4 w-4 mr-2" />Editar</Button>
            <Button onClick={() => toast.info("Ver agenda")}><Calendar className="h-4 w-4 mr-2" />Ver Agenda</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Pacientes" value={doctor.patients} icon={Users} />
        <StatsCard title="Consultas" value={doctorAppointments.length} icon={Calendar} />
        <StatsCard title="Especialidade" value={doctor.specialty} icon={Stethoscope} />
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
                    { label: "Nome", value: doctor.name, icon: Stethoscope },
                    { label: "Especialidade", value: doctor.specialty, icon: Stethoscope },
                    { label: "Hospital", value: doctor.hospital, icon: Building },
                  ]}
                />
                <InfoCard
                  title="Contacto"
                  items={[
                    { label: "Email", value: `${doctor.name.toLowerCase().replace(/\s|dr\.\s?|dra\.\s?/gi, "")}@hospital.ao`, icon: Mail },
                    { label: "Telefone", value: "+244 912 100 001", icon: Phone },
                  ]}
                />
              </div>
            ),
          },
          {
            value: "appointments",
            label: "Consultas",
            content: (
              <div className="mt-4">
                <DataTable
                  data={doctorAppointments}
                  columns={[
                    { key: "patient", header: "Paciente" },
                    { key: "date", header: "Data" },
                    { key: "time", header: "Hora" },
                    { key: "status", header: "Estado", render: (r) => <StatusPill status={r.status} /> },
                  ]}
                />
              </div>
            ),
          },
          {
            value: "patients",
            label: "Pacientes",
            content: (
              <div className="mt-4">
                <EmptyState title="Lista de pacientes" description="Funcionalidade disponível com integração de API." />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default DoctorDetail;
