"use client"
import IconArrowBackward from "@/components/icon/icon-arrow-backward";
import PanelCodeHighlight from "@/components/panel-code-highlight";
import { Metadata } from "next";
import Link from "next/link";
import React, { useState } from 'react';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';

const Basic = () => {

  const [ formData, setFormData] = useState({
    customername : '',
    documenttype :'',
    documentstatus :'',
    validationsource:'',
    number : '',
    issue :'',
    state :'',
    cardnumber :'',
    description :'',
  });

  const handleChange = (e:any,date) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event:any) => {
	event.preventDefault();
	
	console.log(formData);
	};




  return (
    <div>
      <Link href={"/document"}>
        <button type="button" className="btn btn-primary">
          {" "}
          <IconArrowBackward className="ltr:mr-2 rtl:ml-2" />
          Back to Document List{" "}
        </button>{" "}
      </Link>

      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div className="mb-5">
          <form className="space-y-5" onSubmit={handleFormSubmit}>

          <div>
              <label htmlFor="ctnFile">Drop pdf or image file here</label>
              <input
                id="ctnFile"
                type="file"
                className="rtl:file-ml-5 form-input p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="groupFname">Customer Name</label>
              <input
                id="groupFname"
                type="text"
                name="customername"
                placeholder="Enter Name"
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="ctnSelect1">Document type</label>
              <select className="form-select text-white-dark" name='documenttype' onChange={handleChange}>
                <option>Driver's license</option>
                <option>Passport</option>
                <option>Tazkera</option>
                <option>refuje card</option>
                <option>proof of age</option>
              </select>
            </div>

            <div>
              <label htmlFor="ctnSelect1">Document status</label>
              <select className="form-select text-white-dark" name='documentstatus' onChange={handleChange}>
                <option>pending</option>
                <option>approved</option>
                <option>expired</option>
                <option>rejected</option>
                <option>deleted</option>
              </select>
            </div>

            <div>
              <label htmlFor="groupFname">Validation Source</label>
              <input
                id="groupFname"
                type="text"
                name="validationsource"
                placeholder="Enter validation source"
                onChange={handleChange}
                className="form-input"
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
              />
            </div>

            <div>
              <label htmlFor="groupFname">State</label>
              <input
                id="groupFname"
                type="text"
                name="state"
                className="form-input"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="groupFname">Card Number</label>
              <input
                id="groupFname"
                type="text"
                name="cardnumber"
                className="form-input"
                onChange={handleChange}
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
                <span className=" text-white-dark">Is Identity</span>
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
                <span className=" text-white-dark">Is address</span>
              </label>
            </div>

            <div>
              <label htmlFor="ctnTextarea">Description</label>
              <textarea
                id="ctnTextarea"
                rows={3}
                className="form-textarea"
                name='description'
                onChange={handleChange}
                required
              ></textarea>
            </div>
 
            <button type="submit" className="btn btn-primary !mt-6">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Basic;
