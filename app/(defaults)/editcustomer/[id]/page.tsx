"use client";
import IconArrowBackward from "@/components/icon/icon-arrow-backward";
import PanelCodeHighlight from "@/components/panel-code-highlight";
import axios from "axios";
import IconPencil from "../../components/usercreate/icon-pencil";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useEffect, useState, Fragment } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Basic = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const [date1, setDate1] = useState<any>("2022-07-05");
  const [modal1, setModal1] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [mainImage, setMainImage] = useState("/assets/images/no-avatar.png");
  const [mainImagename, setMainImagename] = useState("");
  const maxNumber = 69;

  const handelImage = () => {
    setModal1(false);
    setMainImage(images[0].dataURL);

    setMainImagename(images[0].file.name);
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

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

  const Occupation = [
    "Software Engineer",
    "Teacher",
    "Doctor",
    "Nurse",
    "Graphic Designer",
    "Accountant",
    "Electrician",
    "Plumber",
    "Lawyer",
    "Chef",
    "Writer",
    "Artist",
    "Architect",
    "Mechanic",
    "Pilot",
    "Police Officer",
    "Firefighter",
    "Real Estate Agent",
    "Photographer",
    "Musician",
  ];

  const [formData, setFormData] = useState({
    comment: "",
    ctype: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: date1,
    countryOfBirth: "",
    nationality: "",
    email: "",
    occupation: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zip: "",
    mobile: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const getCustomerById = async () => {
    const res = await fetch(`/api/customer/${params.id}`, {
      method: "GET",
    });
    const data = await res.json();

    setFormData(data.customer);
    if (res.ok) {
      //fetchRateData();
    }
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        router.push("/customer");
      } else {
        throw new Error("Failed to create a customer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imagename: mainImagename,
      ctype: "Individual",
    }));
    getCustomerById();
  }, [mainImagename]);

  return (
    <div>
      <div className="my-2">
        <Link href={"/customer"}>
          <button type="button" className="btn btn-primary">
            {" "}
            <IconArrowBackward className="ltr:mr-2 rtl:ml-2" />
            Back to Customers List{" "}
          </button>{" "}
        </Link>
      </div>

      <div className="flex">
        <div className="mr-4 w-3/4 rounded-lg">
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div className="w-100 my-2 mr-4 rounded-lg border border-gray-300 p-4">
              <div className="mb-2 mt-[-30px]">
                <Tippy content="Basic Information" placement="top">
                  <button type="button" className="btn btn-dark">
                    Basic Information
                  </button>
                </Tippy>
              </div>

              <div>
                <div className="flex">
                  <div className="mr-4 w-1/4 rounded-lg">
                    <div className="flex">
                      <Image
                        src={mainImage}
                        width="100"
                        height="100"
                        alt="Example Image"
                      />

                      <div className="mt-[50px]">
                        {" "}
                        <IconPencil onClick={() => setModal1(true)} />
                      </div>
                    </div>
                    <div className="mb-5">
                      <Transition appear show={modal1} as={Fragment}>
                        <Dialog
                          as="div"
                          open={modal1}
                          onClose={() => setModal1(false)}
                        >
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
                                    <div className="text-lg font-bold">
                                      Image Upload
                                    </div>
                                  </div>
                                  <div className="p-5">
                                    <div
                                      className="custom-file-container"
                                      data-upload-id="myFirstImage"
                                    >
                                      <div className="label-container">
                                        <label>Upload </label>
                                        <button
                                          type="button"
                                          className="custom-file-container__image-clear"
                                          title="Clear Image"
                                          onClick={() => {
                                            setImages([]);
                                          }}
                                        >
                                          ×
                                        </button>
                                      </div>
                                      <label className="custom-file-container__custom-file"></label>
                                      <input
                                        type="file"
                                        className="custom-file-container__custom-file__custom-file-input"
                                        accept="image/*"
                                      />
                                      <input
                                        type="hidden"
                                        name="MAX_FILE_SIZE"
                                        value="10485760"
                                      />
                                      <ImageUploading
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                      >
                                        {({
                                          imageList,
                                          onImageUpload,
                                          onImageRemoveAll,
                                          onImageUpdate,
                                          onImageRemove,
                                          isDragging,
                                          dragProps,
                                        }) => (
                                          <div className="upload__image-wrapper">
                                            <button
                                              className="custom-file-container__custom-file__custom-file-control"
                                              onClick={onImageUpload}
                                            >
                                              Choose File...
                                            </button>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                              <div
                                                key={index}
                                                className="custom-file-container__image-preview relative"
                                              >
                                                <img
                                                  src={image.dataURL}
                                                  alt="img"
                                                  className="m-auto"
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </ImageUploading>
                                      {images.length === 0 ? (
                                        <img
                                          src="/assets/images/file-preview.svg"
                                          className="m-auto w-full max-w-md"
                                          alt=""
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="mt-8 flex items-center justify-end">
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => setModal1(false)}
                                      >
                                        Discard
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                        onClick={() => handelImage()}
                                      >
                                        Save
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
                  </div>
                  <div className="mr-4 w-3/4 rounded-lg">
                    <div>
                      <label htmlFor="ctnTextarea">Comments</label>
                      <input
                        id="imagname"
                        type="text"
                        name="imagename"
                        value={mainImagename}
                        onChange={handleChange}
                      />

                      <textarea
                        id="ctnTextarea"
                        rows={3}
                        className="form-textarea"
                        placeholder="Enter Comments"
                        required
                        onChange={handleChange}
                        name="comment"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 mr-4 rounded-lg border border-gray-300 p-4">
              <div className="mb-2  mt-[-30px]">
                <Tippy content="Customer Porfile" placement="top">
                  <button type="button" className="btn btn-dark">
                    Customer Porfile
                  </button>
                </Tippy>
              </div>
              <div className="my-5 flex">
                <div className="mx-2 font-bold">
                  <label htmlFor="groupFname">Type</label>
                </div>
                <div>
                  <label className="mr-5 flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name="ctype"
                      className="form-radio"
                      defaultChecked
                      onChange={handleChange}
                      value="Individual"
                    />
                    <span className="text-white-dark">Individual</span>
                  </label>
                </div>
                <div>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="radio"
                      name="ctype"
                      className="form-radio"
                      onChange={handleChange}
                      value="Business"
                    />
                    <span className="text-white-dark">Business</span>
                  </label>
                </div>
              </div>
              <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="groupFname">First Name</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    className="form-input"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="groupLname">Middile Name</label>
                  <input
                    id="groupLname"
                    type="text"
                    name="middleName"
                    placeholder="Enter Last Name"
                    className="form-input"
                    onChange={handleChange}
                    value={formData.middleName}
                  />
                </div>
                <div>
                  <label htmlFor="groupLname">Last Name</label>
                  <input
                    id="groupLname"
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    className="form-input"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
              </div>
              <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="groupLname">DOB</label>
                  <Flatpickr
                    name="dob"
                    value={date1}
                    options={{
                      dateFormat: "Y-m-d",
                      position: isRtl ? "auto right" : "auto left",
                    }}
                    className="form-input"
                    onChange={(date) => setDate1(date)}
                  />
                </div>

                <div>
                  <label htmlFor="groupLname">Country Of Birth</label>
                  <select
                    id="ctnSelect1"
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                    name="countryOfBirth"
                    value={formData.countryOfBirth}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>{" "}
                </div>

                <div>
                  <label htmlFor="groupLname">Nationality</label>
                  <select
                    id="ctnSelect2"
                    name="nationality"
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                    value={formData.nationality}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>{" "}
                </div>
              </div>
              <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="ctnEmail">Email address</label>
                  <input
                    id="ctnEmail"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="form-input"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>

                <div>
                  <label htmlFor="groupLname">Occupation</label>
                  <select
                    id="ctnSelect2"
                    name="occupation"
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                    value={formData.occupation}
                  >
                    <option value="">Select a Occupation</option>
                    {Occupation.map((occupation) => (
                      <option key={occupation} value={occupation}>
                        {occupation}
                      </option>
                    ))}
                  </select>{" "}
                </div>
              </div>
              <div className="my-5 flex gap-10">
                <div>
                  <label htmlFor="groupLname">Country</label>
                  <select
                    id="ctnSelect2"
                    name="country"
                    className="form-select text-white-dark"
                    required
                    onChange={handleChange}
                    value={formData.country}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>{" "}
                </div>
                <div>
                  <label htmlFor="groupFname">State</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    className="form-input"
                    onChange={handleChange}
                    value={formData.state}
                  />
                </div>

                <div>
                  <label htmlFor="groupFname">City</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    className="form-input"
                    onChange={handleChange}
                    value={formData.city}
                  />
                </div>
              </div>
              <div className="my-5">
                <label htmlFor="ctnTextarea">Address</label>
                <textarea
                  id="ctnTextarea"
                  rows={3}
                  className="form-textarea"
                  name="address"
                  onChange={handleChange}
                  placeholder="Enter Address"
                  value={formData.address}
                  required
                ></textarea>
              </div>
              <div className="flex gap-10">
                <div>
                  <label htmlFor="groupFname">Zip</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    placeholder="Enter Zip"
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="groupFname">Mobile</label>
                  <input
                    id="groupFname"
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile No"
                    className="form-input"
                    onChange={handleChange}
                    value={formData.mobile}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary !mt-6">
                Submit
              </button>{" "}
            </div>
          </form>{" "}
        </div>

        <div className="w-1/4 rounded-lg">
          <div className="w-100 my-2 rounded-lg border border-gray-300 p-4">
            <div className="mb-2  mt-[-30px]">
              <Tippy content="kassi information" placement="top">
                <button type="button" className="btn btn-dark">
                  kassi information
                </button>
              </Tippy>
            </div>
            <div className="justify-content: space-between flex">
              <button type="button" className="btn btn-primary mb-2 mr-2">
                1.Create Customer
              </button>
              <button type="button" className="btn btn-info mb-2 ml-2">
                2.Run KYC
              </button>
            </div>
            <button type="button" className="btn btn-warning">
              3.Get Deporit Account
            </button>
          </div>

          <div className="w-100 mt-10 rounded-lg border border-gray-300 p-4">
            <div className="mb-2  mt-[-30px]">
              <Tippy content="Customer Statistics" placement="top">
                <button type="button" className="btn btn-dark">
                  Customer Statistics
                </button>
              </Tippy>
            </div>
            <div className="mb-2 flex">
              <label htmlFor="hrDefaultinput" className="mr-2">
                Profile Completed
              </label>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked
                />
                <span className=" text-white-dark"></span>
              </label>
            </div>

            <div className="mb-2  flex">
              <label htmlFor="hrDefaultinput" className="mr-2">
                Flag
              </label>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked
                />
                <span className=" text-white-dark"></span>
              </label>
            </div>

            <div className="mb-2  flex">
              <label htmlFor="hrDefaultinput" className="mr-2">
                Identity Verified?
              </label>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked
                />
                <span className=" text-white-dark"></span>
              </label>
            </div>

            <div className="mb-2  flex">
              <label htmlFor="hrDefaultinput" className="mr-2">
                Address Verified?
              </label>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked
                />
                <span className=" text-white-dark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Basic;
