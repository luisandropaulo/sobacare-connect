import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HospitalSidebar } from "@/components/hospital/HospitalSidebar";
import { HospitalHeader } from "@/components/hospital/HospitalHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const HospitalLayout = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "hospital") return <Navigate to="/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <HospitalSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <HospitalHeader />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HospitalLayout;
