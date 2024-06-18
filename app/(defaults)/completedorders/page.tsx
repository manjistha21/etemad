import ComponentsDatatablesCompletedOrders from "@/components/datatables/component-datatable-completed_orders";

import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Document",
};

const Export = () => {
  return (
    <div>
      <ComponentsDatatablesCompletedOrders />
    </div>
  );
};

export default Export;