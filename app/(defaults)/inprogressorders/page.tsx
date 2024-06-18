import ComponentsDatatablesinprogressOrders from "@/components/datatables/components-datatable-inprogress_orders";

import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Document",
};

const Export = () => {
  return (
    <div>
      <ComponentsDatatablesinprogressOrders />
    </div>
  );
};

export default Export;