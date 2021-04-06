import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_helpers";
import { ADMIN_ROUTE } from '../../../../app/pages/helper/api'

export function Brand() {
  return (
    <>
      {/* begin::Brand */}
      <div
        className={`aside-brand d-flex flex-column align-items-center flex-column-auto py-5 py-lg-12`}
      >
        {/* begin::Logo */}
        <a target="_blank" href="/" className="brand-logo">
          <img
            alt="logo"
            src={toAbsoluteUrl("/static/media/logos/Oxygen_Aerospace_logo_icon_svg.svg")}
            className="max-h-31px"
            style={{height:"60px"}}
          />
        </a>
        {/* end::Logo */}
      </div>
      {/* end::Brand */}
    </>
  );
}
