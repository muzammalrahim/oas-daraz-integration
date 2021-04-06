import React from "react";
import {
  EnquiryStatusCssClasses,
  EnquiryStatusTitles
} from "../../EnquiriesUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      EnquiryStatusCssClasses[row.status == 'CANCELLED' ? 0 : row.status == 'FULFILLED' ? 1 :2]
    } label-inline`}
  >
    {row.status}
  </span>
);
