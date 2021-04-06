/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/customers/customersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../customer-remarks/RemarksUIContext";
import { Remarks } from "../customer-remarks/Remarks";
import { ADMIN_ROUTE, STATIC_URL, getDateFormat } from "../../../../../pages/helper/api";
import {Paper, Grid} from "@material-ui/core";


export function CustomerView({
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
  const [saveClick, setSaveClick] = useState(false);
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, customer } = useSelector(
    (state) => ({
      actionsLoading: state.customers.actionsLoading,
      customer: state.customers.customerForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "View Customer";
    if (customer && id) {
      _title = `View customer - ${customer ? customer.user_first_name+' '+customer.user_last_name : ''}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, id]);

  const editCustomerClick = () => {
    history.push(`/${ADMIN_ROUTE}/customers/${customer.id}/edit`);
  };

  const backToCustomersList = () => {
    history.push(`/${ADMIN_ROUTE}/customers`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCustomersList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-info ml-2"
            onClick={editCustomerClick}
          >
            Edit
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
                                <div className="kt_detail__item_title">Email</div>
                                <div>{customer?.email ? customer.email : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Company Name</div>
                                <div>{customer?.company_name ? customer.company_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Contact Person</div>
                                <div>{customer?.contact_person ? customer.contact_person : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Last Name</div>
                                <div>{customer?.country_name ? customer.country_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Landing Phone</div>
                                <div>{customer?.landing_phone ? customer.landing_phone : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Quantity</div>
                                <div>{customer?.mobile_phone ? customer.mobile_phone : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Created At</div>
                                <div>{customer?.created_at ? getDateFormat(customer.created_at) : '---'}</div>
                            </div>
                        </div>

                        <br/>
                        <div className="row"><div className="col-12"> <h4>Billing Address </h4></div></div>
                        <hr/>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Email</div>
                                <div>{customer?.billingcontact ? customer.billingcontact.email : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Company Name</div>
                                <div>{customer?.b ? customer.billingcontact.company_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Billing Address 1</div>
                                <div>{customer?.billingcontact ? customer.billingcontact.billing_address_one : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Billing Address 2</div>
                                <div>{customer?.billingcontact ? customer.billingcontact.billing_address_two : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Zip Code</div>
                                <div>{customer?.billingcontact ? customer.billingcontact.zip_code : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Country</div>
                                <div>{customer?.billingcontact ? customer.billingcontact.country_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Contact Person</div>
                                <div>{customer?.billingcontact ? customer.billingcontact.contact_person : '---'}</div>
                            </div>
                        </div>
                        <br/>
                        <div className="row"><div className="col-12"> <h4>Shipping Address </h4> </div></div>
                        <hr/>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Email</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.email : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Company Name</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.company_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Billing Address 1</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.billing_address_one : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Billing Address 2</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.billing_address_two : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Zip Code</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.zip_code : '---'}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Country</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.country_name : '---'}</div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Contact Person</div>
                                <div>{customer?.shippingcontact ? customer.shippingcontact.contact_person : '---'}</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row mb-4">
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Date Created</div>
                                <div>{getDateFormat(customer?.created_at)}</div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="kt_detail__item_title">Date Modified</div>
                                <div>{getDateFormat(customer?.updated_at)}</div>
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
