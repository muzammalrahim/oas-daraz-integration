/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import { useLocation } from 'react-router-dom';
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { ADMIN_ROUTE } from '../../../pages/helper/api'

export function AuthPage() {
  const location = useLocation();

  const is_registration = () => {
    if(location.pathname === "/"+ADMIN_ROUTE+"/auth/registration")
      return true;
    else 
      return false;
  }

  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/static/media/bg/bg-4.jpg")})`,
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10 align-self-center">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/static/media/logos/cart.svg")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  Welcome to Shopping Cart
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  Quality products sale Company.
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  &copy; 2021 ShoppingCart
                </div>
                <div className="d-flex">
                  <Link to="/terms" className="text-white">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Contact
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
            {/* {is_registration() ? <>
                <span className="font-weight-bold text-dark-50">
                  Already have an account?
                </span>
                <Link
                  to={"/"+ADMIN_ROUTE+"/auth/login"}
                  className="font-weight-bold ml-2"
                  id="kt_login_signup"
                >
                  Login!
                </Link>
              </> : <>
                <span className="font-weight-bold text-dark-50">
                  Don't have an account yet?
                </span>
                <Link
                  to={"/"+ADMIN_ROUTE+"/auth/registration"}
                  className="font-weight-bold ml-2"
                  id="kt_login_signup"
                >
                  Sign Up!
                </Link>
              </>
              } */}
            </div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path={"/"+ADMIN_ROUTE+"/auth/login"} component={Login} />
                {/* <ContentRoute
                  path={"/"+ADMIN_ROUTE+"/auth/registration"}
                  component={Registration}
                /> */}
                <ContentRoute
                  path={"/"+ADMIN_ROUTE+"/auth/forgot-password"}
                  component={ForgotPassword}
                />
                <Redirect from={"/"+ADMIN_ROUTE+"/auth"} exact={true} to={"/"+ADMIN_ROUTE+"/auth/login"} />
                <Redirect to={"/"+ADMIN_ROUTE+"/auth/login"} />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
