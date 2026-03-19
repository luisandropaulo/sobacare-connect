import { useParams } from "react-router-dom";
import { hospitalDoctors, hospitalAppointments } from "@/data/hospitalMockData";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { InfoCard } from "@/components/shared/InfoCard";
import { TabsSection } from "@/components/shared/TabsSection";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusPill } from "@/components/shared/StatusPill";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Mail, Phone, Stethoscope, Users, Calendar, Edit } from "lucide-react";
import { toast } from "sonner";

const HospitalDoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = hospitalDoctors.find((d) => d.id === id);

  if (!doctor) return <EmptyState title="Médico não encontrado" />;

  const docAppointments = hospitalAppointments.filter((a) => a.doctor === doctor.name);

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={doctor.name}
        subtitle={doctor.specialty}
        status={doctor.status}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/admin-hospital" },
          { label: "Médicos", href: "/dashboard/admin-hospital/doctors" },
          { label: doctor.name },
        ]}
        actions={
          <Button variant="outline" onClick={() => toast.info("Editar")}><Edit className="h-4 w-4 mr-2" />Editar</Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Pacientes" value={doctor.patients} icon={Users} />
        <StatsCard title="Consultas" value={doctor.consultations} icon={Calendar} />
        <StatsCard title="Especialidade" value={doctor.specialty} icon={Stethoscope} />
      </div>

      <TabsSection
        tabs={[
          {
            value: "info",
            label: "Informações",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InfoCard title="Contacto" items={[
                  { label: "Email", value: doctor.email, icon: Mail },
                  { label: "Telefone", value: doctor.phone, icon: Phone },
                ]} />
              </div>
            ),
          },
          {
            value: "appointments",
            label: "Consultas",
            content: (
              <div className="mt-4">
                <DataTable
                  data={docAppointments}
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
        ]}
      />
    </div>
  );
};

export default HospitalDoctorDetail;
