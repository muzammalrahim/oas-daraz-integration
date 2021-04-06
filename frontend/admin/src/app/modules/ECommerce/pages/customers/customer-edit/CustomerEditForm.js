// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select as MSelect,
} from "../../../../../../_metronic/_partials/controls";
import Creatable from "react-select/creatable";
import { withAsyncPaginate, AsyncPaginate } from "react-select-async-paginate";

import Select from "react-select";
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  CustomerStatusTitles,
  YES_NO_OPTIONS,
  UOM_CHOICES,
  CustomerConditionTitles,
} from "../CustomersUIHelpers";
import {
  list,
  loadOptions,
  DROPDOWN_WAIT,
  post,
} from "../../../../../pages/helper/api";

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);
// Validation schema
const CustomerEditSchema = Yup.object().shape({
  company_name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Company Name is required"),
  user: Yup.object({
    email: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Company Name is required"),
  })
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

export function CustomerEditForm({ customer, btnRef, saveCustomer, modelsLoaded, countries }) {

  

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
                    name="user.first_name"
                    component={Input}
                    placeholder="First Name"
                    label="First Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="user.last_name"
                    component={Input}
                    placeholder="Last Name"
                    label="Last Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="user.email"
                    component={Input}
                    placeholder="Email"
                    label="Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="company_name"
                    component={Input}
                    placeholder="xbs"
                    label="Company Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="contact_person"
                    component={Input}
                    placeholder="e.g AB123"
                    label="Contact Person"
                  />
                </div>
                <div className="col-lg-4">
                  <label>Country</label>
                  <AsyncPaginate
                    debounceTimeout={!modelsLoaded ? DROPDOWN_WAIT : 0}
                    name="country"
                    isClearable={true}
                    loadOptions={(search, prevOptions) =>
                      loadOptions(search, prevOptions, countries, modelsLoaded)
                    }
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="landline_phone"
                    component={Input}
                    placeholder="041457078"
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
