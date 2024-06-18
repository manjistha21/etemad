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

const MySwal = withReactContent(Swal);

const showMessage8 = () => {
  MySwal.fire({
    title: "You can upload only one file or remove last uploaded file",
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
  });
};

const rowData = [];

const col = [
  "_id",
  "AMLstatus",
  "orderdate",
  "tags",
  "customer",
  "reasonfortransfer",
  "foreigncurrency",
  "country",
  "sourceoffunds",
  "quantity",
  "commission",
  "rate",
];

const ComponentsDatatablespendingOrders = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
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
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, "_id"));
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
  const [rate, setRate] = useState(0);

  const countries = [
    "Afganistan",
    "Albania",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands",
  ];

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

  const sourceoffunds = [
    "Personal savings",
    "family gift",
    "Property sale",
    "Business cost",
    "Trade between Remittances",
    "Donations",
    "Business",
  ];

  const getCustomerbyid = (val) => {
    const fetchCustomerDatabyid = async () => {
      try {
        const response = await fetch(`/api/customer?id=${val}`); // Assuming API endpoint is relative
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        const custval = data.customer;
        setCustomerDatabyid(custval);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomerDatabyid();
  };

  const handleCustomerChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customer: selectedOption.value,
    }));
  };

  const fetchRateData = async (country) => {
    try {
      const response = await fetch(`/api/rate?country=${country}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching rate data:", errorData);
        throw new Error("Failed to fetch rate data");
      }
      const data = await response.json();
      console.log("Full Response:", data); // Log the full response
      return data.rates.length > 0 ? data.rates[0].rate : 0;
    } catch (error) {
      console.error("fetchRateData error:", error);
      return 0;
    }
  };

  const handleCountryChange = async (selectedOption) => {
    console.log("Selected Country:", selectedOption.value);
    const newRate = await fetchRateData(selectedOption.value);
    console.log("Fetched Rate:", newRate);
    setRate(newRate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedOption.value,
      rate: newRate,
    }));
  };

  const newDocumnetadded = () => {
    MySwal.fire({
      title: "New Document has been added",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true,
    });
  };

  const updatedDocumnet = () => {
    MySwal.fire({
      title: "Document has been updated",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true,
    });
  };

  const deleteddocument = () => {
    MySwal.fire({
      title: "Document has been deleted",
      toast: true,
      position: "bottom-start",
      showConfirmButton: false,
      timer: 5000,
      showCloseButton: true,
    });
  };

  interface Document {
    _id: string;
    AMLstatus: string;
    orderdate: string;
    tags: string;
    customer: string;
    status: string;
    reasonfortransfer: string;
    foreigncurrency: string;
    country: string;
    sourceoffunds: string;
    quantity: string;
    commission: string;
    rate: string;
  }

  const handleDeleteClick = (value: any) => {
    setModal2(true);
    setDeleteid(value);
  };

  const fetchRateeData = async () => {
    try {
      const response = await fetch("/api/order");
      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }
      const data = await response.json();

      const formattedRate = data.orders.map((order: Document) => ({
        _id: order._id,
        AMLstatus: order.AMLstatus,
        orderdate: order.orderdate,
        tags: order.tags,
        customer: order.customer,
        status: order.status,
        reasonfortransfer: order.reasonfortransfer,
        foreigncurrency: order.foreigncurrency,
        country: order.country,
        sourceoffunds: order.sourceoffunds,
        quantity: order.quantity,
        commission: order.commission,
        rate: order.rate,
      }));

      const pendingOrders = formattedRate.filter(
        (order) => order.status === "Pending"
      );

      if (recordsDatasort == "dsc") {
        setInitialRecords(pendingOrders.reverse());
      } else {
        setInitialRecords(pendingOrders);
      }

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRateeData();
  }, []);

  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "_id",
    direction: "asc",
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("/api/customer");
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
          item._id.toString().includes(search.toLowerCase()) ||
          item.AMLstatus.toLowerCase().includes(search.toLowerCase()) ||
          item.orderdate.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.toLowerCase().includes(search.toLowerCase()) ||
          item.customer.toString().includes(search.toLowerCase()) ||
          item.status.toLowerCase().includes(search.toLowerCase()) ||
          item.reasonfortransfer.toLowerCase().includes(search.toLowerCase()) ||
          item.foreigncurrency.toLowerCase().includes(search.toLowerCase()) ||
          item.country.toLowerCase().includes(search.toLowerCase()) ||
          item.sourceoffunds.toLowerCase().includes(search.toLowerCase()) ||
          item.quantity.toString().includes(search.toLowerCase()) ||
          item.commission.toString().includes(search.toLowerCase()) ||
          item.rate.toString().includes(search.toLowerCase())
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

    const res = await fetch(`/api/order/${deleteid}`, {
      method: "DELETE",
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
      AMLstatus: "",
      orderdate: "",
      tags: "",
      customer: "",
      status: "",
      reasonfortransfer: "",
      foreigncurrency: "AUD Australian currency",
      country: "",
      sourceoffunds: "",
      quantity: 0,
      commission: 0,
      rate: "",
    });
    const options = customerData.map((customer) => ({
      value: customer._id,
      label: `${customer.firstName} ${
        customer.middleName ? customer.middleName + " " : ""
      }${customer.lastName} - ${customer.mobile}`,
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
    if (date[0]) {
      const selectedDate = new Date(date[0]);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        orderdate: formattedDate,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        orderdate: "",
      }));
    }
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
          "Content-Type": "multipart/form-data",
        },
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
    AMLstatus: "",
    orderdate: "",
    tags: "",
    customer: "",
    status: "",
    reasonfortransfer: "",
    foreigncurrency: "",
    country: "",
    sourceoffunds: "",
    quantity: "",
    commission: "",
    rate: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      orderdate: date1,
      customer: cutomerid,
    }));
  }, [cutomerid]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (!editid) {
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      try {
        const url = "/api/order/" + editid;

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error("Failed to update order");
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
    const res = await fetch(`/api/order/${value}`, {
      method: "GET",
    });
    const data = await res.json();

    setFormData(data.order);
    if (res.ok) {
      //fetchRateData();
    }
  };

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
        Orders
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
                          <div className="text-lg font-bold">Add Order</div>
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
                              <div className="flex">
                                <label>AML Status</label>
                                <div className="ml-4 flex gap-2">
                                  <div>
                                    <label className="flex cursor-pointer items-center">
                                      <input
                                        type="radio"
                                        name="AMLstatus"
                                        className="form-radio"
                                        defaultChecked
                                        onChange={handleChange}
                                        value={"Required"}
                                      />
                                      <span className="text-white-dark">
                                        Required
                                      </span>
                                    </label>
                                  </div>

                                  <div>
                                    <label className="flex cursor-pointer items-center">
                                      <input
                                        type="radio"
                                        name="AMLstatus"
                                        className="form-radio"
                                        onChange={handleChange}
                                        value={"Not Required"}
                                      />
                                      <span className="text-white-dark">
                                        Not Required
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="orderdate">Order Date</label>
                                <Flatpickr
                                  value={date1}
                                  name="orderdate"
                                  options={{
                                    dateFormat: "Y-m-d",
                                  }}
                                  className="form-input"
                                  onChange={handleDateChange}
                                />
                              </div>

                              <div>
                                <label htmlFor="tags">Tags</label>
                                <select
                                  className="form-select text-white-dark"
                                  name="tags"
                                  onChange={handleChange}
                                >
                                  <option>IR-001 - Iran-AHMADI</option>
                                  <option>
                                    ETEMAD SA BRANCH - ETEMAD FINANCIAL SERVICES
                                    PTY LTD-ADELAIDE BRANCH
                                  </option>
                                  <option>UAE-AHMADI AHMADI-UAE-BRANCH</option>
                                  <option>PAK_ETEMAD - Pakistan-AHMADI</option>
                                  <option>
                                    ETEMAD WA BRANCH - ETEMAD FINANCIAL SERVICES
                                    PTY LTD - PERTH BRANCH
                                  </option>
                                  <option>AF-KABUL-2 - KABUL-AHMADI</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="customer">Customer</label>
                                <div className="flex">
                                  <div className="w-11/12">
                                    <Select
                                      placeholder="Select a Customer"
                                      name="customer"
                                      options={options}
                                      onChange={(t) => {
                                        handleCustomerChange(t);
                                        getCustomerbyid(t.value);
                                      }}
                                    />
                                  </div>

                                  <div className="flex w-1/12 items-center justify-center">
                                    <button onClick={handleAddCustomerClick}>
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
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={12} y1={5} x2={12} y2={19} />
                                        <line x1={16} y1={15} x2={12} y2={19} />
                                        <line x1={8} y1={15} x2={12} y2={19} />
                                      </svg>
                                    </button>
                                  </div>
                                  {showAddCustomer && (
                                    <div className="w-45 absolute mt-10 border border-gray-200 bg-white p-4">
                                      <Link href={"/addcustomer"}>
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
                                              <line
                                                x1={12}
                                                y1={5}
                                                x2={12}
                                                y2={19}
                                              />
                                              <line x1={5} y1={12} x2={19} />
                                            </svg>
                                          </div>
                                          <div>
                                            <p>Add Customer</p>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="status"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Status
                                </label>
                                <select
                                  className="form-select text-white-dark"
                                  name="status"
                                  value={formData.status}
                                  onChange={handleChange}
                                  placeholder={"Select Status"}
                                >
                                  <option>Pending</option>
                                  <option>Completed</option>

                                  <option>in progress</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="reasonfortransfer">
                                  Reason for transfer
                                </label>
                                <select
                                  id="reasonfortransfer"
                                  name="reasonfortransfer"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                >
                                  <option value="">Select reason</option>
                                  {reasons.map((reason) => (
                                    <option key={reason} value={reason}>
                                      {reason}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="foreigncurrency">
                                  Foreign currency
                                </label>
                                <select
                                  className="form-select text-white-dark"
                                  name="foreigncurrency"
                                  value={formData.foreigncurrency}
                                  onChange={handleChange}
                                >
                                  <option>AUD Australian currency</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="country">Country</label>
                                <Select
                                  placeholder="Select a Country"
                                  options={countries.map((country) => ({
                                    value: country,
                                    label: country,
                                  }))}
                                  onChange={handleCountryChange}
                                />
                              </div>

                              <div>
                                <label htmlFor="sourceoffunds">
                                  Source Of Funds
                                </label>
                                <select
                                  id="sourceoffunds"
                                  name="sourceoffunds"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    Select Source of Funds
                                  </option>
                                  {sourceoffunds.map((source) => (
                                    <option key={source} value={source}>
                                      {source}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="w-100 my-2 mr-4 rounded-lg border border-gray-300 p-4">
                                <div>
                                  <label htmlFor="quantity">Quantity</label>
                                  <input
                                    id="quantity"
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    placeholder="Enter Quantity"
                                    className="form-input"
                                    onChange={handleChange}
                                  />
                                </div>

                                <div>
                                  <label htmlFor="commission">Commission</label>
                                  <input
                                    id="commission"
                                    type="text"
                                    name="commission"
                                    value={formData.commission}
                                    placeholder="Commission"
                                    className="form-input"
                                    onChange={handleChange}
                                  />
                                </div>

                                <div>
                                  <label htmlFor="rate">Rate</label>
                                  <input
                                    id="rate"
                                    type="text"
                                    name="rate"
                                    placeholder="Rate"
                                    value={formData.rate}
                                    readOnly
                                    className="form-input"
                                  />
                                </div>

                                <div>
                                  <label htmlFor="total_amount">
                                    Total amount
                                  </label>
                                  <input
                                    id="total_amount"
                                    type="text"
                                    name="total_amount"
                                    value={formData.total_amount}
                                    placeholder="Total amount"
                                    className="form-input"
                                    onChange={handleChange}
                                  />
                                </div>
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
            <IconPlus className="ltr:mr-2 rtl:ml-2" />
            Add Order
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
            {
              accessor: "action",
              title: "Action",
              titleClassName: "!text-center",
              render: (row) => (
                <div className="mx-auto flex w-max items-center gap-4">
                  <Tippy content="Edit Order">
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(row._id)}
                      className="btn btn-primary bg-primary"
                    >
                      <IconPencil />
                    </button>
                  </Tippy>

                  <Tippy content="Delete Order">
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(row._id)}
                      className="btn btn-primary bg-red-500"
                    >
                      <IconXCircle />
                    </button>
                  </Tippy>
                </div>
              ),
            },
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
            `Showing ${from} to ${to} of ${totalRecords} entries`
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
                    <p>Do you want to delete this Order?</p>
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

export default ComponentsDatatablespendingOrders;
