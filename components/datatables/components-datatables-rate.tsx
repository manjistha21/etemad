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
import { useRouter } from "next/navigation";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconXCircle from "@/components/icon/icon-x-circle";
import IconPencil from "@/components/icon/icon-pencil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const newRateadded = () => {
  MySwal.fire({
    title: "New Rate has added",
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
  });
};

const updatedRate = () => {
  MySwal.fire({
    title: "Rate has Updated",
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
  });
};

const deleteddRate = () => {
  MySwal.fire({
    title: "Rate has Deleted",
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
  });
};

const rowData = [
  {
    _id: "1",
    basecountry: "USA",
    foreigncurrency: "Euro",
    fromcountry: "Germany",
    tocountry: "France",
    ratecurrency: 0.85,
    transfertype: "International",
    status: "Pending",
    unit: "USD",
    rate: 0.85,
  },
];

const col = [
  "_id",
  "basecountry",
  "foreigncurrency",
  "fromcountry",
  "ratecurrency",
  "status",
  "rate",
  "tocountry",
  "transfertype",
];

const ComponentsDatatablesRate = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, "_id"));
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [rateData, setRateData] = useState([]);
  const [cutomerid, setcutomerid] = useState("");

  const [editid, setEditid] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const [date1, setDate1] = useState<any>("2022-07-05");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "_id",
    direction: "asc",
  });

  const [recordsDatasort, setRecordsDatashort] = useState("dsc");

  interface Rate {
    _id: string;
    basecountry: string;
    foreigncurrency: string;
    fromcountry: string;
    tocountry: string;
    ratecurrency: string;
    transfertype: string;
    status: string;
    unit: string;
    rate: number;
  }
  const fetchRateData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    try {
      const response = await fetch("/api/rate");
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const data = await response.json();

      const formattedRate = data.rates.map((rates: Rate) => ({
        _id: rates._id,
        basecountry: rates.basecountry,
        foreigncurrency: rates.foreigncurrency,
        fromcountry: rates.fromcountry,
        tocountry: rates.tocountry,
        ratecurrency: rates.ratecurrency,
        transfertype: rates.transfertype,
        status: rates.status,
        unit: rates.unit,
        rate: rates.rate,
      }));
      if (recordsDatasort == "dsc") {
        setInitialRecords(formattedRate.reverse());
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRateData();
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
          item.basecountry.toLowerCase().includes(search.toLowerCase()) ||
          item.foreigncurrency.toLowerCase().includes(search.toLowerCase()) ||
          item.fromcountry.toLowerCase().includes(search.toLowerCase()) ||
          item.ratecurrency.toLowerCase().includes(search.toLowerCase()) ||
          item.status.toString().toLowerCase().includes(search.toLowerCase()) ||
          item.tocountry.toLowerCase().includes(search.toLowerCase()) ||
          item.transfertype.toLowerCase().includes(search.toLowerCase()) ||
          item.rate.toLowerCase().includes(search.toLowerCase())
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
  const currency = [
    "AUD - Australian Dollar",
    "AFN - Afganistan Afgani",
    "USD - United States Dollar",
    "EUR - Euro",
    "GBP - United Kingdom Pound",
    "CAD - Canadian Dollar",
    "ETB - Ethiopian Birr",
    "PKR - Pakistan Rupee",
    "MYR - Malaysia Ringgit",
    "AED - Emirates Dirham",
    "ALL - Albania lek",
    "ANG - Netherlands Antilles Guilder",
    "ARS - Argentina Peso",
    "AWG - Aruba Guilder",
    "AZN - Azerbaijan New Manat",
    "BAM - Bosnia and Herzegovina Convertible Marka",
    "BBD - Barbados Dollar",
    "BGN - Bulgaria lev",
    "BMD - Barmuda Dollar",
    "BND - Brunei Darussalam Dollar",
    "BOB - Bolivia Boliviano",
    "BRL - Brazil Real",
    "BSD - Bahamas Dollar",
    "BWP - Botswana Pula",
    "BYR - Belarus Ruble",
    "BZD - Belize Dollar",
    "CHP - Switzerland Franc",
    "CLP - Chile peso",
    "CNY - China Yuan Renminbi",
    "COP - Colombia Peso",
    "CRC - Costa Rica Colon",
    "CUP - Cuba Peso",
    "CZK - Czech Republic Koruna",
    "DKK - Denmark Krone",
    "DOP - Dominican Republic Peso",
    "EEK - Estonia Kroon",
    "EGP - Egypt Pound",
    "FZD - Fizi Dollar",
    "FKP - Falkland Islands (Malvinas) Pound",
    "GGP - Guernsey Pound",
    "GHC - Ghana Cedi",
    "GIP - Gibraltar Pound",
    "GTQ - Guatemala Quetzal",
    "GYD - Guyana Dollar",
    "HKD - Hong Kong Dollar",
    "HNL - Honduras Lempira",
    "HRK - Croatia Kuna",
    "HUF - Hungary Forint",
    "IDR - Indonesia Rupiah",
    "ILS Israel Shekel",

    "IMP Isle of Man Pound",

    "INR India Rupee",

    "IRR Iranian Rial",

    "ISK Iceland Krona",

    "JEP Jersey Pound",

    "JMD Jamaica Dollar",

    "JPY - Japan Yen",

    "KGSKyrgyzstan Som",

    "KHR Cambodia Riel",

    "KPW - Korea (North) Won",

    "KRW - Korea (South) Won",

    "KYD Cayman Islands Dollar",

    "KZT Kazakhstan Tenge",

    "LAK - Laos Kip",

    "LBPLebanon Pound",

    "LKR - Sri Lanka Rupee",

    "LRD Liberia Dollar",

    "LTL - Lithuania Litas",

    "LVL - Latvia Lat",

    "MKD - Macedonia Denar",

    "MNT - Mongolia Tughrik",

    "MUR - Mauritius Rupee",

    "MXN - Mexico Peso",

    "MZN - Mozambique Metical",

    "NAD Namibia Dollar",

    "NGN - Nigeria Naira",

    "NIO Nicaragua Cordoba",

    "NOK - Norway Krone",

    "NPR - Nepal Rupee",

    "NZD - New Zealand Dollar",

    "OMR - Oman Rial",

    "PAB - Panama Balboa",
    "PEN - Peru Nuevo Sol",

    "PHP - Philippines Peso",

    "PLN - Poland Zloty",

    "PYG Paraguay Guarani",

    "QAR - Qatar Riyal",

    "RON - Romania New Leu",

    "RSD - Serbia Dinar",

    "RUB - Russia Ruble",

    "SAR - Saudi Arabia Riyal",

    "SBD - Solomon Islands Dollar",

    "SCR- Seychelles Rupee",

    "SEK - Sweden Krona",

    "SGD - Singapore Dollar",

    "SHP - Saint Helena Pound",

    "SOS- Somalia Shilling",

    "SRD-Suriname Dollar",

    "SVC - El Salvador Colon",

    "SYP - Syria Pound",

    "THB - Thailand Baht",

    "TRL - Turkey Lira",

    "TRY - Turkey Lira",

    "TTD - Trinidad and Tobago Dollar",

    "TVD-Tuvalu Dollar",

    "TWD - Taiwan New Dollar",

    "UAH - Ukraine Hryvnia",

    "UYU - Uruguay Peso",

    "UZS - Uzbekistan Som",

    "VEF - Venezuela Bolivar",

    "VND - Viet Nam Dong",

    "XCD - East Caribbean Dollar",

    "YER - Yemen Rial",

    "ZAR - South Africa Rand",

    "ZWD - Zimbabwe Dollar",
  ];

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
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

  const [formData, setFormData] = useState({
    basecountry: " ",
    foreigncurrency: " ",
    fromcountry: " ",
    tocountry: " ",
    ratecurrency: " ",
    transfertype: " ",
    status: " ",
    unit: " ",
    rate: 0,
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    if (!editid) {
      console.log(formData);

      try {
        const res = await fetch("/api/rate", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setModal1(false);
          fetchRateData();
          newRateadded();
        } else {
          throw new Error("Failed to create a customer");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = "/api/rate/" + editid;

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error("failed to update product:");
        }
        if (res.ok) {
          setModal1(false);
          fetchRateData();
          updatedRate();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getcustomeval = () => {
    setEditid("");
    setFormData({
      basecountry: "",
      foreigncurrency: "",
      fromcountry: "",
      tocountry: "",
      ratecurrency: "",
      transfertype: "",
      status: "",
      unit: "",
      rate: 0,
    });
    setModal1(true);
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

  const handleUpdateClick = async (value: any) => {
    setEditid(value);
    const res = await fetch(`/api/rate/${value}`, {
      method: "GET",
    });
    const data = await res.json();
    // console.log(data.rate);
    setFormData(data.rate);
    if (res.ok) {
      fetchRateData();
    }
    setModal1(true);
  };

  const handleDeletelick = (value: any) => {
    setModal2(true);
    setDeleteid(value);
  };

  const handelDeleteData = async () => {
    setModal2(false);

    const res = await fetch(`/api/rate/${deleteid}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchRateData();
      deleteddRate();
    }
  };

  return (
    <div className="panel mt-6">
      <h5 className="mb-5 text-lg font-semibold dark:text-white-light">Rate</h5>

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
                          <div className="text-lg font-bold">Add Rate</div>
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
                                <label htmlFor="groupLname">Base Country</label>
                                <select
                                  id="ctnSelect2"
                                  name="basecountry"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                  value={formData.basecountry}
                                >
                                  <option value="">Select a country</option>
                                  {countries.map((country) => (
                                    <option key={country} value={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupLname">
                                  Foreign Currency
                                </label>
                                <select
                                  id="ctnSelect2"
                                  name="foreigncurrency"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                  value={formData.foreigncurrency}
                                >
                                  <option value=""></option>
                                  {currency.map((fc) => (
                                    <option key={fc} value={fc}>
                                      {fc}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupLname">From Country</label>
                                <select
                                  id="ctnSelect2"
                                  name="fromcountry"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                  value={formData.fromcountry}
                                >
                                  <option value=""></option>
                                  {countries.map((country) => (
                                    <option key={country} value={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupLname">To Country</label>
                                <select
                                  id="ctnSelect2"
                                  name="tocountry"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                  value={formData.tocountry}
                                >
                                  <option value=""></option>
                                  {countries.map((country) => (
                                    <option key={country} value={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupLname">
                                  Rate Currency
                                </label>
                                <select
                                  id="ctnSelect2"
                                  name="ratecurrency"
                                  className="form-select text-white-dark"
                                  required
                                  onChange={handleChange}
                                  value={formData.ratecurrency}
                                >
                                  <option value=""></option>
                                  {currency.map((fc) => (
                                    <option key={fc} value={fc}>
                                      {fc}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="ctnSelect1">
                                  Transfer Type
                                </label>
                                <select
                                  className="form-select text-white-dark"
                                  name="transfertype"
                                  onChange={handleChange}
                                  value={formData.transfertype}
                                >
                                  <option>buy</option>
                                  <option>sell</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="ctnSelect1">Status</label>
                                <select
                                  className="form-select text-white-dark"
                                  name="status"
                                  onChange={handleChange}
                                  value={formData.status}
                                >
                                  <option>Active</option>
                                  <option>Call</option>
                                  <option>InActive</option>
                                  <option>Disabled</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="groupFname">Rate</label>
                                <input
                                  id="groupFname"
                                  type="number"
                                  name="rate"
                                  placeholder="Enter Rate"
                                  onChange={handleChange}
                                  className="form-input"
                                  value={formData.rate}
                                />
                              </div>

                              <div></div>
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
            Add Rate
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
          records={initialRecords}
          columns={[
            { accessor: "_id", title: "ID", sortable: true },
            { accessor: "basecountry", sortable: true },
            { accessor: "foreigncurrency", sortable: true },
            { accessor: "fromcountry", title: "From Country", sortable: true },
            { accessor: "tocountry", title: "To Country", sortable: true },
            {
              accessor: "ratecurrency",
              title: "Rate currency",
              sortable: true,
            },
            { accessor: "transfertype", sortable: true },
            { accessor: "status", sortable: true },
            { accessor: "rate", sortable: true },
            {
              accessor: "action",
              title: "Action",
              titleClassName: "!text-center",
              render: (row) => (
                <div className="mx-auto flex w-max items-center gap-4">
                  <Tippy content="Edit Rate">
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(row._id)}
                      className="btn btn-primary bg-primary"
                    >
                      <IconPencil />
                    </button>
                  </Tippy>

                  <Tippy content="Delete Rate">
                    <button
                      type="button"
                      onClick={() => handleDeletelick(row._id)}
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
                    <p>Do you want to delete this Rate?</p>
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

export default ComponentsDatatablesRate;
