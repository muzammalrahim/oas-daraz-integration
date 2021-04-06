import React from "react";
import { Route } from "react-router-dom";
import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
import { CustomerDeleteDialog } from "./customer-delete-dialog/CustomerDeleteDialog";
import { CustomersDeleteDialog } from "./customers-delete-dialog/CustomersDeleteDialog";
import { CustomersFetchDialog } from "./customers-fetch-dialog/CustomersFetchDialog";
import { CustomersUpdateStatusDialog } from "./customers-update-status-dialog/CustomersUpdateStatusDialog";
import { CustomersCard } from "./CustomersCard";
import { CustomersUIProvider } from "./CustomersUIContext";
import {ADMIN_ROUTE} from '../../../../pages/helper/api'

export function CustomersPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push(`/${ADMIN_ROUTE}/customers/new`);
    },
    openEditCustomerPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/customers/${id}/edit`);
    },
    openViewCustomerPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/customers/${id}/view`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/${ADMIN_ROUTE}/customers/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/${ADMIN_ROUTE}/customers/deleteCustomers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/${ADMIN_ROUTE}/customers/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push("/"+ADMIN_ROUTE+"/customers/updateStatus");
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path={"/"+ADMIN_ROUTE+"/customers/deleteCustomers"}>
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/customers");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/customers/:id/delete"}>
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/customers");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/customers/fetch"}>
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/customers");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/customers/updateStatus"}>
        {({ history, match }) => (
          <CustomersUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/customers");
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
