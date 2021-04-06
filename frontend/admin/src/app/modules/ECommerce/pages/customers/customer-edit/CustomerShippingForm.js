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
  ShippingStatusTitles,
  YES_NO_OPTIONS,
  UOM_CHOICES,
  ShippingConditionTitles,
} from "../CustomersUIHelpers";
import { list, loadOptions, DROPDOWN_WAIT, post } from "../../../../../pages/helper/api";

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);
// Validation schema
const CustomerEditSchema = Yup.object().shape({
  // company_name: Yup.string()
  //   .min(2, "Minimum 2 symbols")
  //   .max(50, "Maximum 50 symbols")
  //   .required("Company Name is required"),
  // customer_category: Yup.string(),
  // supplier: Yup.string(),
  // customer_manufacturer: Yup.string(),
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

export default function CustomerEditForm({
  customer,
  btnRef,
  saveCustomer,
  countries,
  modelsLoaded
}) {

  // const [countries, setCountries] = useState([]);
  // const [modelsLoaded, setModelsLoaded] = useState(false);

  // useEffect(() => {
  //   loadModels();
  // }, []);

  // function loadModels() {
  //   let models = {
  //     'Country':{},
  //   }
  //   post('oas-models', {models:models}).then(function(response){
  //     for(let opt in response.data){
  //       response.data[opt].map((row, i) => {
  //         response.data[opt][i].label = row.name ? row.name : row.company_name;
  //         response.data[opt][i].value = row.id;
  //       })
  //     }

  //     setCountries(response.data.Country);
  //     setModelsLoaded(true);
  //   })
  // }





  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="shippingcontact.email"
                    component={Input}
                    placeholder="Email"
                    label="Email"
                  />
                </div>

                <div className="col-lg-4">
                  <Field
                    name="shippingcontact.company_name"
                    component={Input}
                    placeholder="xbs"
                    label="Company Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="shippingcontact.contact_person"
                    component={Input}
                    placeholder="e.g AB123"
                    label="Contact Person"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="shippingcontact.bill_address_one"
                    component={Input}
                    placeholder="Bill Address "
                    label="Bill Address One"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="shippingcontact.bill_address_two"
                    component={Input}
                    placeholder="Bill Address "
                    label="Bill Address Two"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="shippingcontact.zip_code"
                    component={Input}
                    placeholder="Zip Code "
                    label="Zip Code"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <label>Country</label>
                  <AsyncPaginate
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    name="shippingcontact.country"
                    isClearable = {true}
                    loadOptions={(search, prevOptions) => loadOptions(search, prevOptions, countries, modelsLoaded)}
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
