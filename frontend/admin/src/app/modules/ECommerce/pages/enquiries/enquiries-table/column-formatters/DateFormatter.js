import React from "react";
import {getDateFormat} from "../../../../../../pages/helper/api";

export const DateFormatter = (cellContent, row) => (
  <>
      {getDateFormat(row.created_at)}
  </>
);
