import ComponentsDatatablesRate from "@/components/datatables/components-datatables-rate";
import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Rate",
};

const Export = () => {
  return (
    <div>
      <ComponentsDatatablesRate />
    </div>
  );
};

export default Export;
