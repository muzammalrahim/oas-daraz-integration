/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/enquiries/enquiriesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Specifications } from "../enquiry-specifications/Specifications";
import { SpecificationsUIProvider } from "../enquiry-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../enquiry-remarks/RemarksUIContext";
import { Remarks } from "../enquiry-remarks/Remarks";
import { ADMIN_ROUTE, STATIC_URL, getDateFormat } from "../../../../../pages/helper/api";
import {Paper, Grid} from "@material-ui/core";
// import moment from "moment";


export function EnquiryView({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, enquiry } = useSelector(
    (state) => ({
      actionsLoading: state.enquiries.actionsLoading,
      enquiry: state.enquiries.enquiryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchEnquiry(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "View Enquiry";
    if (enquiry && id) {
      _title = `View enquiry - ${enquiry?.email_address || enquiry?.part_number?.part_number}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiry, id]);


  const editEnquiryClick = () => {
    history.push(`/${ADMIN_ROUTE}/orders/${enquiry.id}/edit`);
  };

  const backToEnquiriesList = () => {
    history.push(`/${ADMIN_ROUTE}/orders`);
  };
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToEnquiriesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <div className="kt_section__detail">
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Email Address</div>
                                <div>{enquiry?.email_address ? enquiry.email_address : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Company</div>
                                <div>{enquiry?.company?.company_name ? enquiry.company.company_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Country</div>
                                <div>{enquiry?.country?.name ? enquiry.country.name : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Phone Number</div>
                                <div>{enquiry?.phone_number ? enquiry.phone_number : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title"> Inquiry Date</div>
                                <div>{getDateFormat(enquiry?.created_at)}</div>
                            </div>
                        </div> <hr />
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                              {enquiry && enquiry.part_number.map(pn=>{
                               return <>
                                <div className="kt_detail__item_title">Part Number</div>
                                <div>{pn?.part_number ? pn?.part_number : '---'}</div>
                                </>
                              })}
                                
                            </div>
                        </div>

                    </div>
                </Grid>
          </Grid>
        </div>
      </CardBody>
    </Card>
  );
}
