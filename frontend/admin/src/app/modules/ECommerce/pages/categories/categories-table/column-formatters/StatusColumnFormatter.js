import React from "react";
import {
  CategoryStatusCssClasses,
  CategoryStatusTitles
} from "../../CategoriesUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      CategoryStatusCssClasses[row.status]
    } label-inline`}
  >
    {CategoryStatusTitles[row.status]}
  </span>
);
