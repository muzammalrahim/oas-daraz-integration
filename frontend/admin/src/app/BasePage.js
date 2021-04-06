import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import {ADMIN_ROUTE} from './pages/helper/api'
import PersonaInformation from './modules/UserProfile/PersonaInformation'


const ProductsPages = lazy(() =>
  import("./modules/ECommerce/pages/products/ProductsPages")
);

const CustomersPages = lazy(() =>
  import("./modules/ECommerce/pages/customers/CustomersPages")
);


const ManufacturesPages = lazy(() =>
  import("./modules/ECommerce/pages/manufacturers/ManufacturesPages")
);

const CategoriesPages = lazy(() =>
  import("./modules/ECommerce/pages/categories/CategoriesPages")
);

const SuppliersPages = lazy(() =>
  import("./modules/ECommerce/pages/suppliers/SuppliersPages")
);

const EnquiriesPages = lazy(() =>
  import("./modules/ECommerce/pages/enquiries/EnquiriesPages")
);

const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from={"/"+ADMIN_ROUTE+"/"} to={"/"+ADMIN_ROUTE+"/dashboard"} />
        }         
        <Redirect exact from={"/"+ADMIN_ROUTE} to={"/"+ADMIN_ROUTE+"/dashboard"} />
        <ContentRoute path={"/"+ADMIN_ROUTE+"/dashboard"} component={DashboardPage} />
        <ContentRoute path={"/"+ADMIN_ROUTE+"/builder"} component={BuilderPage} />
        <ContentRoute path={"/"+ADMIN_ROUTE+"/my-page"} component={MyPage} />
        <Route path={"/"+ADMIN_ROUTE+"/suppliers"} component={SuppliersPages} />
        <Route path={"/"+ADMIN_ROUTE+"/orders"} component={EnquiriesPages} />
        <Route path={"/"+ADMIN_ROUTE+"/categories"} component={CategoriesPages} />
        <Route path={"/"+ADMIN_ROUTE+"/manufactures"} component={ManufacturesPages} />
        <Route path={"/"+ADMIN_ROUTE+"/customers"} component={CustomersPages} />
        <Route path={"/"+ADMIN_ROUTE+"/products"} component={ProductsPages} />
        <Route path={"/"+ADMIN_ROUTE+"/user-profile"} component={UserProfilepage} />
        <Route path={"/"+ADMIN_ROUTE+"/personal-information"} component={PersonaInformation} />
        <Redirect to={"/"+ADMIN_ROUTE+"/error/error-v1" }/>
      </Switch>
    </Suspense>
  );
}
