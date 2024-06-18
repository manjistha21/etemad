"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState, Fragment, useRef } from "react";
import sortBy from "lodash/sortBy";
import IconFile from "@/components/icon/icon-file";
import { Dialog, Transition, Tab } from "@headlessui/react";
import IconPrinter from "@/components/icon/icon-printer";
import IconPlus from "../icon/icon-plus";
import Link from "next/link";
import axios from "axios";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MaskedInput from "react-text-mask";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconXCircle from "@/components/icon/icon-x-circle";
import IconPencil from "@/components/icon/icon-pencil";
import { C } from "@fullcalendar/core/internal-common";

const MySwal = withReactContent(Swal);

const showMessage8 = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  MySwal.fire({
    title: "You can upload only one file or remove last uploaded file",
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true
  });
};
const getFirstName = (label: string) => label.split(" - ")[0];

const rowData = [
  {
    id: "989",
    documentname: "Caroline",
    customerid: "08989090998",
    documenttype: "driving Licene",
    documentstatus: "2004-05-28",

    validationsource: "source",
    number: "123456",
    issue: "989",
    state: "POLARAX",
    cardnumber: "999999",
    description: "test desc"
  }
];

const col = [
  "id",
  "documentname",
  "customerid",
  "documenttype",
  "documentstatus",
  "validationsource",
  "number",
  "issue",
  "state",
  "cardnumber",
  "description"
];

const ComponentsDatatablesDoucument = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const [date1, setDate1] = useState<any>("2022-07-05");

  const [modal1, setModal1] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, "id"));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [customerData, setCustomerData] = useState([]);
  const [cutomerid, setcutomerid] = useState("");
  const [cutomerName, setcutomerName] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [hiddenFileName, setHiddenFileName] = useState("");
  const [recordsDatasort, setRecordsDatashort] = useState("dsc");
  const [modal2, setModal2] = useState(false);
  const [editid, setEditid] = useState("");
  const [deleteid, setDeleteid] = useState("");

  const newDocumnetadded = () => {
    MySwal.fire({
      title: "New Documnet has added",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true
    });
  };

  const updatedDocumnet = () => {
    MySwal.fire({
      title: "Documnet has Updated",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true
    });
  };

  const deleteddocument = () => {
    MySwal.fire({
      title: "Documnet has Deleted",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true
    });
  };
  interface Document {
    id: string;
    documentname: string;
    customername: string;
    customerid: string;
    documenttype: string;
    documentstatus: string;

    validationsource: string;
    number: string;
    issue: string;
    state: string;
    cardnumber: string;
    description: string;
  }
  const handleDeletelick = (value: any) => {
    setModal2(true);
    setDeleteid(value);
  };

  const fetchRateData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    try {
      const response = await fetch("/api/document");
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const data = await response.json();

      const formattedRate = data.documents.map((document: Document) => ({
        id: document._id,
        documentname: document.documentname,
        customername: document.customername,
        customerid: document.customerid,
        documenttype: document.documenttype,
        documentstatus: document.documentstatus,

        validationsource: document.validationsource,
        number: document.number,
        issue: document.issue,
        state: document.state,
        cardnumber: document.cardnumber,
        description: document.description
      }));
      if (recordsDatasort == "dsc") {
        setInitialRecords(formattedRate.reverse());
      }
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRateData();
  }, []);

  
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc"
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("/api/customer"); // Assuming API endpoint is relative
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();

        setCustomerData(data.customer);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return initialRecords.filter((item: any) => {
        return (
          item.id.toString().includes(search.toLowerCase()) ||
          item.documentname.toLowerCase().includes(search.toLowerCase()) ||
          item.customerid.toString().includes(search.toLowerCase()) ||
          item.documenttype.toLowerCase().includes(search.toLowerCase()) ||
          item.documentstatus.toLowerCase().includes(search.toLowerCase()) ||
          item.validationsource.toLowerCase().includes(search.toLowerCase()) ||
          item.number.toString().includes(search.toLowerCase()) ||
          item.issue.toString().includes(search.toLowerCase()) ||
          item.state.toLowerCase().includes(search.toLowerCase()) ||
          item.cardnumber.toString().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);
  const handleAddCustomerClick = (e) => {
    e.stopPropagation();
    setShowAddCustomer(!showAddCustomer); // Toggle the visibility
  };
  useEffect(() => {
    const data = sortBy(initialRecords, sortStatus.columnAccessor);
    setInitialRecords(sortStatus.direction === "desc" ? data.reverse() : data);
    setPage(1);
  }, [sortStatus]);

  const formatDate = (date: any) => {
    if (date) {
      const dt = new Date(date);
      const month =
        dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
      return day + "/" + month + "/" + dt.getFullYear();
    }
    return "";
  };

  const handelDeleteData = async () => {
    setModal2(false);

    const res = await fetch(`/api/document/${deleteid}`, {
      method: "DELETE"
    });

    if (res.ok) {
      fetchRateData();
      deleteddocument();
    }
  };

  const getcustomeval = () => {
    setEditid("");
    setFiles([]);
    setFormData({
      customerid: "",
      customername: "", // Added missing property
      documentname: "",
      documenttype: "",
      documentstatus: "",
      validationsource: "",
      number: "",
      issue: "",
      state: "",
      cardnumber: "",
      description: ""
    });
    const options = customerData.map((customer) => ({
      value: customer._id,
      label: `${customer.firstName} ${
        customer.middleName ? customer.middleName + " " : ""
      }${customer.lastName} - ${customer.mobile}`
    }));
    setOptions(options);
    setModal1(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);

    const selectedFiles = e.target.files;
    const newFiles = Array.from(selectedFiles!);

    // Check if adding new files exceeds the limit
    if (files.length + newFiles.length > 1) {
      showMessage8();
    } else {
      // Add new files if limit is not exceeded
      setFiles([...files, ...newFiles]);
      setHiddenFileName(newFiles[0].name);
    }
  };



  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dob: date[0] ? date[0].toISOString().split('T')[0] : "", // Convert to "YYYY-MM-DD" format
    }));
  };
  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Clear the files after successful upload
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    const newFiles = Array.from(droppedFiles);
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setHiddenFileName("");
  };

  const exportTable = (type: any) => {
    let columns: any = col;
    let records = initialRecords;
    let filename = "table";

    let newVariable: any;
    newVariable = window.navigator;

    if (type === "csv") {
      let coldelimiter = ";";
      let linedelimiter = "\n";
      let result = columns
        .map((d: any) => {
          return capitalize(d);
        })
        .join(coldelimiter);
      result += linedelimiter;
      records.map((item: any) => {
        columns.map((d: any, index: any) => {
          if (index > 0) {
            result += coldelimiter;
          }
          let val = item[d] ? item[d] : "";
          result += val;
        });
        result += linedelimiter;
      });

      if (result == null) return;
      if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
        var data =
          "data:application/csv;charset=utf-8," + encodeURIComponent(result);
        var link = document.createElement("a");
        link.setAttribute("href", data);
        link.setAttribute("download", filename + ".csv");
        link.click();
      } else {
        var blob = new Blob([result]);
        if (newVariable.msSaveOrOpenBlob) {
          newVariable.msSaveBlob(blob, filename + ".csv");
        }
      }
    } else if (type === "print") {
      var rowhtml = "<p>" + filename + "</p>";
      rowhtml +=
        '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
      columns.map((d: any) => {
        rowhtml += "<th>" + capitalize(d) + "</th>";
      });
      rowhtml += "</tr></thead>";
      rowhtml += "<tbody>";
      records.map((item: any) => {
        rowhtml += "<tr>";
        columns.map((d: any) => {
          let val = item[d] ? item[d] : "";
          rowhtml += "<td>" + val + "</td>";
        });
        rowhtml += "</tr>";
      });
      rowhtml +=
        "<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>";
      rowhtml += "</tbody></table>";
      var winPrint: any = window.open(
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
      let result = columns
        .map((d: any) => {
          return capitalize(d);
        })
        .join(coldelimiter);
      result += linedelimiter;
      records.map((item: any) => {
        columns.map((d: any, index: any) => {
          if (index > 0) {
            result += coldelimiter;
          }
          let val = item[d] ? item[d] : "";
          result += val;
        });
        result += linedelimiter;
      });

      if (result == null) return;
      if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
        var data1 =
          "data:application/txt;charset=utf-8," + encodeURIComponent(result);
        var link1 = document.createElement("a");
        link1.setAttribute("href", data1);
        link1.setAttribute("download", filename + ".txt");
        link1.click();
      } else {
        var blob1 = new Blob([result]);
        if (newVariable.msSaveOrOpenBlob) {
          newVariable.msSaveBlob(blob1, filename + ".txt");
        }
      }
    }
  };

  const capitalize = (text: any) => {
    return text
      .replace("_", " ")
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };
  const [formData, setFormData] = useState({
    customerid: "",
    customername: "",
    documentname: "",
    documenttype: "",
    documentstatus: "",
    validationsource: "",
    number: "",
    issue: "",
    state: "",
    cardnumber: "",
    description: ""
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      expirydate: date1,
      customerid: cutomerid,
      customername: cutomerName,
      documentname: hiddenFileName
    }));
  }, [cutomerid]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (!editid) {
      try {
        
        console.log(formData);
        const res = await fetch("api/document", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        });
       if (res.ok) {
          
        if (!file) {
          setMessage('Please select a file to upload.');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
    
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            setMessage(`File uploaded successfully`);
          } else {
            setMessage(`Failed to upload file`);
          }
        } catch (error) {
          setMessage(`An error occurred`);
        }
      }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
       
        const url = `/api/document/${editid}`;


        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          throw new Error("failed to update product:");
        }
        if (res.ok) {
          setModal1(false);
          fetchRateData();
          updatedDocumnet();
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

 


  };
  const handleUpdateClick = async (value: any) => {
    setModal1(true);
    setEditid(value);
    const res = await fetch(`/api/document/${value}`, {
      method: "GET"
    });
    const data = await res.json();

    setFormData(data.document);
    if (res.ok) {
      //fetchRateData();
    }
  };

  const handleDeleteClick = (_id: any): void => {
    throw new Error("Function not implemented.");
  };

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
        Documents
      </h5>

      <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center">
          <div className="mb-5">
            <div className="flex items-center justify-center"></div>
            <Transition appear show={modal1} as={Fragment}>
              <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                  <div className="flex min-h-screen items-start justify-center px-4">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel
                        as="div"
                        className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                      >
                        <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                          <div className="text-lg font-bold">Add Document</div>
                          <button
                            type="button"
                            className="text-white-dark hover:text-dark"
                            onClick={() => setModal1(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                            </svg>
                          </button>
                        </div>
                        <div className="p-5">
                          <div className="mb-5">
                            <form
                              className="space-y-5"
                              onSubmit={handleFormSubmit}
                            >
                              <div>
                                <div>
                                  <label htmlFor="ctnFile">
                                    Drop pdf or image file here
                                  </label>

                                  
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                  <button type="submit">Upload</button>
                                  {message && <p>{message}</p>}
                                  <div className="flex flex-col items-center">
                                    <button
                                      onClick={handleUpload}
                                      className="mt--10"
                                    >
                                      
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="groupFname">
                                  Customer Name
                                </label>

                                <div>
                                  <div className="flex">
                                    <div className="w-11/12">
                                      {editid ? (
                                        <label>{formData.customername}</label>
                                      ) : (
                                        <div className="flex ">
                                          <div className="w-11/12">
                                            <Select
                                              placeholder="Select an option"
                                              options={options}
                                              onChange={(t) => {
                                                const customername =
                                                  getFirstName(t.label);
                                                setcutomerName(customername);
                                                setcutomerid(t.value);
                                              }}
                                            />
                                          </div>

                                          <div className="flex w-1/12 items-center justify-center">
                                            <button
                                              onClick={handleAddCustomerClick}
                                            >
                                              <svg
                                                className="h-8 w-8 text-gray-500"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              >
                                                {" "}
                                                <path
                                                  stroke="none"
                                                  d="M0 0h24v24H0z"
                                                />{" "}
                                                <line
                                                  x1={12}
                                                  y1={5}
                                                  x2={12}
                                                  y2={19}
                                                />{" "}
                                                <line
                                                  x1={16}
                                                  y1={15}
                                                  x2={12}
                                                  y2={19}
                                                />{" "}
                                                <line
                                                  x1={8}
                                                  y1={15}
                                                  x2={12}
                                                  y2={19}
                                                />
                                              </svg>
                                            </button>{" "}
                                          </div>
                                        </div>
                                      )}

                                      <input
                                        type="hidden"
                                        name="customerid"
                                        value={formData.customerid}
                                        onChange={handleChange}
                                      />
                                      <input
                                        type="hidden"
                                        name="customername"
                                        value={formData.customername}
                                        onChange={handleChange}
                                      />
                                      <input
                                        type="hidden"
                                        name="documentname"
                                        value={hiddenFileName}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    {showAddCustomer && (
                                      <div className="w-45 absolute right-10 mt-10 border border-gray-200 bg-white p-4">
                                        <Link href={"/addcustomer"}>
                                          {" "}
                                          <div className="flex">
                                            <div>
                                              <svg
                                                className="h-6 w-6 text-gray-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              >
                                                {" "}
                                                <line
                                                  x1={12}
                                                  y1={5}
                                                  x2={12}
                                                  y2={19}
                                                />{" "}
                                                <line
                                                  x1={5}
                                                  y1={12}
                                                  x2={19}
                                                  y2={12}
                                                />
                                              </svg>
                                            </div>
                                            <div>
                                              {" "}
                                              <p>Add Customer</p>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="ctnSelect1">
                                  Document type
                                </label>
                                <select
                                  className="form-select text-white-dark"
                                  name="documenttype"
                                  onChange={handleChange}
                                  value={formData.documenttype}
                                >
                                  <option>Driver's license</option>
                                  <option>Passport</option>
                                  <option>Tazkera</option>
                                  <option>refuje card</option>
                                  <option>proof of age</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="ctnSelect1">
                                  Document status
                                </label>
                                <select
                                  className="form-select text-white-dark"
                                  name="documentstatus"
                                  onChange={handleChange}
                                  value={formData.documentstatus}
                                >
                                  <option>pending</option>
                                  <option>approved</option>
                                  <option>expired</option>
                                  <option>rejected</option>
                                  <option>deleted</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupFname">
                                  Validation Source
                                </label>
                                <input
                                  id="groupFname"
                                  type="text"
                                  name="validationsource"
                                  placeholder="Enter validation source"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.validationsource}
                                />
                              </div>

                              <div>
                                <label htmlFor="groupFname">Number</label>
                                <input
                                  id="groupFname"
                                  type="text"
                                  name="number"
                                  className="form-input"
                                  onChange={handleChange}
                                  value={formData.number}
                                />
                              </div>

                              <div>
                                <label htmlFor="groupFname">issue</label>
                                <input
                                  id="groupFname"
                                  type="text"
                                  name="issue"
                                  className="form-input"
                                  onChange={handleChange}
                                  value={formData.issue}
                                />
                              </div>

                              <div>
                                <label htmlFor="groupFname">State</label>

                                <select
                                  className="form-select text-white-dark"
                                  onChange={handleChange}
                                  name="state"
                                  value={formData.state}
                                >
                                  <option value="ACT">ACT</option>
                                  <option value="NSW">NSW</option>
                                  <option value="NT">NT</option>
                                  <option value="QLD">QLD</option>
                                  <option value="SA">SA</option>
                                  <option value="TAS">TAS</option>
                                  <option value="VIC">VIC</option>
                                  <option value="WA">WA</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupFname">Card Number</label>
                                <MaskedInput
                                  id="groupFname"
                                  type="text"
                                  name="cardnumber"
                                  value={formData.cardnumber}
                                  className="form-input"
                                  placeholder="__-__-__-__-__"
                                  onChange={handleChange}
                                  mask={[
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/
                                  ]}
                                />
                              </div>

                              <div>
                                <label className="flex cursor-pointer items-center">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    onChange={handleChange}
                                    defaultChecked
                                  />
                                  <span className=" text-white-dark">
                                    Is Identity
                                  </span>
                                </label>
                              </div>

                              <div>
                                <label className="flex cursor-pointer items-center">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    onChange={handleChange}
                                    defaultChecked
                                  />
                                  <span className=" text-white-dark">
                                    Is address
                                  </span>
                                </label>
                              </div>
                              <div>
                                <label htmlFor="ctnTextarea">Expiry Date</label>

                                <Flatpickr
                    value={date1}
                    name="date"
                    options={{
                      dateFormat: "Y-m-d",
                      position: isRtl ? "auto right" : "auto left"
                    }}
                    className="form-input"
                    onChange={handleDateChange}
                    value={formData.date}
                  />
                              </div>
                              <div>
                                <label htmlFor="ctnTextarea">Description</label>
                                <textarea
                                  id="ctnTextarea"
                                  rows={3}
                                  className="form-textarea"
                                  name="description"
                                  onChange={handleChange}
                                  value={formData.description}
                                ></textarea>
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary !mt-6"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
          <button
            type="button"
            className="btn btn-primary my-5"
            onClick={() => getcustomeval()}
          >
            {" "}
            <IconPlus className="ltr:mr-2 rtl:ml-2" />
            Add Document
          </button>
          <button
            type="button"
            onClick={() => exportTable("csv")}
            className="btn btn-primary btn-sm m-1 "
          >
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            CSV
          </button>
          <button
            type="button"
            onClick={() => exportTable("txt")}
            className="btn btn-primary btn-sm m-1"
          >
            <IconFile className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
            TXT
          </button>

          <button
            type="button"
            onClick={() => exportTable("print")}
            className="btn btn-primary btn-sm m-1"
          >
            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
            PRINT
          </button>
        </div>

        <input
          type="text"
          className="form-input w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="datatables">
        <DataTable
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={recordsData}
          columns={[
            { accessor: "id", title: "#", sortable: true },
            { accessor: "documentname", sortable: true },
            { accessor: "customername", sortable: true },
            { accessor: "documenttype", sortable: true },

            {
              accessor: "documentstatus",
              title: "Status",
              sortable: true,
              render: (record) => {
                let bgColorClass = "";
                if (record.documentstatus === "expired") {
                  bgColorClass = "bg-red-500 rounded-md p-2"; // Red for expired
                } else if (record.documentstatus === "rejected") {
                  bgColorClass = "bg-yellow-500 rounded-md p-2"; // Yellow for rejected
                } else {
                  bgColorClass = "bg-green-500 rounded-md p-2"; // Green for other statuses
                }
                return (
                  <span className={bgColorClass}>{record.documentstatus}</span>
                );
              }
            },

            { accessor: "number", sortable: true },
            { accessor: "issue", sortable: true },

            { accessor: "state", sortable: true },
            { accessor: "cardnumber", sortable: true },
            { accessor: "description", sortable: true },
            {
              accessor: "action",
              title: "Action",
              titleClassName: "!text-center",
              render: (row) => (
                <div className="mx-auto flex w-max items-center gap-4">
                  <Tippy content="Edit Document">
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(row.id)}
                      className="btn btn-primary bg-primary"
                    >
                      <IconPencil />
                    </button>
                  </Tippy>

                  <Tippy content="Delete Document">
                    <button
                      type="button"
                      onClick={() => handleDeletelick(row.id)}
                      className="btn btn-primary bg-red-500"
                    >
                      <IconXCircle />
                    </button>
                  </Tippy>
                </div>
              )
            }
          ]}
          totalRecords={initialRecords.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>

      <Transition appear show={modal2} as={Fragment}>
        <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
            <div className="flex min-h-screen items-center justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="div"
                  className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                >
                  <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Delete</h5>
                    <button
                      type="button"
                      className="text-white-dark hover:text-dark"
                      onClick={() => setModal2(false)}
                    ></button>
                  </div>
                  <div className="p-5">
                    <p>Do you want to delete this Document?</p>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setModal2(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        onClick={() => handelDeleteData()}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ComponentsDatatablesDoucument;
