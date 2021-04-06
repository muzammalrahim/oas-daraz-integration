import React from "react";
import {
  CustomerConditionCssClasses,
  CustomerConditionTitles
} from "../../CustomersUIHelpers";

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
        CustomerConditionCssClasses[row.condition]
      }`}
    >
      {/* {row.condition.toUpperCase()} */}
    </span>
  </>
);
