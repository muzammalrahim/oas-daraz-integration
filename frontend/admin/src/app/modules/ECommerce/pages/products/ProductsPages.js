import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";
import { ProductEdit } from "./product-edit/ProductEdit";
import { ProductView } from "./product-view/ProductView";
import { LayoutSplashScreen, ContentRoute } from "../../../../../_metronic/layout";
import { ADMIN_ROUTE } from '../../../../../app/pages/helper/api'

export default function ProductsPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={"/"+ADMIN_ROUTE+"/products/new"} component={ProductEdit} />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/products/:id/edit"}
          component={ProductEdit}
        />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/products/:id/view"}
          component={ProductView}
        />
        <ContentRoute path={"/"+ADMIN_ROUTE+'/products'} component={ProductsPage} />
      </Switch>
    </Suspense>
  );
}
