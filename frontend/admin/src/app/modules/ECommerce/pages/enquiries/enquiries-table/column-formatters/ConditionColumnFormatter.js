import React from "react";
import {
  EnquiryConditionCssClasses,
  EnquiryConditionTitles
} from "../../EnquiriesUIHelpers";

export const ConditionColumnFormatter = (cellContent, row) => (
  <>
    <span
      className={`badge badge-${
        'info'
      } badge-dot`}
    ></span>
    &nbsp;
    <span
      className={`font-bold font-${
        EnquiryConditionCssClasses[row.condition]
      }`}
    >
      {row.condition.toUpperCase()}
    </span>
  </>
);
