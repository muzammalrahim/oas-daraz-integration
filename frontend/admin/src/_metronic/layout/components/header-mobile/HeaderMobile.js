import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import {toAbsoluteUrl} from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function HeaderMobile() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile"),
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header Mobile*/}
      <div
        id="kt_header_mobile"
        className={`header-mobile ${layoutProps.headerMobileCssClasses}`}
        {...layoutProps.headerMobileAttributes}
        style={{backgroundColor:"#05014a", height:"20px"}}
      >
        {/* begin::Logo */}
        <a  onClick={()=>window.location.assign("https://shop.oas.aero/")}>
          <img
            height="30px"
            alt="Logo"
            className="logo-default max-h-30px"
            src={toAbsoluteUrl("/static/media/logos/Oxygen_Aerospace_logo_icon_svg.svg")}
          />
        </a>
        {/* end::Logo */}

        {/* begin::Toolbar */}
        <div className="d-flex align-items-center">
          {layoutProps.asideDisplay && (
            <button
              className="btn p-0 burger-icon burger-icon-left"
              id="kt_aside_mobile_toggle"
            >
              <span />
            </button>
          )}
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header Mobile */}
    </>
  );
}
