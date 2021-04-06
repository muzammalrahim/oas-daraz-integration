import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useSuppliersUIContext } from "../SuppliersUIContext";
import {SupplierConditionTitles, YES_NO_OPTIONS, UOM_CHOICES} from "../SuppliersUIHelpers";

const prepareFilter = (queryParams, values) => {
  const { status, condition, hazmat, unit_of_measure, hot_sale_item, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? status : undefined;
  // Filter by condition
  filter.condition = condition !== "" ? condition : undefined;
  filter.unit_of_measure = unit_of_measure !== "" ? unit_of_measure : undefined;
  filter.hot_sale_item = hot_sale_item !== "" ? hot_sale_item : undefined;
  filter.hazmat = hazmat !== "" ? hazmat : undefined;
  // Filter by all fields
  filter.search = searchText;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function SuppliersFilter({ listLoading }) {
  // Suppliers UI Context
  const suppliersUIContext = useSuppliersUIContext();
  const suppliersUIProps = useMemo(() => {
    return {
      setQueryParams: suppliersUIContext.setQueryParams,
      queryParams: suppliersUIContext.queryParams,
    };
  }, [suppliersUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(suppliersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, suppliersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      suppliersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          company_name: "", // values => All=""/Selling=0/Sold=1
          contact_person: "", // values => All=""/New=0/Used=1
          searchText: "", 
          country:"", 
          mobile_Phone:"", 
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              {/* <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by condition"
                  name="condition"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("condition", e.target.value);
                    handleSubmit();
                  }}
                  value={values.condition}
                >
                  <option value="">All</option>
                  {SupplierConditionTitles.map((condition, i) => 
                    <option key={i} value={condition}>{condition}</option>)
                  }
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Condition
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by UOM"
                  name="unit_of_measure"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("unit_of_measure", e.target.value);
                    handleSubmit();
                  }}
                  value={values.unit_of_measure}
                >
                  <option value="">All</option>
                  {UOM_CHOICES.map((opt, i) => 
                    <option key={i} value={opt}>{opt}</option>)
                  }
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by UOM
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Hazmat"
                  name="hazmat"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("hazmat", e.target.value);
                    handleSubmit();
                  }}
                  value={values.hazmat}
                >
                  <option value="">All</option>
                  {YES_NO_OPTIONS.map((opt, i) => 
                    <option key={i} value={opt}>{opt}</option>)
                  }
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Hazmat
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Hot Sale Item"
                  name="hot_sale_item"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("hot_sale_item", e.target.value);
                    handleSubmit();
                  }}
                  value={values.hot_sale_item}
                >
                  <option value="">All</option>
                  {YES_NO_OPTIONS.map((opt, i) => 
                    <option key={i} value={opt}>{opt}</option>)
                  }
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Hot Sale Item
                </small>
              </div> */}
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
