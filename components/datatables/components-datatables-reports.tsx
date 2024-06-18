"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState, Fragment } from "react";
import sortBy from "lodash/sortBy";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconFile from "@/components/icon/icon-file";
import IconPrinter from "@/components/icon/icon-printer";
import IconXCircle from "@/components/icon/icon-x-circle";
import IconPencil from "@/components/icon/icon-pencil";

const MySwal = withReactContent(Swal);

const CombinedDataTable = () => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reason, setReason] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "_id",
    direction: "asc",
  });

  const reasons = [
    "gift",
    "shopping",
    "professional fee",
    "cost for student",
    "Family support",
    "loan repayment",
    "commission",
    "deposit for land purpose",
    "set up business",
    "Buy property",
    "a loan to buy house",
    "selling own property",
    "consulting fee",
    "wedding",
    "freelancer",
    "donation to pay a teacher",
    "donation to school",
    "family gift",
    "personal",
  ];

  const fetchCustomerData = async () => {
    try {
      const response = await fetch("/api/customer");
      if (!response.ok) throw new Error("Failed to fetch customer data");
      const data = await response.json();
      setCustomerData(data.customer);
    } catch (error) {
      setError(error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch("/api/order");
      if (!response.ok) throw new Error("Failed to fetch order data");
      const data = await response.json();
      setOrderData(data.orders);
    } catch (error) {
      setError(error);
    }
  };

  const fetchDocumentData = async () => {
    try {
      const response = await fetch("/api/document");
      if (!response.ok) throw new Error("Failed to fetch document data");
      const data = await response.json();
      setDocumentData(data.documents);
    } catch (error) {
      setError(error);
    }
  };

  const mergeData = () => {
    let merged = [];
    customerData.forEach((customer) => {
      const orders = orderData.filter(
        (order) => order.customer === customer._id
      );
      const documents = documentData.filter(
        (doc) => doc.customerid === customer._id
      );
      const maxLength = Math.max(orders.length, documents.length);
      for (let i = 0; i < maxLength; i++) {
        merged.push({
          ...customer,
          order: orders[i] || {},
          document: documents[i] || {},
        });
      }
    });
    setCombinedData(merged);
    setFilteredData(merged);
  };

  useEffect(() => {
    fetchCustomerData();
    fetchOrderData();
    fetchDocumentData();
  }, []);

  useEffect(() => {
    if (customerData.length && orderData.length && documentData.length) {
      mergeData();
      setLoading(false);
    }
  }, [customerData, orderData, documentData]);

  useEffect(() => {
    const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
    setFilteredData(
      sortStatus.direction === "desc" ? sortedData.reverse() : sortedData
    );
    setPage(1);
  }, [sortStatus]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setFilteredData((prevData) => [...prevData.slice(from, to)]);
  }, [page, pageSize]);

  const handleFilter = () => {
    let filtered = combinedData;

    if (fromDate && toDate) {
      filtered = filtered.filter((item) => {
        const orderDate = new Date(item.order.orderdate);
        return orderDate >= fromDate && orderDate <= toDate;
      });
    }

    if (status.length) {
      filtered = filtered.filter((item) => status.includes(item.order.status));
    }

    if (reason) {
      filtered = filtered.filter(
        (item) => item.order.reasonfortransfer === reason
      );
    }

    if (search) {
      filtered = filtered.filter((item) =>
        item.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setStatus([]);
    setReason("");
    setSearch("");
    setFilteredData(combinedData);
  };

  const exportTable = (type) => {
    let columns = [
      "Customer ID",
      "First Name",
      "Middle Name",
      "Last Name",
      "DOB",
      "Country Of Birth",
      "Nationality",
      "Email",
      "Occupation",
      "Country",
      "State",
      "City",
      "Address",
      "ZIP",
      "Mobile",
      "Comment",
      "Order ID",
      "Order Date",
      "Tags",
      "Reason for Transfer",
      "Foreign Currency",
      "Order Country",
      "Source of Funds",
      "Quantity",
      "Commission",
      "Rate",
      "Document ID",
      "Document Name",
      "Document Type",
      "Document Status",
      "Validation Source",
      "Number",
      "Issue",
      "Document State",
      "Card Number",
      "Description",
    ];
    let records = combinedData;
    let filename = "table";
    let newVariable = window.navigator;

    if (type === "csv") {
      let coldelimiter = ";";
      let linedelimiter = "\n";
      let result = columns.map((d) => capitalize(d)).join(coldelimiter);
      result += linedelimiter;
      records.map((item) => {
        result += `${item._id}${coldelimiter}${item.firstName}${coldelimiter}${
          item.middleName
        }${coldelimiter}${item.lastName}${coldelimiter}${
          item.dob
        }${coldelimiter}${item.countryOfBirth}${coldelimiter}${
          item.nationality
        }${coldelimiter}${item.email}${coldelimiter}${
          item.occupation
        }${coldelimiter}${item.country}${coldelimiter}${
          item.state
        }${coldelimiter}${item.city}${coldelimiter}${
          item.address
        }${coldelimiter}${item.zip}${coldelimiter}${
          item.mobile
        }${coldelimiter}${item.comment}${coldelimiter}${
          item.order._id || ""
        }${coldelimiter}${item.order.orderdate || ""}${coldelimiter}${
          item.order.tags || ""
        }${coldelimiter}${item.order.reasonfortransfer || ""}${coldelimiter}${
          item.order.foreigncurrency || ""
        }${coldelimiter}${item.order.country || ""}${coldelimiter}${
          item.order.sourceoffunds || ""
        }${coldelimiter}${item.order.quantity || ""}${coldelimiter}${
          item.order.commission || ""
        }${coldelimiter}${item.order.rate || ""}${coldelimiter}${
          item.document._id || ""
        }${coldelimiter}${item.document.documentname || ""}${coldelimiter}${
          item.document.documenttype || ""
        }${coldelimiter}${item.document.documentstatus || ""}${coldelimiter}${
          item.document.validationsource || ""
        }${coldelimiter}${item.document.number || ""}${coldelimiter}${
          item.document.issue || ""
        }${coldelimiter}${item.document.state || ""}${coldelimiter}${
          item.document.cardnumber || ""
        }${coldelimiter}${item.document.description || ""}${linedelimiter}`;
      });

      if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
        var data =
          "data:application/csv;charset=utf-8," + encodeURIComponent(result);
        var link = document.createElement("a");
        link.setAttribute("href", data);
        link.setAttribute("download", filename + ".csv");
        link.click();
      } else {
        var blob = new Blob([result]);
        if (newVariable.msSaveOrOpenBlob)
          newVariable.msSaveBlob(blob, filename + ".csv");
      }
    } else if (type === "print") {
      var rowhtml = "<p>" + filename + "</p>";
      rowhtml +=
        '<table style="width: 100%;" cellpadding="0" cellspacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">';
      columns.map((d) => (rowhtml += "<th>" + capitalize(d) + "</th>"));
      rowhtml += "</tr></thead><tbody>";
      records.map((item) => {
        rowhtml += "<tr>";
        rowhtml += `<td>${item._id}</td><td>${item.firstName}</td><td>${
          item.middleName
        }</td><td>${item.lastName}</td><td>${item.dob}</td><td>${
          item.countryOfBirth
        }</td><td>${item.nationality}</td><td>${item.email}</td><td>${
          item.occupation
        }</td><td>${item.country}</td><td>${item.state}</td><td>${
          item.city
        }</td><td>${item.address}</td><td>${item.zip}</td><td>${
          item.mobile
        }</td><td>${item.comment}</td><td>${item.order._id || ""}</td><td>${
          item.order.orderdate || ""
        }</td><td>${item.order.tags || ""}</td><td>${
          item.order.reasonfortransfer || ""
        }</td><td>${item.order.foreigncurrency || ""}</td><td>${
          item.order.country || ""
        }</td><td>${item.order.sourceoffunds || ""}</td><td>${
          item.order.quantity || ""
        }</td><td>${item.order.commission || ""}</td><td>${
          item.order.rate || ""
        }</td><td>${item.document._id || ""}</td><td>${
          item.document.documentname || ""
        }</td><td>${item.document.documenttype || ""}</td><td>${
          item.document.documentstatus || ""
        }</td><td>${item.document.validationsource || ""}</td><td>${
          item.document.number || ""
        }</td><td>${item.document.issue || ""}</td><td>${
          item.document.state || ""
        }</td><td>${item.document.cardnumber || ""}</td><td>${
          item.document.description || ""
        }</td>`;
        rowhtml += "</tr>";
      });
      rowhtml +=
        "<style>body {font-family: Arial; color: #495057;} p {text-align: center; font-size: 18px; font-weight: bold; margin: 15px;} table { border-collapse: collapse; border-spacing: 0;} th, td {font-size: 12px; text-align: left; padding: 4px;} th {padding: 8px 4px;} tr:nth-child(2n-1) {background: #f7f7f7;}</style>";
      rowhtml += "</tbody></table>";
      var winPrint = window.open(
        "",
        "",
        "left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0"
      );
      winPrint.document.write("<title>Print</title>" + rowhtml);
      winPrint.document.close();
      winPrint.focus();
      winPrint.print();
    } else if (type === "txt") {
      let coldelimiter = ",";
      let linedelimiter = "\n";
      let result = columns.map((d) => capitalize(d)).join(coldelimiter);
      result += linedelimiter;
      records.map((item) => {
        result += `${item._id}${coldelimiter}${item.firstName}${coldelimiter}${
          item.middleName
        }${coldelimiter}${item.lastName}${coldelimiter}${
          item.dob
        }${coldelimiter}${item.countryOfBirth}${coldelimiter}${
          item.nationality
        }${coldelimiter}${item.email}${coldelimiter}${
          item.occupation
        }${coldelimiter}${item.country}${coldelimiter}${
          item.state
        }${coldelimiter}${item.city}${coldelimiter}${
          item.address
        }${coldelimiter}${item.zip}${coldelimiter}${
          item.mobile
        }${coldelimiter}${item.comment}${coldelimiter}${
          item.order._id || ""
        }${coldelimiter}${item.order.orderdate || ""}${coldelimiter}${
          item.order.tags || ""
        }${coldelimiter}${item.order.reasonfortransfer || ""}${coldelimiter}${
          item.order.foreigncurrency || ""
        }${coldelimiter}${item.order.country || ""}${coldelimiter}${
          item.order.sourceoffunds || ""
        }${coldelimiter}${item.order.quantity || ""}${coldelimiter}${
          item.order.commission || ""
        }${coldelimiter}${item.order.rate || ""}${coldelimiter}${
          item.document._id || ""
        }${coldelimiter}${item.document.documentname || ""}${coldelimiter}${
          item.document.documenttype || ""
        }${coldelimiter}${item.document.documentstatus || ""}${coldelimiter}${
          item.document.validationsource || ""
        }${coldelimiter}${item.document.number || ""}${coldelimiter}${
          item.document.issue || ""
        }${coldelimiter}${item.document.state || ""}${coldelimiter}${
          item.document.cardnumber || ""
        }${coldelimiter}${item.document.description || ""}${linedelimiter}`;
      });

      if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
        var data1 =
          "data:application/txt;charset=utf-8," + encodeURIComponent(result);
        var link1 = document.createElement("a");
        link1.setAttribute("href", data1);
        link1.setAttribute("download", filename + ".txt");
        link1.click();
      } else {
        var blob1 = new Blob([result]);
        if (newVariable.msSaveOrOpenBlob)
          newVariable.msSaveBlob(blob1, filename + ".txt");
      }
    }
  };

  const capitalize = (text) => {
    return text
      .replace("_", " ")
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
        Combined Data
      </h5>
      <div className="mb-4.5 flex flex-wrap justify-between gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => exportTable("csv")}
            className="btn btn-primary btn-sm"
          >
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            CSV
          </button>
          <button
            type="button"
            onClick={() => exportTable("txt")}
            className="btn btn-primary btn-sm"
          >
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            TXT
          </button>
          <button
            type="button"
            onClick={() => exportTable("print")}
            className="btn btn-primary btn-sm"
          >
            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
            PRINT
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            className="form-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded border p-4">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="fromDate">From Date</label>
            <Flatpickr
              value={fromDate}
              onChange={(date) => setFromDate(date[0])}
              options={{ dateFormat: "Y-m-d" }}
              className="form-input"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="toDate">To Date</label>
            <Flatpickr
              value={toDate}
              onChange={(date) => setToDate(date[0])}
              options={{ dateFormat: "Y-m-d" }}
              className="form-input"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="status">Status</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={status.includes("Pending")}
                  onChange={() =>
                    setStatus((prev) =>
                      prev.includes("Pending")
                        ? prev.filter((s) => s !== "Pending")
                        : [...prev, "Pending"]
                    )
                  }
                />
                Pending
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={status.includes("Confirmed")}
                  onChange={() =>
                    setStatus((prev) =>
                      prev.includes("Confirmed")
                        ? prev.filter((s) => s !== "Confirmed")
                        : [...prev, "Confirmed"]
                    )
                  }
                />
                Confirmed
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={status.includes("Completed")}
                  onChange={() =>
                    setStatus((prev) =>
                      prev.includes("Completed")
                        ? prev.filter((s) => s !== "Completed")
                        : [...prev, "Completed"]
                    )
                  }
                />
                Completed
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="reason">Reason for Transfer</label>
            <Select
              options={reasons.map((reason) => ({
                value: reason,
                label: reason,
              }))}
              onChange={(selectedOption) => setReason(selectedOption.value)}
              className="w-60"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="search">Name</label>
            <input
              type="text"
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleFilter}
            className="btn btn-primary"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={filteredData}
          columns={[
            { accessor: "_id", title: "Customer ID", sortable: true },
            { accessor: "firstName", title: "First Name", sortable: true },
            { accessor: "middleName", title: "Middle Name", sortable: true },
            { accessor: "lastName", title: "Last Name", sortable: true },
            { accessor: "dob", title: "DOB", sortable: true },
            {
              accessor: "countryOfBirth",
              title: "Country Of Birth",
              sortable: true,
            },
            { accessor: "nationality", title: "Nationality", sortable: true },
            { accessor: "email", title: "Email", sortable: true },
            { accessor: "occupation", title: "Occupation", sortable: true },
            { accessor: "country", title: "Country", sortable: true },
            { accessor: "state", title: "State", sortable: true },
            { accessor: "city", title: "City", sortable: true },
            { accessor: "address", title: "Address", sortable: true },
            { accessor: "zip", title: "ZIP", sortable: true },
            { accessor: "mobile", title: "Mobile", sortable: true },
            { accessor: "comment", title: "Comment", sortable: true },
            { accessor: "order._id", title: "Order ID", sortable: true },
            {
              accessor: "order.orderdate",
              title: "Order Date",
              sortable: true,
            },
            { accessor: "order.tags", title: "Tags", sortable: true },
            {
              accessor: "order.reasonfortransfer",
              title: "Reason for Transfer",
              sortable: true,
            },
            {
              accessor: "order.foreigncurrency",
              title: "Foreign Currency",
              sortable: true,
            },
            {
              accessor: "order.country",
              title: "Order Country",
              sortable: true,
            },
            {
              accessor: "order.sourceoffunds",
              title: "Source of Funds",
              sortable: true,
            },
            { accessor: "order.quantity", title: "Quantity", sortable: true },
            {
              accessor: "order.commission",
              title: "Commission",
              sortable: true,
            },
            { accessor: "order.rate", title: "Rate", sortable: true },
            { accessor: "document._id", title: "Document ID", sortable: true },
            {
              accessor: "document.documentname",
              title: "Document Name",
              sortable: true,
            },
            {
              accessor: "document.documenttype",
              title: "Document Type",
              sortable: true,
            },
            {
              accessor: "document.documentstatus",
              title: "Document Status",
              sortable: true,
            },
            {
              accessor: "document.validationsource",
              title: "Validation Source",
              sortable: true,
            },
            { accessor: "document.number", title: "Number", sortable: true },
            { accessor: "document.issue", title: "Issue", sortable: true },
            {
              accessor: "document.state",
              title: "Document State",
              sortable: true,
            },
            {
              accessor: "document.cardnumber",
              title: "Card Number",
              sortable: true,
            },
            {
              accessor: "document.description",
              title: "Description",
              sortable: true,
            },
          ]}
          totalRecords={filteredData.length}
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

export default CombinedDataTable;
