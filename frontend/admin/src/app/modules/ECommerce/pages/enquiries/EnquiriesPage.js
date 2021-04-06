import React from "react";
import { Route } from "react-router-dom";
import { EnquiriesLoadingDialog } from "./enquiries-loading-dialog/EnquiriesLoadingDialog";
import { EnquiryDeleteDialog } from "./enquiry-delete-dialog/EnquiryDeleteDialog";
import { EnquiriesDeleteDialog } from "./enquiries-delete-dialog/EnquiriesDeleteDialog";
import { EnquiriesFetchDialog } from "./enquiries-fetch-dialog/EnquiriesFetchDialog";
import { EnquiriesUpdateStatusDialog } from "./enquiries-update-status-dialog/EnquiriesUpdateStatusDialog";
import { EnquiriesCard } from "./EnquiriesCard";
import { EnquiriesUIProvider } from "./EnquiriesUIContext";
import {ADMIN_ROUTE} from '../../../../pages/helper/api'

export function EnquiriesPage({ history }) {
  const enquiriesUIEvents = {
    newEnquiryButtonClick: () => {
      history.push(`/${ADMIN_ROUTE}/orders/new`);
    },
    openEditEnquiryPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/orders/${id}/edit`);
    },
    openViewEnquiryPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/orders/${id}/view`);
    },
    openDeleteEnquiryDialog: (id) => {
      history.push(`/${ADMIN_ROUTE}/orders/${id}/delete`);
    },
    openDeleteEnquiriesDialog: () => {
      history.push(`/${ADMIN_ROUTE}/orders/deleteEnquiries`);
    },
    openFetchEnquiriesDialog: () => {
      history.push(`/${ADMIN_ROUTE}/orders/fetch`);
    },
    openUpdateEnquiriesStatusDialog: () => {
      history.push("/"+ADMIN_ROUTE+"/orders/updateStatus");
    },
  };

  return (
    <EnquiriesUIProvider enquiriesUIEvents={enquiriesUIEvents}>
      <EnquiriesLoadingDialog />
      <Route path={"/"+ADMIN_ROUTE+"/orders/deleteEnquiries"}>
        {({ history, match }) => (
          <EnquiriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/orders");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/orders/:id/delete"}>
        {({ history, match }) => (
          <EnquiryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/orders");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/orders/fetch"}>
        {({ history, match }) => (
          <EnquiriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/orders");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/orders/updateStatus"}>
        {({ history, match }) => (
          <EnquiriesUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/orders");
            }}
          />
        )}
      </Route>
      <EnquiriesCard />
    </EnquiriesUIProvider>
  );
}
