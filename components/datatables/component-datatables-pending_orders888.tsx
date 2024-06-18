"use client";

import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import sortBy from "lodash/sortBy";

const ComponentsDatatablesPendingOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "_id",
    direction: "asc",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data.orders && Array.isArray(data.orders)) {
          const pendingOrders = data.orders.filter(order => order.status.toLowerCase() === "pending");
          setOrders(pendingOrders); 
        } else {
          console.error("Expected data.orders to be an array, got:", data.orders);
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { accessor: "_id", title: "#id", sortable: true },
    { accessor: "AMLstatus", sortable: true },
    { accessor: "orderdate", sortable: true },
    { accessor: "tags", sortable: true },
    { accessor: "customer", sortable: true },
    { accessor: "status", sortable: true },
    { accessor: "reasonfortransfer", sortable: true },
    { accessor: "foreigncurrency", sortable: true },
    { accessor: "country", sortable: true },
    { accessor: "sourceoffunds", sortable: true },
    { accessor: "quantity", sortable: true },
    { accessor: "commission", sortable: true },
    { accessor: "rate", sortable: true },
  ];

  return (
    <div>
      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={orders} 
          columns={columns}
          totalRecords={orders.length} 
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>
    </div>
  );
};

export default ComponentsDatatablesPendingOrders;
