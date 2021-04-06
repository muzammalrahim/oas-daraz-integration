import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
import { ProductsPage } from "./products/ProductsPage";
import { ProductEdit } from "./products/product-edit/ProductEdit";
import { ProductView } from "./products/product-view/ProductView";
import { EnquiryView } from "./enquiries/enquiry-view/EnquiryView"
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { ADMIN_ROUTE } from '../../../../app/pages/helper/api'

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
       
        <ContentRoute path={"/"+ADMIN_ROUTE+"/customers"} component={CustomersPage} />
        <ContentRoute path={"/"+ADMIN_ROUTE+"/products/new"} component={ProductEdit} />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/products/:id/edit"}
          component={ProductEdit}
        /><ContentRoute
          path={"/"+ADMIN_ROUTE+"/products/:id/view"}
          component={ProductView}
        />
        <ContentRoute path={"/"+ ADMIN_ROUTE +"/orders/:id/view"} component={EnquiryView} />

        <ContentRoute path={"/"+ADMIN_ROUTE+"/products"} component={ProductsPage} />
      </Switch>
    </Suspense>
  );
}
