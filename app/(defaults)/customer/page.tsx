import ComponentsDatatablesExport from "@/components/datatables/components-datatables-export";
import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import React from "react";
import { getPosts } from "@/_actions/postAction";

export const metadata: Metadata = {
  title: "Export Table",
};

const Export = async () => {
  return (
    <div>
      <ComponentsDatatablesExport />
    </div>
  );
};

export default Export;
