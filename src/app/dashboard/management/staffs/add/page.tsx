import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import AddStaff from "@/views/dashboard/management/staffs/add-staff";
import React from "react";

const page = () => {
  return (
    <DashboardLayoutWrapper pageTitle="Add Team Member">
      <AddStaff/>
    </DashboardLayoutWrapper>
  );
};

export default page;
 