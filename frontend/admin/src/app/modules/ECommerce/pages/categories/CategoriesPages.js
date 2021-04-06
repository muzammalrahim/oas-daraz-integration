import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CategoriesPage } from "./CategoriesPage";
import { CategoryEdit } from "./category-edit/CategoryEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../../_metronic/layout";
import { ADMIN_ROUTE } from '../../../../../app/pages/helper/api'

export default function CategoriesPages() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={"/"+ADMIN_ROUTE+"/categories/new"} component={CategoryEdit} />
        <ContentRoute
          path={"/"+ADMIN_ROUTE+"/categories/:id/edit"}
          component={CategoryEdit}
        />
        <ContentRoute path={"/"+ADMIN_ROUTE+'/categories'} component={CategoriesPage} />
      </Switch>
    </Suspense>
  );
}
