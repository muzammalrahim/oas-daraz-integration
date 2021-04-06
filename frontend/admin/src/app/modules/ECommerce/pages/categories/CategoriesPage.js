import React from "react";
import { Route } from "react-router-dom";
import { CategoriesLoadingDialog } from "./categories-loading-dialog/CategoriesLoadingDialog";
import { CategoryDeleteDialog } from "./category-delete-dialog/CategoryDeleteDialog";
import { CategoriesDeleteDialog } from "./categories-delete-dialog/CategoriesDeleteDialog";
import { CategoriesFetchDialog } from "./categories-fetch-dialog/CategoriesFetchDialog";
import { CategoriesUpdateStatusDialog } from "./categories-update-status-dialog/CategoriesUpdateStatusDialog";
import { CategoriesCard } from "./CategoriesCard";
import { CategoriesUIProvider } from "./CategoriesUIContext";
import {ADMIN_ROUTE} from '../../../../pages/helper/api'

export function CategoriesPage({ history }) {
  const categoriesUIEvents = {
    newCategoryButtonClick: () => {
      history.push(`/${ADMIN_ROUTE}/categories/new`);
    },
    openEditCategoryPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/categories/${id}/edit`);
    },
    openDeleteCategoryDialog: (id) => {
      history.push(`/${ADMIN_ROUTE}/categories/${id}/delete`);
    },
    openDeleteCategoriesDialog: () => {
      history.push(`/${ADMIN_ROUTE}/categories/deleteCategories`);
    },
    openFetchCategoriesDialog: () => {
      history.push(`/${ADMIN_ROUTE}/categories/fetch`);
    },
    openUpdateCategoriesStatusDialog: () => {
      history.push("/"+ADMIN_ROUTE+"/categories/updateStatus");
    },
  };

  return (
    <CategoriesUIProvider categoriesUIEvents={categoriesUIEvents}>
      <CategoriesLoadingDialog />
      <Route path={"/"+ADMIN_ROUTE+"/categories/deleteCategories"}>
        {({ history, match }) => (
          <CategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/categories");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/categories/:id/delete"}>
        {({ history, match }) => (
          <CategoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/categories");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/categories/fetch"}>
        {({ history, match }) => (
          <CategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/categories");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/categories/updateStatus"}>
        {({ history, match }) => (
          <CategoriesUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/categories");
            }}
          />
        )}
      </Route>
      <CategoriesCard />
    </CategoriesUIProvider>
  );
}
