import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import AddCustomer from "@/views/dashboard/management/customers/add-customer";
import React from "react";

const page = () => {
  return (
    <DashboardLayoutWrapper pageTitle="Customers">
      <AddCustomer/>
    </DashboardLayoutWrapper>
  );
};

export default page;
