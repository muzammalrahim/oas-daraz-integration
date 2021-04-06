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
  SupplierStatusTitles,
  YES_NO_OPTIONS,
  UOM_CHOICES,
  SupplierConditionTitles,
} from "../SuppliersUIHelpers";
import { list, loadOptions, DROPDOWN_WAIT, post } from "../../../../../pages/helper/api";

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);
// Validation schema
const SupplierEditSchema = Yup.object().shape({
  company_name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Company Name is required"),
  // supplier_category: Yup.string(),
  // supplier: Yup.string(),
  // supplier_manufacturer: Yup.string(),
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

export function SupplierEditForm({
  supplier,
  btnRef,
  saveSupplier,
}) {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (supplier.id) {
      countries.map(country => {
        if(country.id === supplier.country) 
          setCountry(country);
      })
    }
  }, [supplier]);

  function loadModels() {
    let models = {
      'Country':{},
    }
    post('oas-models', {models:models}).then(function(response){
      for(let opt in response.data){
        response.data[opt].map((row, i) => {
          response.data[opt][i].label = row.name ? row.name : row.country;
          response.data[opt][i].value = row.id;


          if(opt === 'Country' && row.value === supplier.country)
            setCountry(row);

        })
      }

      setCountries(response.data.Country);
      setModelsLoaded(true);
    })
  }

  

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={supplier}
        validationSchema={SupplierEditSchema}
        onSubmit={(values) => {
          saveSupplier(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="company_name"
                    component={Input}
                    placeholder="Company Name"
                    label="Company Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="contact_person"
                    component={Input}
                    placeholder="Contact Person"
                    label="Contact Person"
                  />
                </div>
                <div className="col-lg-4">
                  <Field 
                     name="email"
                     component={Input}
                     placeholder="Email"
                     label="Email"
                  />
                </div>
              </div>
              <div className="form-group row">
              <div className="col-lg-4">
                  <label>Country</label>
                  <AsyncPaginate
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    isClearable = {false}
                    onChange= {(value) => {
                      setFieldValue('country', value.value);
                      setCountry(value);
                    }}
                    value={country}
                    name="country"
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, countries,  modelsLoaded)}
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="landline_phone"
                    component={Input}
                    placeholder="Landline Phone"
                    label="Landline Phone"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="mobile_Phone"
                    component={Input}
                    placeholder="Mobile Phone"
                    label="Mobile Phone"
                  />
                </div>
               
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
