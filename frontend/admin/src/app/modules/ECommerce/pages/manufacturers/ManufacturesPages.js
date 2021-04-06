import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ManufacturesPage } from "./ManufacturesPage";
import { ManufactureEdit } from "./manufacture-edit/ManufactureEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../../_metronic/layout";
import { ADMIN_ROUTE } from '../../../../../app/pages/helper/api'

export default function ManufacturesPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={"/"+ADMIN_ROUTE+"/manufactures/new"} component={ManufactureEdit} />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/manufactures/:id/edit"}
          component={ManufactureEdit}
        />
        <ContentRoute path={"/"+ADMIN_ROUTE+'/manufactures'} component={ManufacturesPage} />
      </Switch>
    </Suspense>
  );
}
