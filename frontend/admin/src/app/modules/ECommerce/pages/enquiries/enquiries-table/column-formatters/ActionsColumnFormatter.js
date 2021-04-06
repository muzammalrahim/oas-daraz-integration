/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openViewEnquiryPage, openDeleteEnquiryDialog }
) => (
  <>
  <OverlayTrigger
      overlay={<Tooltip id="inquiries-view-tooltip">View Inquiry</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-info btn-sm mx-3"
        onClick={() => openViewEnquiryPage(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-info">
         <i className="text-info fa fa-eye"></i>
        </span>
      </a>
    </OverlayTrigger>{` `}
    <OverlayTrigger
      overlay={<Tooltip id="enquiries-delete-tooltip">Delete enquiry</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteEnquiryDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/static/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
