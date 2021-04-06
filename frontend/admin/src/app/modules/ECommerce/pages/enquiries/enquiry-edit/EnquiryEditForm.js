// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select as MSelect } from "../../../../../../_metronic/_partials/controls";
import Creatable from "react-select/creatable";
import { withAsyncPaginate, AsyncPaginate } from "react-select-async-paginate";

import Select from 'react-select';
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  EnquiryStatusTitles,
  YES_NO_OPTIONS,
  UOM_CHOICES,
  EnquiryConditionTitles,
} from "../EnquiriesUIHelpers";
import { list, loadOptions, DROPDOWN_WAIT, post } from "../../../../../pages/helper/api";

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);
// Validation schema
const EnquiryEditSchema = Yup.object().shape({
  part_number: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Part number is required"),
  alt_part_number: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Alt part number is required"),
  // enquiry_category: Yup.string(),
  // supplier: Yup.string(),
  // enquiry_manufacturer: Yup.string(),
  // unit_price: Yup.number(),
  // condition: Yup.string()
  //   .min(2, "Minimum 2 symbols")
  //   .max(50, "Maximum 2 symbols"),
  // quantity: Yup.number()
  //   .min(0, "Quantity can'be negative"),
  // tag_date: Yup.date(),
  // turn_around_time: Yup.string(),
  // hazmat: Yup.string(),
  // certification: Yup.string(),
  // unit_of_measure: Yup.string(),
  // hot_sale_item: Yup.string(),
  // status: Yup.string(),
});

export function EnquiryEditForm({
  enquiry,
  btnRef,
  saveEnquiry,
}) {

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  function loadModels() {
    let models = {
      'Manufacturer':{},
      'Supplier':{},
      'EnquiryCategory':{},
    }
    post('oas-models', {models:models}).then(function(response){
      for(let opt in response.data){
        response.data[opt].map((row, i) => {
          response.data[opt][i].label = row.name ? row.name : row.company_name;
          response.data[opt][i].value = row.id;
        })
      }

      setCategories(response.data.EnquiryCategory);
      setManufacturers(response.data.Manufacturer);
      setSuppliers(response.data.Supplier);
      setModelsLoaded(true);
    })
  }

  function createCategory(option) {
    post('enquiry-category', {name:option}).then(function(response){
      setCategories([...categories, {label:response.name, value:response.id}]);
    })
  }

  function createManfacturer(option) {
    post('manufacturer', {name:option}).then(function(response){
      setCategories([...manufacturers, {label:response.name, value:response.id}]);
    })
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={enquiry}
        validationSchema={EnquiryEditSchema}
        onSubmit={(values) => {
          saveEnquiry(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="part_number"
                    component={Input}
                    placeholder="e.g AB123"
                    label="Part Number"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="alt_part_number"
                    component={Input}
                    placeholder="e.g AB123"
                    label="Alternative Part Number"
                  />
                </div>
                <div className="col-lg-4">
                  <label>Select Category</label>
                  <CreatableAsyncPaginate
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    name="enquiry_category"
                    onCreateOption={createCategory}
                    isClearable = {true}
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, categories, modelsLoaded)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <label>Select Manufacturer</label>
                  <CreatableAsyncPaginate 
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    isClearable = {true}
                    name="enquiry_manufacturer" 
                    onCreateOption={createManfacturer}
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, manufacturers, modelsLoaded)}
                  />
                </div>
                <div className="col-lg-4">
                  <label>Select Supplier</label>
                  <AsyncPaginate 
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    isClearable = {true}  
                    name="supplier" 
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, suppliers, modelsLoaded)}
                  />
                </div>
                <div className="col-lg-4">
                  <MSelect name="condition" label="Condition">
                    {EnquiryConditionTitles.map((condition, index) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </MSelect>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="quantity"
                    component={Input}
                    placeholder="Default 0"
                    label="Quantity"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="tag_date"
                    component={Input}
                    placeholder=""
                    label="Tag Date"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="turn_around_time"
                    component={Input}
                    placeholder=""
                    label="Turn around time"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <MSelect name="hazmat" label="Hazmat">
                    {YES_NO_OPTIONS.map((status, index) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
                <div className="col-lg-4">
                  <Field
                    name="certification"
                    component={Input}
                    placeholder=""
                    label="Certification"
                  />
                </div>
                <div className="col-lg-4">
                  <MSelect name="unit_of_measure" label="Unit of measure">
                    {UOM_CHOICES.map((status, index) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="unit_price"
                    component={Input}
                    placeholder=""
                    label="Unit price"
                  />
                </div>
                <div className="col-lg-4">
                  <MSelect name="hot_sale_item" label="Hot sale item">
                    {YES_NO_OPTIONS.map((status, index) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
                <div className="col-lg-4">
                  <MSelect name="status" label="Status">
                    {EnquiryStatusTitles.map((status, index) => (
                      <option key={status} value={index}>
                        {status}
                      </option>
                    ))}
                  </MSelect>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
