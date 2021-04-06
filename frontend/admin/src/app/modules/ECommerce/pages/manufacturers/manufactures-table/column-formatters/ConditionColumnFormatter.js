import React from "react";
import {
  ManufactureConditionCssClasses,
  ManufactureConditionTitles
} from "../../ManufacturesUIHelpers";

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
        ManufactureConditionCssClasses[row.condition]
      }`}
    >
      {row.condition.toUpperCase()}
    </span>
  </>
);
