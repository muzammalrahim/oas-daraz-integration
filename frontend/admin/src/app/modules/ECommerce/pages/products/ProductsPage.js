import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";
import {ADMIN_ROUTE} from '../../../../pages/helper/api'

export function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push(`/${ADMIN_ROUTE}/products/new`);
    },
    openEditProductPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/products/${id}/edit`);
    },
    openViewProductPage: (id) => {
      history.push(`/${ADMIN_ROUTE}/products/${id}/view`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/${ADMIN_ROUTE}/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/${ADMIN_ROUTE}/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/${ADMIN_ROUTE}/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/"+ADMIN_ROUTE+"/products/updateStatus");
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path={"/"+ADMIN_ROUTE+"/products/deleteProducts"}>
        {({ history, match }) => (
          <ProductsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/products");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/products/:id/delete"}>
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/products");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/products/fetch"}>
        {({ history, match }) => (
          <ProductsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/products");
            }}
          />
        )}
      </Route>
      <Route path={"/"+ADMIN_ROUTE+"/products/updateStatus"}>
        {({ history, match }) => (
          <ProductsUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/"+ADMIN_ROUTE+"/products");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}
