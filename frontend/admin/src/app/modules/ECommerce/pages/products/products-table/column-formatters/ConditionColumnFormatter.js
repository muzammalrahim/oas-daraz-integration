import React from "react";
import {
  ProductConditionCssClasses,
  ProductConditionTitles
} from "../../ProductsUIHelpers";

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
        ProductConditionCssClasses[row.condition]
      }`}
    >
      {row?.condition?.toUpperCase()}
    </span>
  </>
);
