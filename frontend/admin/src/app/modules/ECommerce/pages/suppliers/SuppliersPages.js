import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { SuppliersPage } from "./SuppliersPage";
import { SupplierEdit } from "./supplier-edit/SupplierEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../../_metronic/layout";
import { ADMIN_ROUTE } from '../../../../pages/helper/api'

export default function SuppliersPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={"/"+ADMIN_ROUTE+"/suppliers/new"} component={SupplierEdit} />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/suppliers/:id/edit"}
          component={SupplierEdit}
        />
        <ContentRoute path={"/"+ADMIN_ROUTE+'/suppliers'} component={SuppliersPage} />
      </Switch>
    </Suspense>
  );
}
