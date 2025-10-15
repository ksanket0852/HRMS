import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminDashboardPage from "./admin/Dashboard";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userEmail="admin@company.com">
      <AdminDashboardPage />
    </DashboardLayout>
  );
};

export default AdminDashboard;
