import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ADMIN_ROUTE } from "../../pages/helper/api";
import { ErrorPage1 } from "./ErrorPage1";

export default function ErrorsPage() {
  return (
    <Switch>
      <Redirect from="/error" exact={true} to={"/"+ADMIN_ROUTE+"/error/error-v1"} />
      <Route path={"/"+ADMIN_ROUTE+"/error/error-v1"} component={ErrorPage1} />
    </Switch>
  );
}
