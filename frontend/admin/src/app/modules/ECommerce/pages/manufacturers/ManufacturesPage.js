import React from "react";
import { Route } from "react-router-dom";
import { ManufacturesLoadingDialog } from "./manufactures-loading-dialog/ManufacturesLoadingDialog";
import { ManufactureDeleteDialog } from "./manufacture-delete-dialog/ManufactureDeleteDialog";
import { ManufacturesDeleteDialog } from "./manufactures-delete-dialog/ManufacturesDeleteDialog";
import { ManufacturesFetchDialog } from "./manufactures-fetch-dialog/ManufacturesFetchDialog";
import { ManufacturesUpdateStatusDialog } from "./manufactures-update-status-dialog/ManufacturesUpdateStatusDialog";
import  {ManufacturesCard}  from "./ManufactureCard";
import { ManufacturesUIProvider } from "./ManufacturesUIContext";
import {ADMIN_ROUTE} from '../../../../pages/helper/api'

export function ManufacturesPage({ history }) {
  const ManufacturesUIEvents = {
    newManufactureButtonClick: () => {
      history.push(`/${ADMIN_ROUTE}/manufactures/new`);
    },
    openEditManufacturePage: (id) => {
      history.push(`/${ADMIN_ROUTE}/manufactures/${id}/edit`);
    },
    openDeleteManufactureDialog: (id) => {
      history.push(`/${ADMIN_ROUTE}/manufactures/${id}/delete`);
    },
    openDeleteManufacturesDialog: () => {
      history.push(`/${ADMIN_ROUTE}/manufactures/deleteManufactures`);
    },
    openFetchManufacturesDialog: () => {
      history.push(`/${ADMIN_ROUTE}/manufactures/fetch`);
    },
    openUpdateManufacturesStatusDialog: () => {
      history.push("/"+ADMIN_ROUTE+"/manufactures/updateStatus");
    },
  };

  return (
    <ManufacturesUIProvider manufacturesUIEvents={ManufacturesUIEvents}>
      <ManufacturesLoadingDialog />
      <Route path={"/"+ADMIN_ROUTE+"/manufactures/deleteManufactures"}>
        {({ history, match }) => (
          <ManufacturesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/manufactures");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/manufactures/:id/delete"}>
        {({ history, match }) => (
          <ManufactureDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/manufactures");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/manufactures/fetch"}>
        {({ history, match }) => (
          <ManufacturesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/manufactures");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/manufactures/updateStatus"}>
        {({ history, match }) => (
          <ManufacturesUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/manufactures");
            }}
          />
        )}
      </Route>
      <ManufacturesCard />
    </ManufacturesUIProvider>
  );
}
