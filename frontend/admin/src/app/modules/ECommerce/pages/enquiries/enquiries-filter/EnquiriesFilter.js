import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useEnquiriesUIContext } from "../EnquiriesUIContext";
import {EnquiryConditionTitles, YES_NO_OPTIONS, UOM_CHOICES} from "../EnquiriesUIHelpers";

const prepareFilter = (queryParams, values) => {
  const { searchText, status } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by all fields
  filter.search = searchText;
  filter.status = status ? status : undefined;

  newQueryParams.filter = filter;
  return newQueryParams;
};

export function EnquiriesFilter({ listLoading }) {
  // Enquiries UI Context
  const enquiriesUIContext = useEnquiriesUIContext();
  const enquiriesUIProps = useMemo(() => {
    return {
      setQueryParams: enquiriesUIContext.setQueryParams,
      queryParams: enquiriesUIContext.queryParams,
    };
  }, [enquiriesUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(enquiriesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, enquiriesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      enquiriesUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: "",
          status: "", 
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
              <div className="col-lg-4">
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
                  <option value="FULFILLED">FULFILLED</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
