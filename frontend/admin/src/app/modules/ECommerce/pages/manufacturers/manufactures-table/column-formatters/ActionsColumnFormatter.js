/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditManufacturePage, openDeleteManufactureDialog }
) => (
  <>
    <OverlayTrigger
      overlay={<Tooltip id="manufactures-edit-tooltip">Edit manufacture</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-info btn-sm mx-3"
        onClick={() => openEditManufacturePage(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-info">
          <SVG
            src={toAbsoluteUrl("/static/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="manufactures-delete-tooltip">Delete manufacture</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteManufactureDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/static/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
