import ComponentsDatatablesOrders from "@/components/datatables/components-datatables-orders";

import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Document",
};

const Export = () => {
  return (
    <div>
      <ComponentsDatatablesOrders />
    </div>
  );
};

export default Export;
