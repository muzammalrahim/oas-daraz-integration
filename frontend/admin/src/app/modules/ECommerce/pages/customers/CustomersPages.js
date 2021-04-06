import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./CustomersPage";
import { CustomerEdit } from "./customer-edit/CustomerEdit";
import { CustomerView } from "./customer-view/CustomerView";
import { LayoutSplashScreen, ContentRoute } from "../../../../../_metronic/layout";
import { ADMIN_ROUTE } from '../../../../pages/helper/api'

export default function CustomersPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={"/"+ADMIN_ROUTE+"/customers/new"} component={CustomerEdit} />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/customers/:id/edit"}
          component={CustomerEdit}
        />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/customers/:id/view"}
          component={CustomerView}
        />
        <ContentRoute path={"/"+ADMIN_ROUTE+'/customers'} component={CustomersPage} />
      </Switch>
    </Suspense>
  );
}
