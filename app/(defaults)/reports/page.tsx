import CombinedDataTable from "@/components/datatables/components-datatables-reports";
import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rate",
};

const Export = () => {
  return (
    <div>
      <CombinedDataTable />
    </div>
  );
};

export default Export;
