import React from "react";
import {
  ManufactureStatusCssClasses,
  ManufactureStatusTitles
} from "../../ManufacturesUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      ManufactureStatusCssClasses[row.status]
    } label-inline`}
  >
    {ManufactureStatusTitles[row.status]}
  </span>
);
