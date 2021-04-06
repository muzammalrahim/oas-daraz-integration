import React from "react";
import {
  CategoryConditionCssClasses,
  CategoryConditionTitles
} from "../../CategoriesUIHelpers";

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
        CategoryConditionCssClasses[row.condition]
      }`}
    >
      {/* {row.condition.toUpperCase()} */}
    </span>
  </>
);
