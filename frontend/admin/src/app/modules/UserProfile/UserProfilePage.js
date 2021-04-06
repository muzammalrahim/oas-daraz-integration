import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../_metronic/layout";
import AccountInformation from "./AccountInformation";
import { ProfileOverview } from "./ProfileOverview";
import ChangePassword from "./ChangePassword";
import PersonaInformation from "./PersonaInformation";
import EmailSettings from "./EmailSettings";
import { ProfileCard } from "./components/ProfileCard";
import { ADMIN_ROUTE } from "../../pages/helper/api";

export default function UserProfilePage() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("User profile");

  return (
    <div className="d-flex flex-row">
      <ProfileCard></ProfileCard>
      <div className="flex-row-fluid ml-lg-8">
        <Switch>
          <Redirect
            from={"/"+ADMIN_ROUTE+"/user-profile"}
            exact={true}
            to={"/"+ADMIN_ROUTE+"/user-profile/profile-overview"}
          />
          <Route
            path="/user-profile/profile-overview"
            component={ProfileOverview}
          />
          <Route
            path={"/"+ADMIN_ROUTE +"/user-profile/account-information"}
            component={AccountInformation}
          />
          <Route
            path={"/"+ADMIN_ROUTE +"/user-profile/change-password"}
            component={ChangePassword}
          />
          <Route
            path={"/"+ADMIN_ROUTE +"/user-profile/email-settings"}
            component={EmailSettings}
          />
          <Route
            path={"/"+ADMIN_ROUTE +"/user-profile/personal-information"}
            component={PersonaInformation}
          />
        </Switch>
      </div>
    </div>
  );
}
