import React from "react";
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles
} from "../../CustomersUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      CustomerStatusCssClasses[row.status]
    } label-inline`}
  >
    {CustomerStatusTitles[row.status]}
  </span>
);
