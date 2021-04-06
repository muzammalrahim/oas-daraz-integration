import React from "react";
import { Route } from "react-router-dom";
import { SuppliersLoadingDialog } from "./suppliers-loading-dialog/SuppliersLoadingDialog";
import { SupplierDeleteDialog } from "./supplier-delete-dialog/SupplierDeleteDialog";
import { SuppliersDeleteDialog } from "./suppliers-delete-dialog/SuppliersDeleteDialog";
import { SuppliersFetchDialog } from "./suppliers-fetch-dialog/SuppliersFetchDialog";
import { SuppliersUpdateStatusDialog } from "./suppliers-update-status-dialog/SuppliersUpdateStatusDialog";
import { SuppliersCard } from "./SuppliersCard";
import { SuppliersUIProvider } from "./SuppliersUIContext";
import {ADMIN_ROUTE} from '../../../../pages/helper/api'

export function SuppliersPage({ history }) {
  const suppliersUIEvents = {
    newSupplierButtonClick: () => {
      history.push(`/${ADMIN_ROUTE}/suppliers/new`);
    },
    openEditSupplierPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/suppliers/${id}/edit`);
    },
    openDeleteSupplierDialog: (id) => {
      history.push(`/${ADMIN_ROUTE}/suppliers/${id}/delete`);
    },
    openDeleteSuppliersDialog: () => {
      history.push(`/${ADMIN_ROUTE}/suppliers/deleteSuppliers`);
    },
    openFetchSuppliersDialog: () => {
      history.push(`/${ADMIN_ROUTE}/suppliers/fetch`);
    },
    openUpdateSuppliersStatusDialog: () => {
      history.push("/"+ADMIN_ROUTE+"/suppliers/updateStatus");
    },
  };

  return (
    <SuppliersUIProvider suppliersUIEvents={suppliersUIEvents}>
      <SuppliersLoadingDialog />
      <Route path={"/"+ADMIN_ROUTE+"/suppliers/deleteSuppliers"}>
        {({ history, match }) => (
          <SuppliersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/suppliers");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/suppliers/:id/delete"}>
        {({ history, match }) => (
          <SupplierDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/suppliers");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/suppliers/fetch"}>
        {({ history, match }) => (
          <SuppliersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/suppliers");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/suppliers/updateStatus"}>
        {({ history, match }) => (
          <SuppliersUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/suppliers");
            }}
          />
        )}
      </Route>
      <SuppliersCard />
    </SuppliersUIProvider>
  );
}
