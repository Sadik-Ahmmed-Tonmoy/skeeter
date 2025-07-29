import DashboardLayout from "@/components/pages/dashboard/DashboardLayout";
import WithAuthForAdmin from "@/components/WithAuthForAdmin/WithAuthForAdmin";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <WithAuthForAdmin>
      <DashboardLayout>{children}</DashboardLayout>
    </WithAuthForAdmin>
  );
};

export default layout;
