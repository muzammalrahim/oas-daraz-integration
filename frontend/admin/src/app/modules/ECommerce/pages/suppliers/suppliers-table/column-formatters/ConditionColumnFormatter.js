import React from "react";
import {
  SupplierConditionCssClasses,
  SupplierConditionTitles
} from "../../SuppliersUIHelpers";

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
        SupplierConditionCssClasses[row.condition]
      }`}
    >
      {/* {row.condition.toUpperCase()} */}
    </span>
  </>
);
