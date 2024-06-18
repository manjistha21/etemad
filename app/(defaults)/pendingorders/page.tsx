import ComponentsDatatablespendingOrders from "@/components/datatables/component-datatables-pending_orders";

import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Document",
};

const Export = () => {
  return (
    <div>
      <ComponentsDatatablespendingOrders />
    </div>
  );
};

export default Export;
